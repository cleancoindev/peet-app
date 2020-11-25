import { createStore, combineReducers, applyMiddleware, Store, compose } from "redux";
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import reducers from "./reducers";
import { composeWithDevTools } from 'redux-devtools-extension';
import Web3 from "web3";
import { web3ProviderMiddleware } from "./middlewares";

export const history = createBrowserHistory();

export const web3 = new Web3((window as any).ethereum);

export const configureStore = (): Store => {
    const store: Store = createStore(combineReducers(
        {
            ...reducers, 
            router: connectRouter(history)
        }), {}, composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history), web3ProviderMiddleware(web3))));

    return store;
};