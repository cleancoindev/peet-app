import Env from "../env";
import CancelSwapRequest from "./models/cancelSwapRequest";
import FetchSwapRequest from "./models/fetchSwapRequest";
import { InitSwapRequest } from "./models/initSwapRequest";

export default class PeetOracleProvider {
    private static baseUrl: string | undefined = Env().ORACLE_PEET_URL

    static initSwapRequest(request: InitSwapRequest): Promise<any>
    {
        return new Promise((cb, res) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(request)
            };

            fetch(`${this.baseUrl}/swap/init`, requestOptions)
                .then(response => {
                    return response.json()
                })
                .then(data => { cb(data) })
                .catch(error => {
                    res(error)
                });
        })
    }

    static cancelSwapRequest(request: CancelSwapRequest): Promise<any>
    {
        return new Promise((cb, res) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(request)
            };

            fetch(`${this.baseUrl}/swap/cancel`, requestOptions)
                .then(response => {
                    return response.json()
                })
                .then(data => { cb(data) })
                .catch(error => {
                    res(error)
                });
        })
    }

    static fetchSwapState(request: FetchSwapRequest): Promise<any>
    {
        return new Promise((cb, res) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify(request)
            };

            fetch(`${this.baseUrl}/swap/state`, requestOptions)
                .then(response => {
                    return response.json()
                })
                .then(data => { cb(data) })
                .catch(error => {
                    res(error)
                });
        })
    }
}