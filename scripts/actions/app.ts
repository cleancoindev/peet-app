import { SwitchSidebarOpenAction } from "../reducers/types/app";

export const SWITCH_SIDEBAR_OPEN: string = "SWITCH_SIDEBAR_OPEN";

export const requestSwitchSidebarOpen = () => async dispatch => {
    dispatch({
        type: SWITCH_SIDEBAR_OPEN
    } as SwitchSidebarOpenAction);
}
