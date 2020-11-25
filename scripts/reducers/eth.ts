import { SET_CONNECTED } from "../actions/eth";
import { EthState, SetConnectedAction } from "./types/eth";
import { web3 } from "../store";

const initialState: EthState = {
    isConnected: false,
    accounts: []
}

export default (state = initialState, action: SetConnectedAction): EthState => {
    switch(action.type) {
        case SET_CONNECTED: return { ...state, isConnected: action.isConnected, accounts: action.accounts }
        default: return state;
    }
}