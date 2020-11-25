import * as React from 'react'
import { connect } from "react-redux";
import FirstStepChainBridge from "./steps/first"
import SecondStepChainBridge from "./steps/second"

interface BridgeSwap {
    fromChain: string,
    destChain: string
}

class ChainBridge extends React.Component {
  
    public state: any
    constructor(props: any) {
        super(props);

        this.state = {
            currentStep: 2,
            currentSwap: {fromChain:"eth", destChain:"neo"}
        }

        this.onStepChange = this.onStepChange.bind(this)
    }

    onStepChange(step: number, datas: BridgeSwap = undefined) {
        if (datas !== undefined) {
            this.setState({currentStep: step, currentSwap: datas})
        } else {
            this.setState({currentStep: step})
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
            <SecondStepChainBridge {...this.state.currentSwap} onStepChange={this.onStepChange} />) }

        </div>;
    }
}

export default connect((state: any, ownProps: any) => {
    return {}
}, (dispatch) => {
    return {
  
    }
})(ChainBridge)