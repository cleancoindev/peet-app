import neo from "../reducers/neo";
import { BindNeolineAction } from "../reducers/types/neo";

export const BIND_NEOLINE: string = "BIND_NEOLINE";
export const bindNeoline = () => async dispatch => {
    window.addEventListener('NEOLine.NEO.EVENT.READY', () => {
        const neoline = new NEOLine.Init();
        dispatch({
            type: BIND_NEOLINE,
            neoline: neoline
        } as BindNeolineAction)
    });
}

export const REQUEST_NEO_ACCOUNTS: string = "REQUEST_NEO_ACCOUNTS";
export const requestNeoAccounts = () => async dispatch => {

}