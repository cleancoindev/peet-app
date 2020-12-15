

export default class EthereumHelper {
    static sendOnContract(cb: any, fromAddr: string): Promise<any>
    {
        return new Promise(async (res, rej) => {
            try {
              const result = await cb.call({fromAddr})
              await cb.send({fromAddr})
              res(result)
            } catch(e) { rej(e) }
          })
    }

    static callOnContract(cb: any, fromAddr: string): Promise<any>
    {
        return new Promise(async (res, rej) => {
            try {
              const result = await cb.call({fromAddr})
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
      } catch (e) { return JSON.stringify(error) }
    }
}