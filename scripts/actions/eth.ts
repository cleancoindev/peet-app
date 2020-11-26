import { SetConnectedAction, SetCurrentPTEWETHPrice, SetCurrentPTEWBTCPrice } from "../reducers/types/eth";
import { web3, currentStore } from "../store";
import { ChainId, Token, WETH, Fetcher, Route, TokenAmount, TradeType, Trade } from '@uniswap/sdk'
import Env from "../env";
import {toastr} from 'react-redux-toastr'

export const SET_CONNECTED = "SET_CONNECTED";
export const requestLogin = () => async dispatch => {
    if(window.ethereum == null) {
        toastr.error('No Metamask', 'Please install or enable Metamask to login')
        return;
    }
    await (window as any).ethereum.enable();
    dispatch({
        type: SET_CONNECTED,
        isConnected: true,
        accounts: await web3.eth.getAccounts(),
        netId: await web3.eth.net.getId()
    } as SetConnectedAction);
}

export const requestLogout = () => async dispatch => {
    dispatch({
        type: SET_CONNECTED,
        isConnected: false,
        accounts: [],
        netId: 1
    } as SetConnectedAction);
}

export const SET_CURRENT_PTE_WETH_PRICE = "SET_CURRENT_PTE_WETH_PRICE";
export const fetchPTEWETHPrice = (amount: number = 1) => async dispatch => {
    const netId = await web3.eth.net.getId();
    const PTE = await Fetcher.fetchTokenData(netId, web3.utils.toChecksumAddress(Env().PEET_CONTRACT_ADDR));
    const ETH = await Fetcher.fetchTokenData(netId, web3.utils.toChecksumAddress(Env().WETH_CONTRACT_ADDR));
    
    const pair = await Fetcher.fetchPairData(PTE, ETH);
    const route = new Route([pair], ETH)
    const result: number = parseFloat(parseFloat((parseFloat(route.midPrice.toSignificant(6)) * amount) as any).toFixed(8));
    dispatch({
        type: SET_CURRENT_PTE_WETH_PRICE,
        currentPTEWETHPrice: result
    } as SetCurrentPTEWETHPrice);
}

export const SET_CURRENT_PTE_WBTC_PRICE = "SET_CURRENT_PTE_WBTC_PRICE";
export const fetchPTEWBTCPrice = (amount: number = 1) => async dispatch => {
    if(web3.currentProvider == null) return;
    const netId = await web3.eth.net.getId();
    const PTE = await Fetcher.fetchTokenData(netId, web3.utils.toChecksumAddress(Env().PEET_CONTRACT_ADDR));
    const BTC = await Fetcher.fetchTokenData(netId, web3.utils.toChecksumAddress(Env().WBTC_CONTRACT_ADDR));
    
    const pair = await Fetcher.fetchPairData(PTE, BTC);
    const route = new Route([pair], BTC)
    const result: number = parseFloat(parseFloat((parseFloat(route.midPrice.toSignificant(6)) * amount) as any).toFixed(8));
    dispatch({
        type: SET_CURRENT_PTE_WBTC_PRICE,
        currentPTEWBTCPrice: result
    } as SetCurrentPTEWBTCPrice);
}