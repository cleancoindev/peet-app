import * as React from 'react'
import { connect } from "react-redux";

class Staking extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            pools: [
                {
                    name: "Unifi Protocol DAO (UNFI)",
                    image: "https://bin.bnbstatic.com/static/images/coin/unfi.svg",
                    stakeFrom: "pte",
                    earnTo: "unfi",
                    state: 1,
                    blockchain: "ethereum",
                    progress: 50,
                    period: "30 day/s",
                    endAt: "2020-12-14 01:00:00"
                },
                {
                    name: "Hard Protocol (HARD)",
                    image: "https://bin.bnbstatic.com/static/images/coin/hard.svg",
                    stakeFrom: "pte",
                    earnTo: "hard",
                    state: 1,
                    blockchain: "ethereum",
                    progress: 92,
                    period: "30 day/s",
                    endAt: "2020-12-14 01:00:00"
                }
            ]
        }
    }

    render() {
        return <div>
            <h1>Staking</h1>

            <div className="content-section">
                {this.state.pools.map((e, i) => {
                    return <div className="sub-section">
                        <div style={{ display: "flex", flex: "1" }}>
                            <div style={{ margin: "10px", display: "flex", flex: 1 }}>
                                <img src={e.image}
                                    style={{ borderRadius: "15px", width: "70px", marginLeft: "auto", marginRight: "auto" }} />
                            </div>
                            <div style={{ margin: "10px", flex: 2 }}>
                                <div>
                                    <h2 style={{ fontSize: "19px", marginLeft: "auto", marginRight: "auto" }}>
                                        {e.name}
                                    </h2>
                                </div>
                                <div>
                                    <h2 style={{ fontSize: "13px", marginLeft: "auto", marginRight: "auto" }}>
                                        Stake {e.stakeFrom.toUpperCase()}, Earn {e.earnTo.toUpperCase()}
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="btn-icon-rounded active" style={{
                            display: "block", marginTop: "10px",
                            width: "100%", textAlign: "center", minHeight: "45px", lineHeight: "45px", fontSize: "20px"
                        }} onClick={() => { }}>
                            Stake Now
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

    }
})(Staking)