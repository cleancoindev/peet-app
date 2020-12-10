interface BindNeolineAction {
    type: string,
    address: string
    network: string
}

interface NeoState {
    address: string
    network: string
}

export {
    BindNeolineAction,
    NeoState
}