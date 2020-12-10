import neo from "../reducers/neo";
import { BindNeolineAction } from "../reducers/types/neo";
import { neoline } from "../store";

export const BIND_NEOLINE: string = "BIND_NEOLINE";
export const bindNeoline = () => async dispatch => {
    neoline.getAccount().then(async account => {
        const networks = await neoline.getNetworks();
        window.sessionStorage.setItem('neolineConnected', 'true');
        dispatch({
            type: BIND_NEOLINE,
            address: account.address,
            network: networks.defaultNetwork
        } as BindNeolineAction)
    });
}

export const REQUEST_NEO_ACCOUNTS: string = "REQUEST_NEO_ACCOUNTS";
export const requestNeoAccounts = () => async dispatch => {

}