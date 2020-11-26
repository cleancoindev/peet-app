interface Env {
    WETH_CONTRACT_ADDR: string
    PEET_CONTRACT_ADDR: string
    WBTC_CONTRACT_ADDR: string
    PEETPAY_CONTRACT_ADDR: string
    ORACLE_PEET_URL: string
    WEB3_PROVIDER: string
}

const developmentEnv: Env = {
    WETH_CONTRACT_ADDR: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    PEET_CONTRACT_ADDR: "0x2158146E3012f671e4E3EEE72611224027c3FcFD",
    WBTC_CONTRACT_ADDR: "0xBde8bB00A7eF67007A96945B3a3621177B615C44",
    PEETPAY_CONTRACT_ADDR: "0x6de30b311de01da5b65d4027ae9fa37bd8d18bfd",
    ORACLE_PEET_URL: "http://localhost:1337",
    WEB3_PROVIDER: "wss://ropsten.infura.io/ws/v3/4f477eb263cd4f2d8777c2ed46ac552f"
}

const prodEnv: Env = {
    WETH_CONTRACT_ADDR: "",
    PEET_CONTRACT_ADDR: "",
    WBTC_CONTRACT_ADDR: "",
    PEETPAY_CONTRACT_ADDR: "",
    ORACLE_PEET_URL: "http://localhost:1337",
    WEB3_PROVIDER: ""
}

const envs = {
    "development": developmentEnv,
    "production": prodEnv
}

export default (): Env => (envs[process.env.NODE_ENV] as any) as Env;