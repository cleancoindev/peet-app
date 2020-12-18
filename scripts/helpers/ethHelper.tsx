import {toastr} from 'react-redux-toastr';

export default class EthereumHelper {
    static sendOnContract(cb: any, fromAddr: string): Promise<any>
    {
        return new Promise(async (res, rej) => {
            try {
              const result = await cb.call({from: fromAddr})
              await cb.send({from: fromAddr})
              res(result)
            } catch(e) { rej(e) }
          })
    }

    static callOnContract(cb: any, fromAddr: string): Promise<any>
    {
        return new Promise(async (res, rej) => {
            try {
              const result = await cb.call({from: fromAddr})
              res(result)
            } catch(e) { rej(e) }
          })
    }
    
    static getContractError(error: any) : string {
      try {
        var lines = error.message.split('\n');
        lines.splice(0,1);
        const json = JSON.parse(lines.join('\n'));
        return (json.originalError !== undefined) ? json.originalError.message : JSON.stringify(error)
      } catch (e) { return `${error}` }
    }

    static errorParser(error: any)
    {
      const errorString: string = EthereumHelper.getContractError(error)
      if(errorString.includes("Returned values")) {
        toastr.error('Error', 'Please switch to Mainnet or try back later')
      }
    }
}