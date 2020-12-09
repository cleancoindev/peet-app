import * as React from 'react'
import { connect } from "react-redux";
import {toastr} from 'react-redux-toastr';
import * as ConnectedReactRouter from 'connected-react-router';
import ReducersCombinedState from '../../../reducers/types/reducers';

class EthereumPoolsView extends React.Component<ReducersCombinedState, {}> {
    public state: any
    constructor(props: ReducersCombinedState) {
        super(props);
        this.state = {
            pools: [
                {
                    name: "Peet Defi",
                    image: "https://s2.coinmarketcap.com/static/img/coins/128x128/7659.png",
                    stakeFrom: "psk",
                    earnTo: "PTE",
                    state: 1,
                    blockchain: "ethereum",
                    progress: 0,
                    period: "30 day/s",
                    endAt: "2020-12-31 01:00:00"
                },
                {
                    name: "Compound Protocol",
                    image: "https://s2.coinmarketcap.com/static/img/coins/128x128/5692.png",
                    stakeFrom: "pte",
                    earnTo: "DAI",
                    state: 1,
                    blockchain: "ethereum",
                    progress: 0,
                    period: "30 day/s",
                    endAt: "2020-12-31 01:00:00"
                },
                {
                    name: "Harvest Protocol",
                    image: "https://harvest.finance/static/media/tractor.53d392b6.gif",
                    stakeFrom: "pte",
                    earnTo: "ETH",
                    state: 1,
                    blockchain: "ethereum",
                    progress: 0,
                    period: "30 day/s",
                    endAt: "2020-12-31 01:00:00"
                }
            ]
        }
    }

    render() {
        return <div>
            <div className="content-section">
                {this.state.pools.map((e, i) => {
                    return <div className="sub-section col-6">
                        <div style={{ display: "flex", flex: "1" }}>
                            <div style={{ margin: "10px", display: "flex", flex: 1 }}>
                                <img src={e.image}
                                    style={{ borderRadius: "15px", width: "85px", marginLeft: "auto", marginRight: "auto" }} />
                            </div>
                            <div style={{ margin: "10px", flex: 2 }}>
                                <div>
                                    <h2 style={{ fontSize: "19px", marginLeft: "auto", marginRight: "auto" }}>
                                    Stake {e.stakeFrom.toUpperCase()}, Earn {e.earnTo.toUpperCase()}
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
})(EthereumPoolsView)