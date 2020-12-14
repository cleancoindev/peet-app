

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
}