interface Env {
    WETH_CONTRACT_ADDR: string
    PEET_CONTRACT_ADDR: string
    WBTC_CONTRACT_ADDR: string
    PEETPAY_CONTRACT_ADDR: string
    ORACLE_PEET_URL: string
    WEB3_PROVIDER: string
    ETH_STAKING_CONTRACT: string
    USDT_CONTRACT_ADDR: string
}

const developmentEnv: Env = {
    WETH_CONTRACT_ADDR: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    PEET_CONTRACT_ADDR: "0x2158146E3012f671e4E3EEE72611224027c3FcFD",
    WBTC_CONTRACT_ADDR: "0xBde8bB00A7eF67007A96945B3a3621177B615C44",
    PEETPAY_CONTRACT_ADDR: "0x6de30b311de01da5b65d4027ae9fa37bd8d18bfd",
    ORACLE_PEET_URL: "http://localhost:1337",
    WEB3_PROVIDER: "wss://ropsten.infura.io/ws/v3/4f477eb263cd4f2d8777c2ed46ac552f",
    ETH_STAKING_CONTRACT: "0xDDEd6E3FD24a191972f61b9DD8ebb0b668dea2e3",
    USDT_CONTRACT_ADDR: "0x953D625891aEB8183D9c9eF3c4212cA7BE6E9549"
}

const prodEnv: Env = {
    WETH_CONTRACT_ADDR: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    PEET_CONTRACT_ADDR: "0x51bb9c623226ce781f4a54fc8f4a530a47142b6b",
    WBTC_CONTRACT_ADDR: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    PEETPAY_CONTRACT_ADDR: "0x770b6b2bdf62b1a54fd68e2447d51671da0ebf03",
    ORACLE_PEET_URL: "https://oracle.peetdecentralized.finance",
    WEB3_PROVIDER: "wss://mainnet.infura.io/ws/v3/4f1a24ed50654f56b6ccf068bc54d64c",
    ETH_STAKING_CONTRACT: "0x509c136121E1C60D3EAc26ea20FEEaE1f51959BA",
    USDT_CONTRACT_ADDR: "0xdac17f958d2ee523a2206206994597c13d831ec7"
}

const envs = {
    "development": developmentEnv,
    "production": prodEnv
}

export default (): Env => (envs['production'] as any) as Env;