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

    static async countLiveEthPools(): Promise<number> {
        try {
        const poolsRaw: any = await EthHelper.callOnContract(ethStakingContract.methods.fetchLivePools(), undefined)
        return poolsRaw[0].length
        } catch (e) { return 0}
    }

    static async fetchLiveEthPools(): Promise<StakingPool[]> {
        try {
            const storage = localStorage.getItem('livePools');
            if (storage !== undefined) {
                const datas: any = JSON.parse(storage);
                const timealiveness = this.getMinutesBetweenDates(new Date(datas.date), new Date())
     
                if (timealiveness < 1) {
                    datas.pools.forEach((x: StakingPool) => {
                        x.startDate = new Date(x.startDate)
                        x.endDate = new Date(x.endDate)
                    })

                    return datas.pools as StakingPool[];
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
                    outputSymbol: symbolOutput,
                    amount_reward: undefined,
                    total_pooled: undefined,
                    max_pooled: undefined
                })
            }
            if (poolsRaw[0].length > 0) {
                const poolsPlusRaw: any = await EthHelper.callOnContract(ethStakingContract.methods.fetchLivePoolsPlus(), undefined)
                for (var i = 0; i < poolsPlusRaw[0].length; i++) {
                    pools[i].amount_reward = Number(poolsPlusRaw[0][i])
                    pools[i].total_pooled = Number(poolsPlusRaw[1][i])
                    pools[i].max_pooled = Number(poolsPlusRaw[2][i])
                }
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