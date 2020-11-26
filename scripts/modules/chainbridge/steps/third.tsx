import { useRef, useState } from "react";
import * as React from 'react'
import { connect } from "react-redux";
import PeetOracleProvider from "../../../providers/peetOracle";

const moment = require("moment");
class ThirdStepChainBridge extends React.Component {

    public props: any
    public state: any
    public interval: any = undefined
    constructor(props: any) {
        super(props);

        this.state = {
            minsLeft: 0,
            secsLeft: 0,
            errorContent: undefined,
            pinCode: undefined,
            tx: undefined,
            amount: undefined,
            ended: false
        }

        this.props = props

        this.initializeClock = this.initializeClock.bind(this)
        this.getTimeRemaining = this.getTimeRemaining.bind(this)
        this.onChangePinCode = this.onChangePinCode.bind(this)
        this.onCancelRequest = this.onCancelRequest.bind(this)
        this.isSwapExpired = this.isSwapExpired.bind(this)
        this.updateState = this.updateState.bind(this)
        this.onEnded = this.onEnded.bind(this)
    }

    isSwapExpired() {
        if (new Date(this.props.expireAt) < moment(new Date()).toDate()) {
            return true
        }
        return false
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    componentDidMount() {
        this.initializeClock(this.props.expireAt)
        if (this.isSwapExpired()) {
            return this.props.onStepChange(1, {
                fromChain: this.props.fromChain,
                destChain: this.props.destChain
            });
        }

        const fetchState = async () => {
            try {
                if (this.state.ended) { 
                    return clearInterval(this.interval)
                }
                const response: any = await PeetOracleProvider.fetchSwapState({
                    from_chain: this.props.fromChain,
                    to_chain: this.props.destChain,
                    from_addr: this.props.fromAddr,
                    to_addr: this.props.dstAddr
                })
                if (response.result) { 
                    this.updateState(response.data)
                }
                if (this.isSwapExpired()) { 
                    return this.props.onStepChange(1, {
                        fromChain: this.props.fromChain,
                        destChain: this.props.destChain
                    });
                }
            } catch(e) { console.error(e) }
        }

        fetchState()
        this.interval = setInterval(fetchState, 15000)
        
    }

    updateState(data: any) {
        this.setState({tx: data?.tx ?? undefined, amount: data?.amount ?? undefined, ended: data?.ended ?? 0})
    }

    getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date().toISOString());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        
        return {
          total,
          days,
          hours,
          minutes,
          seconds
        };
      }

    initializeClock(endtime: Date) {
        var timeinterval = null
      
        const updateClock = () => {
            const t = this.getTimeRemaining(endtime);
            this.setState({minsLeft: ('0' + t.minutes).slice(-2), secsLeft: ('0' + t.seconds).slice(-2)})
        }

        updateClock();
        timeinterval = setInterval(updateClock, 1000);
      }

    onChangePinCode(event: any) {
        if (event.target.value.length <= 4) {
            this.setState({pinCode: event.target.value})
        }
    }

    async onCancelRequest(event: any) {
        event.preventDefault()
        try {
            const response: any = await PeetOracleProvider.cancelSwapRequest({
                from_addr: this.props.fromAddr,
                pin_code: this.state.pinCode
            })
            if (response.result) {
                this.props.onStepChange(1, {
                    fromChain: this.props.fromChain,
                    destChain: this.props.destChain
                });
            } else {
                return this.setState({errorContent: `${response.message}`})
            }
        } catch(e) { console.error(e) }
    }

    onEnded(_: any) {
        return this.props.onStepChange(1, {
            fromChain: this.props.fromChain,
            destChain: this.props.destChain
        });
    }

    render() {
        return <div>
            <div className="content-section">
                <div className="sub-section">
                    <div className="content-sub">
                        <span style={{fontSize: 30}}>Chain Swap: {this.props.fromChain.toUpperCase()} to {this.props.destChain.toUpperCase()} </span>
                        <hr/>
                        <p>From: <span style={{fontWeight: 600}}>{this.props.fromAddr}</span> <br/>
                        Destination: <span style={{fontWeight: 600}}>{this.props.dstAddr}</span></p>
                        <hr/>
                        You can send any PTE amount to the Bridge address, it will be then automatically sent back to your selected destination address.
                    </div>
                </div>
            </div>

            <div className="content-section">
                <div className="sub-section">
                    <div className="content-sub">
                        <p>Please send your PTE to the address below using the source address (From):</p>
                        <input type="text" id="sendTo" value={this.props.oracleAddr} disabled/>
                        <hr/>
                        {this.state.minsLeft > 0 && this.state.tx === undefined && <div>
                            <div id="clockdiv">
                            <div style={{margin: 10}}>
                                <span className="minutes">{this.state.minsLeft}</span>
                            <div className="smalltext">Minutes</div>
                            </div>
                            <div style={{margin: 10}}>
                            <span className="seconds">{this.state.secsLeft}</span>
                            <div className="smalltext">Seconds</div>
                            </div>
                        </div><br/>
                        Time left to deposit until bridge request auto expiration..
                        <hr/>
                        </div>}

                        {this.props.pinCode !== undefined && this.state.tx === undefined &&
                        <div className="content-sub col-12">
                            <div className="alert alert-infos" role="alert">
                            To secure you're swap request, here is a generated pin code that you can use if you want to cancel your swap request:
                            <br/><span style={{color:"white", background: "linear-gradient(to right, #448a83, #4f38ab)"}}>{this.props.pinCode}</span><br/>
                            <span style={{color:"red"}}>Note that if you wish to cancel this request before the timer end.</span>
                            </div>
                        </div>}

                        {this.state.tx !== undefined &&
                        <div className="content-sub col-12">
                            <div className="alert alert-success" role="alert">
                                Swap successfully initiated<br/> <small>(tx: {this.state.tx})</small><br/>
                                We received <b>{this.state.amount} PTE</b> on the Chain Bridge
                                <hr/>
                                {!this.state.ended &&
                                 <div style={{fontWeight:650, fontSize:20}}>Waiting for chain confirmations...</div> ||
                                 this.state.ended && <div style={{fontWeight:650, fontSize:20, color: "#59f0dc"}}>Swap done with success!</div>}
                            </div>
                            {this.state.ended &&
                            <div>
                                <input onClick={this.onEnded} id="confirm" type="submit" value="Back to The Bridge"></input>
                            </div>}
                        </div> }
                   
                    </div>
                </div>

            </div>

            
            {this.state.tx === undefined &&
            <div className="content-section">
                <div className="sub-section">
                    <div className="content-sub">
                    { this.state.errorContent !== undefined && 
                        <div className="content-sub col-12">
                        <div className="alert" role="alert">
                            {this.state.errorContent}
                        </div>
                    </div>}

                        <p>Cancel your current waiting request with the pin code received at the start of the processing, if you lost it, wait until the timer end.</p>
                    <div className="col-12">
                        <form>
                        <input style={{width: 200, height: "55px", display: "block", marginLeft: "auto",
                            marginRight: "auto", marginBottom: "10px", fontSize: "14", letterSpacing: "5px"}} value={this.state.pinCode} onChange={this.onChangePinCode} type="text" id="pinCode" placeholder="Enter Pin Code"/>
                            <input onClick={this.onCancelRequest} id="cancel" className="cancel-button" type="submit" value="Cancel request"></input>
                        </form>
                     </div>
                    </div>
                </div>

            </div>}

        </div>;
    }
}

export default connect((state: any, ownProps: any) => {
    return {}
}, (dispatch) => {
    return {
  
    }
})(ThirdStepChainBridge)