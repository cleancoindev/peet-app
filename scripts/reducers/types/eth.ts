interface EthState {
    isConnected: boolean,
    accounts: Array<string>,
    currentPTEWETHPrice: number,
    currentPTEWBTCPrice: number,
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

interface SetCurrentPTEWBTCPrice {
    type: string,
    currentPTEWBTCPrice: number
}

export {
    EthState,
    SetConnectedAction,
    SetCurrentPTEWETHPrice,
    SetCurrentPTEWBTCPrice
}