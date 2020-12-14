import {toastr} from 'react-redux-toastr';
import EthHelper from "../helpers/ethHelper"
import { ethStakingContract, getErc20Contract } from "../store";
import StakingPool from './models/staking/pool';
import web3 from "web3";

const moment = require("moment");
export default class StakingPoolProvider {

    static getMinutesBetweenDates(startDate, endDate) {
        var diff = endDate.getTime() - startDate.getTime();
        return (diff / 60000);
    }

    static async fetchLiveEthPools(): Promise<StakingPool[]> {
        try {
            const storage = localStorage.getItem('livePools');
            if (storage !== undefined) {
                const datas: any = JSON.parse(storage);
                const timealiveness = this.getMinutesBetweenDates(new Date(datas.date), new Date())
     
                if (timealiveness < 1) {
                    return datas.pools;
                }
            }

            const poolsRaw: any = await EthHelper.callOnContract(ethStakingContract.methods.fetchLivePools(), undefined)
            const pools: StakingPool[] = []

            for (var i = 0; i < poolsRaw[0].length; i++) {
                const inputAssetContract = getErc20Contract(poolsRaw[2][i])
                const outputAssetContract = getErc20Contract(poolsRaw[3][i])

                const symbolInput: string = await EthHelper.callOnContract(inputAssetContract.methods.symbol(), undefined)
                const symbolOutput: string = await EthHelper.callOnContract(outputAssetContract.methods.symbol(), undefined)

                pools.push({
                    hashPool: poolsRaw[0][i],
                    name: web3.utils.toAscii(poolsRaw[1][i]).replace(/[^0-9a-z ]/gi, ''),
                    inputAsset: poolsRaw[2][i],
                    ouputAsset: poolsRaw[3][i],
                    startDate: moment.unix(poolsRaw[4][i]).toDate(),
                    endDate: moment.unix(poolsRaw[5][i]).toDate(),
                    inputSymbol: symbolInput,
                    outputSymbol: symbolOutput
                })
            }

            localStorage.setItem('livePools', JSON.stringify({
                pools,
                date: new Date()
            }));

            return pools
        } catch (e) {
            console.error(e)
            toastr.error('Error', 'An error occured on the contract call, please try again later');
        }
    }
}