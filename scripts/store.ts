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
import {reducer as toastrReducer} from 'react-redux-toastr';

export const history = createBrowserHistory();

let web3 = null;
if((window as any).ethereum == null) {
    console.log("No web3 found by default")
    web3 = new Web3(new Web3.providers.WebsocketProvider(Env().WEB3_PROVIDER));
}
else {
    web3 = new Web3((window as any).ethereum)
}
export { web3 };
export const wethContract = new web3.eth.Contract(abi.weth as any, Env().WETH_CONTRACT_ADDR);
export const wbtcContract = new web3.eth.Contract(abi.weth as any, Env().WBTC_CONTRACT_ADDR);
export const peetPayContract = new web3.eth.Contract(abi.peetPay as any, Env().PEETPAY_CONTRACT_ADDR);
export const pteTokenContract = new web3.eth.Contract(abi.erc20 as any, Env().PTE_TOKEN_ADDR);
export const ethStakingContract = new web3.eth.Contract(abi.ethStaking as any, Env().ETH_STAKING_CONTRACT);

export const getErc20Contract = (tokenAddr: string): any => {
    return new web3.eth.Contract(abi.erc20 as any, tokenAddr);
}

let currentStore: Store = null;
export { currentStore };

let neoline: any = null;
export { neoline };

window.addEventListener('NEOLine.NEO.EVENT.READY', () => {
    neoline = new NEOLine.Init();
});

export const configureStore = (): Store => {
    currentStore = createStore(combineReducers(
        {
            ...reducers, 
            router: connectRouter(history),
            toastr: toastrReducer
        }), {}, composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history), web3ProviderMiddleware(web3))));

    return currentStore;
};