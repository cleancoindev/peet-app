import { BIND_NEOLINE } from "../actions/neo";
import { BindNeolineAction, NeoState } from "./types/neo";

const initialState: NeoState = {
    neoline: null
}

export default (state = initialState, action: BindNeolineAction): NeoState => {
    switch(action.type) {
        case BIND_NEOLINE: 
            return { ...state, neoline: action.neoline }
        default: return state;
    }
}