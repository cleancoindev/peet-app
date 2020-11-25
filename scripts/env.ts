interface Env {
    WETH_CONTRACT_ADDR: string
    PEET_CONTRACT_ADDR: string
    PEETPAY_CONTRACT_ADDR: string
    ORACLE_PEET_URL: string
}

const developmentEnv: Env = {
    WETH_CONTRACT_ADDR: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    PEET_CONTRACT_ADDR: "0x2158146E3012f671e4E3EEE72611224027c3FcFD",
    PEETPAY_CONTRACT_ADDR: "0xe14bddE214930a6007170FE51ae56aE2D4F5F7A2",
    ORACLE_PEET_URL: "http://localhost:1337"
}

const envs = {
    "development": developmentEnv
}

export default (): Env => (envs[process.env.NODE_ENV] as any) as Env;