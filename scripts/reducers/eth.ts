import { SET_CONNECTED, SET_CURRENT_PTE_WETH_PRICE } from "../actions/eth";
import { EthState, SetConnectedAction, SetCurrentPTEWETHPrice } from "./types/eth";
import { web3 } from "../store";
import { ChainId } from '@uniswap/sdk'

const initialState: EthState = {
    isConnected: false,
    accounts: [],
    netId: 1,
    currentPTEWETHPrice: 0,
    netName: ''
}

export default (state = initialState, action: SetConnectedAction & SetCurrentPTEWETHPrice): EthState => {
    switch(action.type) {
        case SET_CONNECTED: 
            return { ...state, isConnected: action.isConnected, accounts: action.accounts, netId: action.netId, netName: ChainId[action.netId] }
        case SET_CURRENT_PTE_WETH_PRICE: 
            return { ...state, currentPTEWETHPrice: action.currentPTEWETHPrice }
        default: return state;
    }
}