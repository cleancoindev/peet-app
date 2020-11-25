import * as React from 'react'
import { connect } from "react-redux";

class FirstStepChainBridge extends React.Component {

    public available_chains = [
        {name:"Ethereum", symbol: "eth", available: true},
        {name:"Neo", symbol: "neo", available: true},
        {name:"Binance Smart Chain", symbol: "bsc", available: false},
        {name:"Nuls", symbol: "nuls", available: false},
        {name:"Waves", symbol: "waves", available: false},
        {name:"Kyber Network", symbol: "kyber", available: false}
    ]

    public state: any
    constructor(props: any) {
        super(props);

        this.state = {
            fromChainValue: "eth",
            toChainValue: "neo",
            agreed: false,
            errorContent: undefined
        }

        this.handleFromChainChange = this.handleFromChainChange.bind(this)
        this.handleDestChainChange = this.handleDestChainChange.bind(this)
        this.handleAgreed = this.handleAgreed.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleFromChainChange(event: any) {
        this.setState({fromChainValue: event.target.value});
    }
    
    handleDestChainChange(event: any) {
        this.setState({toChainValue: event.target.value});
    }

    handleAgreed(event: any) {
        this.setState({agreed: event.target.checked})
    }

    handleSubmit() {
        if (this.state.fromChainValue === undefined || this.state.toChainValue === undefined) {
            return this.setState({errorContent: "Invalid chain selected, check your entries"})
        }
        
        if (this.state.fromChainValue === this.state.toChainValue) {
            return this.setState({errorContent: "Please.. did you really selected both same chain?"})
        }
        if ((this.available_chains.find(x => x.symbol === this.state.fromChainValue && x.available === true)) === undefined) {
            return this.setState({errorContent: `Chain ${this.state.fromChainValue.toUpperCase()} not available yet, please check the token page to get the list of supported tokens.`})
        }

        if ((this.available_chains.find(x => x.symbol === this.state.toChainValue && x.available === true)) === undefined) {
            return this.setState({errorContent: `Chain ${this.state.toChainValue.toUpperCase()} not available yet, please check the token page to get the list of supported tokens.`})
        }

        alert('ok!')
    }

    render() {
        return <div>
            <div className="content-section">
                <div className="sub-section">
                    <div className="content-sub">
                        <label className="col-md-12" htmlFor="from-chain">Select your From Chain</label>
                        <select name="from-chain" value={this.state.fromChainValue} onChange={this.handleFromChainChange}>
                        {this.available_chains.map((elem: any)=> {
                            return (<option key={`from-${elem.symbol}`} value={`${elem.symbol}`}>{elem.name}</option>)
                        })}
                        </select>
                    </div>
                </div>

                <div className="sub-section">
                    <div className="content-sub">
                        <label className="col-md-12" htmlFor="from-chain">Select your Destination Chain</label>
                        <select name="dst-chain" value={this.state.toChainValue} onChange={this.handleDestChainChange}>
                        {this.available_chains.reverse().map((elem: any)=> {
                            return (<option key={`from-${elem.symbol}`} value={`${elem.symbol}`}>{elem.name}</option>)
                        })}
                        </select>
                    </div>
                </div>
                { this.state.errorContent !== undefined && 
                    <div className="content-sub col-12">
                    <div className="alert" role="alert">
                        {this.state.errorContent}
                    </div>
                </div>}

            </div>

            <div className="content-section">
                <div className="sub-section">
                    <div className="content-sub">
                        <div className="col-12">
                            <label><input id="acceptance" checked={this.state.agreed} type="checkbox" name="acceptance-your-accept" onChange={this.handleAgreed} aria-invalid="false"/>
                                    <span>I agree that my PTE will be swap to another chain.</span>
                            </label>
                        </div>
                        <div className="col-12">
                            <input id="submit-step" onClick={this.handleSubmit} type="submit" value="Next Step" disabled={!this.state.agreed}></input>
                        </div>
                    </div>
                </div>

            </div>
        </div>;
    }
}

export default connect((state: any, ownProps: any) => {
    return {}
}, (dispatch) => {
    return {
  
    }
})(FirstStepChainBridge)