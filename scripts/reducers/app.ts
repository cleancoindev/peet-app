import {AppState, SwitchSidebarOpenAction} from "./types/app"
import {SWITCH_SIDEBAR_OPEN} from "../actions/app";

const initialState: AppState = {
    sidebarOpen: false,
}

export default (state = initialState, action: SwitchSidebarOpenAction): AppState => {
    switch(action.type) {
        case SWITCH_SIDEBAR_OPEN:
            return { ...state, sidebarOpen: !state.sidebarOpen }
        default: return state;
    }
}