import { SetConnectedAction } from "../reducers/types/eth";
import { web3 } from "../store";

export const SET_CONNECTED = "SET_CONNECTED";

export const requestLogin = () => async dispatch => {
    await (window as any).ethereum.enable();
    dispatch({
        type: SET_CONNECTED,
        isConnected: true,
        accounts: await web3.eth.getAccounts()
    } as SetConnectedAction);
}