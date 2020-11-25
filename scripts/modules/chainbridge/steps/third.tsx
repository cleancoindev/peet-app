import { useRef, useState } from "react";
import * as React from 'react'
import { connect } from "react-redux";

const moment = require("moment");
class ThirdStepChainBridge extends React.Component {

    public props: any
    public state: any
    constructor(props: any) {
        super(props);

        this.state = {
            minsLeft: 0,
            secsLeft: 0
        }

        this.props = props

        this.initializeClock = this.initializeClock.bind(this)
        this.getTimeRemaining = this.getTimeRemaining.bind(this)
    }

    componentDidMount() {
        this.initializeClock(moment().add(1, 'hours').toDate())
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
                        <input type="text" id="sendTo" value="0x03a2c6731A70611ffC486207129DD3f8DECb0a65" disabled/>
                        <hr/>
                        {this.state.minsLeft > 0 && <div>
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
                   
                    </div>
                </div>

            </div>

            
            <div className="content-section">
                <div className="sub-section">
                    <div className="content-sub">
                        <p>Cancel your current waiting request with the pin code received at the start of the processing, if you lost it, wait until the timer end.</p>
                    <div className="col-12">
                        <form>
                        <input style={{width: 200, height: "55px", display: "block", marginLeft: "auto",
                            marginRight: "auto", marginBottom: "10px", fontSize: "30px", letterSpacing: "5px"}} value={this.state.dstAddr} onChange={() => {}} type="text" id="pinCode" placeholder="Enter Pin Code"/>
                            <input onClick={() => {this.props.onStepChange(1, undefined)}} id="cancel" className="cancel-button" type="submit" value="Cancel request"></input>
                        </form>
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
})(ThirdStepChainBridge)