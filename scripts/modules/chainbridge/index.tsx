import * as React from 'react'
import { connect } from "react-redux";
import FirstStepChainBridge from "./steps/first"

class ChainBridge extends React.Component {
  
    public state: any
    constructor(props: any) {
        super(props);

        this.state = {
            currentStep: 1
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
            <FirstStepChainBridge/>)
            || (this.state.currentStep == 2 && 
            <FirstStepChainBridge/>) }

        </div>;
    }
}

export default connect((state: any, ownProps: any) => {
    return {}
}, (dispatch) => {
    return {
  
    }
})(ChainBridge)