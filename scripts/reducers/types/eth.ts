interface EthState {
    isConnected: boolean,
    accounts: Array<string>,
    currentPTEWETHPrice: number,
    netId: number,
    netName: string
}

interface SetConnectedAction {
    type: string,
    isConnected: boolean,
    netId: number,
    accounts: Array<string>
}

interface SetCurrentPTEWETHPrice {
    type: string,
    currentPTEWETHPrice: number
}

export {
    EthState,
    SetConnectedAction,
    SetCurrentPTEWETHPrice
}