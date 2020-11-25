import { createStore, combineReducers, applyMiddleware, Store, compose } from "redux";
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reducers from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import Web3 from "web3";
import { web3ProviderMiddleware } from "./middlewares";
import * as abi from "./abi";
import Env from "./env";
import { requestLogin } from "./actions/eth";

export const history = createBrowserHistory();

export const web3 = new Web3((window as any).ethereum);
export const wethContract = new web3.eth.Contract(abi.weth as any, Env().WETH_CONTRACT_ADDR);
export const peetPayContract = new web3.eth.Contract(abi.peetPay as any, Env().PEETPAY_CONTRACT_ADDR);

let currentStore: Store = null;
export { currentStore };

export const configureStore = (): Store => {
    currentStore = createStore(combineReducers(
        {
            ...reducers, 
            router: connectRouter(history)
        }), {}, composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history), web3ProviderMiddleware(web3))));

    return currentStore;
};