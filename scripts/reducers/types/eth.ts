interface EthState {
    isConnected: boolean,
    accounts: Array<string>
}

interface SetConnectedAction {
    type: string,
    isConnected: boolean,
    accounts: Array<string>
}

export {
    EthState,
    SetConnectedAction
}