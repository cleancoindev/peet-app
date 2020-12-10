import { BIND_NEOLINE } from "../actions/neo";
import { BindNeolineAction, NeoState } from "./types/neo";

const initialState: NeoState = {
    address: null,
    network: null
}

export default (state = initialState, action: BindNeolineAction): NeoState => {
    switch(action.type) {
        case BIND_NEOLINE: 
            return { ...state, address: action.address, network: action.network }
        default: return state;
    }
}