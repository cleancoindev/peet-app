import * as React from 'react'
import { connect } from "react-redux";
import PeetOracleProvider from '../../../providers/peetOracle';

class SecondStepChainBridge extends React.Component {

    public props: any
    public state: any
    constructor(props: any) {
        super(props);

        this.state = {
            fromAddr: "0x8984e422E30033A84B780420566046d25EB3519a",
            dstAddr: "AUqw19M2ykCNaH37PNy8sjQiqkATdeFgkz",
            errorContent: undefined
        }

        this.props = props
        this.handleChangeFromAddr = this.handleChangeFromAddr.bind(this)
        this.handleChangeDestAddr = this.handleChangeDestAddr.bind(this)
        this.handleValidateRequest = this.handleValidateRequest.bind(this)
    }

    handleChangeFromAddr(event: any) {
        this.setState({fromAddr: event.target.value})
    }

    handleChangeDestAddr(event: any) {
        this.setState({dstAddr: event.target.value})
    }

    checkAddr(chain: string, addr: string)
    {
        switch (chain) {
            case "eth":
                return addr.match(/0x[a-fA-F0-9]{40}/);

            case "neo":
                return addr.match(/A[0-9a-zA-Z]{33}/);
        }
    }

    async handleValidateRequest(_: any) {
        if (this.checkAddr(this.props.fromChain, this.state.fromAddr) == null) {
            return this.setState({errorContent: `Invalid ${this.props.fromChain.toUpperCase()} source address format`}) 
        } else if(this.checkAddr(this.props.destChain, this.state.dstAddr) == null) {
            return this.setState({errorContent: `Invalid ${this.props.destChain.toUpperCase()} destination address format`})
        }

        try {
            const result: any = await PeetOracleProvider.initSwapRequest({
                from_chain: this.props.fromChain,
                to_chain: this.props.destChain,
                from_addr: this.state.fromAddr,
                to_addr: this.state.dstAddr
            })
            console.log(result)
        } catch(e) { console.error(e) }

        this.props.onStepChange(3, {
            fromChain: this.props.fromChain,
            destChain: this.props.destChain,
            fromAddr: this.state.fromAddr,
            dstAddr: this.state.dstAddr
        });
    }

    
    render() {
        return <div>
            <div className="content-section">
                    <div className="sub-section">
                        <div className="content-sub" style={{padding:"10px"}}>
                            <label className="col-12" id="addrFromChainLabel" htmlFor="addrFromChain">Enter your source {this.props.fromChain.toUpperCase()} address</label>
                            <input value={this.state.fromAddr} onChange={this.handleChangeFromAddr} type="text" id="addrFromChain"/>
                        </div>

                        <div className="content-sub" style={{padding:"10px"}}>
                            <label className="col-12" id="addrFromChainLabel" htmlFor="addrDestChain">Enter your destination {this.props.destChain.toUpperCase()} address</label>
                            <input value={this.state.dstAddr} onChange={this.handleChangeDestAddr} type="text" id="addrDestChain"/>
                        </div>
                </div>

                { this.state.errorContent !== undefined && 
                    <div className="content-sub">
                    <div className="alert" role="alert">
                        {this.state.errorContent}
                    </div>
                </div>}
            </div>

            <div className="content-section">
                    <div className="sub-section">
                        <div className="content-sub">
                            <p>Please be sure to enter the correct address or your funds will be loss,<br/>
                                small fees will be taken at swap time to pay the chain transaction cost.</p>
                            <div className="col-12">
                                <input onClick={() => {this.props.onStepChange(1, undefined)}} id="cancel" className="cancel-button" type="submit" value="Cancel"></input>
                                <input onClick={this.handleValidateRequest} id="submit-step" type="submit" value="Validate request"></input>
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
})(SecondStepChainBridge)