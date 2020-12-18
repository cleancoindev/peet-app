export default interface StakingPool {
    hashPool: string,
    name: string,
    inputAsset: string,
    ouputAsset: string,
    startDate: Date,
    endDate: Date,
    inputSymbol: string,
    outputSymbol: string,
    amount_reward: number | undefined,
    total_pooled: number | undefined,
    max_pooled: number | undefined
    max_wallet_pooled: number | undefined
}