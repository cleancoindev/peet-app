import * as React from 'react'
import { connect } from "react-redux";
import FirstStepChainBridge from "./steps/first"
import SecondStepChainBridge from "./steps/second"
import ThirdStepChainBridge from "./steps/third"

interface BridgeSwap {
    fromChain: string,
    destChain: string,
    fromAddr: string,
    dstAddr: string,
    expireAt: Date,
    pinCode: undefined,
    oracleAddr: string
}

class ChainBridge extends React.Component {
  
    public state: any
    constructor(props: any) {
        super(props);

        this.state = {
            currentStep: 1,
            currentSwap: {
                fromChain:"eth",
                destChain:"neo",
                fromAddr: "0x8984e422E30033A84B780420566046d25EB3519a",
                dstAddr: "AUqw19M2ykCNaH37PNy8sjQiqkATdeFgkz",
                expireAt: undefined,
                pinCode: undefined,
                oracleAddr: undefined
            }
        }

        this.onStepChange = this.onStepChange.bind(this)
    }

    onStepChange(step: number, datas: BridgeSwap = undefined) {
        if (datas !== undefined) {
            localStorage.setItem('swapRequest', JSON.stringify(datas));
            this.setState({currentStep: step, currentSwap: datas})
        } else {
            this.setState({currentStep: step})
        }
        localStorage.setItem('lastStep', `${step}`)
    }

    componentWillMount() {
        const currentSwap = localStorage.getItem('swapRequest');
        if (currentSwap != null) {
            this.setState({currentSwap: JSON.parse(currentSwap)})
        }
        const lastStepRaw = localStorage.getItem('lastStep')
        if (lastStepRaw != null) {
            this.setState({currentStep: Number(lastStepRaw)})
        }
    }

    render() {
        return <div>
            <h1>Chain Bridge</h1>
            <div className="content-section">
                <div className="sub-section">
                    <h2 style={{fontSize: "22px"}}>  Harness the power of each blockchain: swap your PTE Token to any of our implemented chain and explore it's full potential.</h2>
                  
                </div>
            </div>

            {(this.state.currentStep == 1 && 
            <FirstStepChainBridge {...this.state.currentSwap} onStepChange={this.onStepChange}/>)
            || (this.state.currentStep == 2 && 
            <SecondStepChainBridge {...this.state.currentSwap} onStepChange={this.onStepChange} />)
            || (this.state.currentStep == 3 && 
            <ThirdStepChainBridge {...this.state.currentSwap} onStepChange={this.onStepChange} />) }

        </div>;
    }
}

export default connect((state: any, ownProps: any) => {
    return {}
}, (dispatch) => {
    return {
  
    }
})(ChainBridge)