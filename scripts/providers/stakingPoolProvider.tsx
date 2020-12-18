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

    static async fetchPool(hash: string) : Promise<StakingPool> {
            const poolRaw: any = await EthHelper.callOnContract(ethStakingContract.methods.fetchPool(hash), undefined)
            const inputAssetContract = getErc20Contract(poolRaw[1])
            const outputAssetContract = getErc20Contract(poolRaw[2])

            const symbolInput: string = await EthHelper.callOnContract(inputAssetContract.methods.symbol(), undefined)
            const symbolOutput: string = await EthHelper.callOnContract(outputAssetContract.methods.symbol(), undefined)

            return {
                hashPool: hash,
                name: web3.utils.toAscii(poolRaw[0]).replace(/[^0-9a-z ]/gi, ''),
                inputAsset: poolRaw[1],
                ouputAsset: poolRaw[2],
                startDate: moment.unix(poolRaw[7]).toDate(),
                endDate: moment.unix(poolRaw[8]).toDate(),
                inputSymbol: symbolInput,
                outputSymbol: symbolOutput,
                amount_reward: Number(poolRaw[3]),
                total_pooled: Number(poolRaw[4]),
                max_pooled:  Number(poolRaw[5]),
                max_wallet_pooled: Number(poolRaw[6])
            }
    }

    static async fetchAmountPooled(hash: string, address: string): Promise<Number> {
        try {
            const amountPooled: any = await EthHelper.callOnContract(ethStakingContract.methods.getTotalWalletPoolInputAmount(hash, address), address)
            return (amountPooled > 0) ? amountPooled / (10 ** 18) : 0
        }
        catch (e) {
            console.error(e)
            return 0
        }
    }

    static async depositInPool(hash: string, amount: number, from: string): Promise<Number> {
            const stringDecimalAmount: string = (amount * (10 ** 18)).toFixed(0)
            await EthHelper.sendOnContract(ethStakingContract.methods.depositInPool(hash, stringDecimalAmount), from)
        return 0
    }

    static async withdrawFromPool(hash: string, from: string) : Promise<number> {
        const res = await EthHelper.sendOnContract(ethStakingContract.methods.withdrawFromPool(hash), from)
        return res
    }

    static async fetchLiveEthPools(): Promise<StakingPool[]> {
        try {
            const storage = localStorage.getItem('livePools');
            if (storage != null) {
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
            const poolsPlusRaw: any = await EthHelper.callOnContract(ethStakingContract.methods.fetchLivePoolsPlus(), undefined)
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
                    amount_reward: Number(poolsPlusRaw[0][i]),
                    total_pooled: Number(poolsPlusRaw[1][i]),
                    max_pooled:  Number(poolsPlusRaw[2][i]),
                    max_wallet_pooled: 0
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