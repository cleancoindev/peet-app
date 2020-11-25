import { SET_CONNECTED } from "../actions/eth";
import { SetConnectedAction } from "../reducers/types/eth";

const middleware = web3 => store => next => async action => {
    next(action);
    if(action.type == "@@router/LOCATION_CHANGE") {
        const accounts = await web3.eth.getAccounts();
        store.dispatch({
            type: SET_CONNECTED,
            isConnected: accounts.length > 0,
            accounts: accounts,
            netId: await web3.eth.net.getId()
        } as SetConnectedAction)
    }
}
export default middleware;