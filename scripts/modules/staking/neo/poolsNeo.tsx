import * as React from 'react'
import { connect } from "react-redux";
import {toastr} from 'react-redux-toastr';
import * as ConnectedReactRouter from 'connected-react-router';
import ReducersCombinedState from '../../../reducers/types/reducers';

class NeoPoolsView extends React.Component<ReducersCombinedState, {}>  {
    public state: any

    constructor(props: ReducersCombinedState) {
        super(props);
        this.state = {
            pools: [
                // {
                //     name: "Flamingo - FLM-nNEO",
                //     image: "https://flamingo.finance/img/logo.666871d1.svg",
                //     stakeFrom: "PTE",
                //     earnTo: "FLM",
                //     state: 1,
                //     blockchain: "neo",
                //     progress: 0,
                //     period: "30 day/s",
                //     endAt: "2020-12-31 01:00:00"
                // },
                // {
                //     name: "Flamincome",
                //     image: "https://avatars0.githubusercontent.com/u/70206242?s=200&v=4",
                //     stakeFrom: "PTE",
                //     earnTo: "USDT",
                //     state: 1,
                //     blockchain: "neo",
                //     progress: 0,
                //     period: "30 day/s",
                //     endAt: "2020-12-31 01:00:00"
                // }
            ],
            loading: false
        }
    }

    render() {
        return <div>

            <div className="content-section">
                            
            {!this.state.loading && this.state.pools.length == 0 &&
               <div className="sub-section">
               <h2 style={{ fontSize: "18px" }}> No active pools currently</h2>

           </div>}

                {this.state.pools.map((e, i) => {
                    return <div key={`pool-${i}`} className="sub-section col-sm-12" style={{background: "linear-gradient(to right, rgb(59 67 107), rgb(21 26 47))", color: "white"}}>
                        <div style={{ display: "flex", flex: "1" }}>
                            <div style={{ margin: "10px", display: "flex", flex: 1 }}>
                                <img src={e.image}
                                    style={{ borderRadius: "15px", width: "50px", marginLeft: "auto", marginRight: "auto" }} />
                            </div>
                            <div style={{ margin: "10px", flex: 2 }}>
                                <div>
                                    <h2 style={{ fontSize: "19px", marginLeft: "auto", marginRight: "auto" }}>
                                    Stake {e.stakeFrom}, Earn {e.earnTo.toUpperCase()}
                                    </h2>
                                </div>
                                <div>
                                    <h2 style={{ fontSize: "13px", marginLeft: "auto", marginRight: "auto" }}>
                                       
                                        {e.name}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="btn-icon-rounded active staking-button" style={{
                            display: "block", marginTop: "10px",
                            width: "100%", textAlign: "center", minHeight: "45px", lineHeight: "45px", fontSize: "20px"
                        }} onClick={() => { 
                            this.props.push("/staking/x")
                        }}>
                            More Details
                        </div>
                        <div style={{ marginTop: "20px" }}>
                            <div style={{ display: "flex", marginBottom: "5px", fontSize: "18px" }}>
                                <div style={{ flex: "1", alignSelf: "left", textAlign: "left" }}>
                                    Reward Progress
                                </div>
                                <div style={{ flex: "1", alignSelf: "right", textAlign: "right" }}>
                                    {e.progress}%
                                </div>
                            </div>
                            <div className="p-progress-bar">
                                <div className="inner" style={{ width: e.progress + "%" }}></div>
                            </div>
                            <div style={{ display: "flex", marginTop: "5px", fontSize: "18px" }}>
                                <div style={{ flex: "1", alignSelf: "left", textAlign: "left" }}>
                                    Farming Period
                                </div>
                                <div style={{ flex: "1", alignSelf: "right", textAlign: "right" }}>
                                    {e.period}
                                </div>
                            </div>
                            <div style={{ display: "flex", marginTop: "5px", fontSize: "18px" }}>
                                <div style={{ flex: "1", alignSelf: "left", textAlign: "left" }}>
                                    Farming end time
                                </div>
                                <div style={{ flex: "1", alignSelf: "right", textAlign: "right" }}>
                                    {e.endAt}
                                </div>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        </div>;
    }
}

export default connect((state: any, ownProps: any) => {
    return {}
}, (dispatch) => {
    return {
        push: (route) => {
            dispatch(ConnectedReactRouter.push(route));
        },
    }
})(NeoPoolsView)