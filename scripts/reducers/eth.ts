import { SET_CONNECTED } from "../actions/eth";
import { EthState, SetConnectedAction } from "./types/eth";
import { web3 } from "../store";
import { ChainId } from '@uniswap/sdk'

const initialState: EthState = {
    isConnected: false,
    accounts: [],
    netId: 1,
    currentPTEWETHPrice: 0,
    netName: ''
}

export default (state = initialState, action: SetConnectedAction): EthState => {
    switch(action.type) {
        case SET_CONNECTED: 
            return { ...state, isConnected: action.isConnected, accounts: action.accounts, netId: action.netId, netName: ChainId[action.netId] }
        default: return state;
    }
}