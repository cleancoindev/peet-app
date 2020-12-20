import * as React from 'react'
import { connect } from "react-redux";
import {toastr} from 'react-redux-toastr';
import * as ConnectedReactRouter from 'connected-react-router';
import ReducersCombinedState from '../../../reducers/types/reducers';
import StakingPoolProvider from "../../../providers/stakingPoolProvider"
import StakingPool from '../../../providers/models/staking/pool';
import Env from "../../../env";
import { getImageByPoolName } from "../images";
import { SelectTextCombo } from "../../../components";

const moment = require('moment');
class EthereumPoolsView extends React.Component<ReducersCombinedState, {}> {
    public state: any
    constructor(props: ReducersCombinedState) {
        super(props);
        this.state = {
            pools: [],
            loading: true,
            searchPoolHash: undefined,
            poolFilter: "livePools"
        }
        this.setPoolFilterState = this.setPoolFilterState.bind(this)
    }

    componentDidMount() {
        this.fetchPools(this.state.poolFilter)
    }

    async fetchPools(filter) {
        this.setState({loading: true})

        var pools: StakingPool[] = undefined
        if (filter === "livePools") {
            pools = await StakingPoolProvider.fetchLiveEthPools()
        } else if (filter === "endedPools") {
            pools = await StakingPoolProvider.fetchEndedEthPools()
        }

        if (pools !== undefined) {
            this.setState({pools, loading: false})
        }
    }

    getFarmingPeriod(startDate: Date, endDate: Date): string {
        var a = moment(startDate.toISOString());
        var b = moment(endDate.toISOString());
        
        const period = Number(b.diff(a, 'days'))

        return (period !== 0) ? `${period} days` : ` < 1 day`
    }

    getRewardProgress(startDate: Date, endDate: Date): string {
        if (new Date() < startDate) { return "0.00" }

        var a = moment(new Date().toISOString());
        var b = moment(endDate.toISOString());
        
        var baseA = moment(startDate.toISOString());
        var baseB = moment(endDate.toISOString());
        const base = Number(baseB.diff(baseA, 'minutes'))

        const left = Number(b.diff(a, 'minutes'))

        const percent = 100 - ((left /  base) * 100)
        if (percent >= 100) { return "100.00"}
        return `${percent.toFixed(3)}`
    }

    getCapProgress(total_pooled: number, max_pooled: number) {
        if (total_pooled === 0) { return "0.00"}

        total_pooled = (total_pooled / (10 ** 18))
        max_pooled = (max_pooled / (10 ** 18))
        const percent = ((total_pooled /  max_pooled) * 100)
        if (percent >= 100) { return "100.00"}
        return `${percent.toFixed(3)}`
    }

    setPoolFilterState(state: string) {
        this.fetchPools(state)
        this.setState({poolFilter: state})
    }

    render() {
        return <div>
            <div className="content-section">


            {!this.state.loading && this.state.pools.length == 0 &&
               <div className="sub-section">
                   {this.state.poolFilter === "livePools" ?
                   <h2 style={{ fontSize: "18px" }}> No active pools currently</h2> :
                   <h2 style={{ fontSize: "18px" }}> No ended pools currently</h2>
                   }
               

           </div>}


           
           {this.state.loading &&
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" style={{margin: 'auto', display: 'block'}} width="201px" height="201px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                    <circle cx={64} cy={50} r={5} fill="#74007a">
                    <animate attributeName="cx" values="64;57" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="50;62.12435565298214" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    <animate attributeName="fill" values="#74007a;#a53faa" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    </circle><circle cx={57} cy="62.12435565298214" r={5} fill="#a53faa">
                    <animate attributeName="cx" values="57;43" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="62.12435565298214;62.124355652982146" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    <animate attributeName="fill" values="#a53faa;#da70dc" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    </circle><circle cx={43} cy="62.124355652982146" r={5} fill="#da70dc">
                    <animate attributeName="cx" values="43;36" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="62.124355652982146;50" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    <animate attributeName="fill" values="#da70dc;#fab0fa" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    </circle><circle cx={36} cy={50} r={5} fill="#fab0fa">
                    <animate attributeName="cx" values="36;42.99999999999999" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="50;37.87564434701786" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    <animate attributeName="fill" values="#fab0fa;#ffe9ff" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    </circle><circle cx="42.99999999999999" cy="37.87564434701786" r={5} fill="#ffe9ff">
                    <animate attributeName="cx" values="42.99999999999999;57" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="37.87564434701786;37.87564434701786" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    <animate attributeName="fill" values="#ffe9ff;#74007a" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    </circle><circle cx={57} cy="37.87564434701786" r={5} fill="#74007a">
                    <animate attributeName="cx" values="57;64" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="37.87564434701786;50" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    <animate attributeName="fill" values="#74007a;#74007a" keyTimes="0;1" dur="0.8s" repeatCount="indefinite" />
                    </circle>
                </svg>}

                {!this.state.loading && this.state.pools.map((e: StakingPool, i) => {
                    return <div key={`pool-${i}`} className="sub-section col-sm-12" style={{background: "linear-gradient(to right, rgb(59 67 107), rgb(21 26 47))", color: "white"}}>
                        <div style={{ display: "flex", flex: "1" }}>
                            <div style={{ margin: "10px", display: "flex", flex: 1 }}>
                                <img src={getImageByPoolName(e.name)} 
                                    style={{ borderRadius: "15px", width: "65px", height: "65px", marginLeft: "auto", marginRight: "auto" }} />
                            </div>
                            <div style={{ margin: "10px", flex: 3 }}>
                                <div>
                                    <h2 style={{ fontSize: "19px", marginLeft: "auto", marginRight: "auto" }}>
                                    Stake {e.inputSymbol.toUpperCase()}, Earn {e.outputSymbol.toUpperCase()}
                                    </h2>
                                </div>
                                <div>
                                    <h2 style={{ fontSize: "13px", marginLeft: "auto", marginRight: "auto" }}>
                                        {e.name}  
                                    </h2>
                        
                                </div>
                                <div>
                                    <hr/>
                                    <h2 title="Pool hash" style={{ fontSize: "10px", marginLeft: "auto", marginRight: "auto" }}>
                                        <a href="" onClick={() => { 
                                             this.props.push(`/staking/${e.hashPool}`)
                                        }}>{e.hashPool.substr(0, 10)}...{e.hashPool.substr(e.hashPool.length - 10, e.hashPool.length)}</a>
                                    </h2>
                                </div>
                            </div>
                        </div>
                        <div className="btn-icon-rounded active staking-button" style={{
                            display: "block", marginTop: "10px",
                            width: "100%", textAlign: "center", minHeight: "45px", lineHeight: "45px", fontSize: "20px"
                        }} onClick={() => {  
                            this.props.push(`/staking/${e.hashPool}`)
                        }}>
                            More Details
                        </div>
                        <div style={{ marginTop: "20px", fontFamily: "monospace"}}>
                            <div style={{ display: "flex", marginBottom: "5px", fontSize: "18px" }}>
                                <div style={{ flex: "1", alignSelf: "left", textAlign: "left" }}>
                                    Reward Progress
                                </div>
                                <div style={{ flex: "1", alignSelf: "right", textAlign: "right" }}>
                                    {this.getRewardProgress(e.startDate, e.endDate)}%
                                </div>
                            </div>
                            <div className="p-progress-bar">
                                <div className="inner" style={{ width: this.getRewardProgress(e.startDate, e.endDate) + "%" }}></div>
                            </div>
                            <div style={{ display: "flex", marginTop: "5px", fontSize: "18px" }}>
                                <div style={{ flex: "1", alignSelf: "left", textAlign: "left" }}>
                                    Period
                                </div>
                                <div style={{ flex: "1", alignSelf: "right", textAlign: "right" }}>
                                    {this.getFarmingPeriod(e.startDate, e.endDate)}
                                </div>
                            </div>
                            <div style={{ display: "flex", marginTop: "5px", fontSize: "18px" }}>
                                
                                <div style={{ flex: "1", alignSelf: "left", textAlign: "left" }}>
                                    Staking start time
                                </div>
                                <div style={{ flex: "1", alignSelf: "right", textAlign: "right" }}>
                                    {e.startDate.toLocaleString()}
                                </div>
                            </div>

                            <div style={{ display: "flex", marginTop: "5px", fontSize: "18px" }}>
                                
                                <div style={{ flex: "1", alignSelf: "left", textAlign: "left" }}>
                                    Staking end time
                                </div>
                                <div style={{ flex: "1", alignSelf: "right", textAlign: "right"}}>
                                    {e.endDate.toLocaleString()}
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div style={{ marginTop: "20px", fontFamily: "monospace"}}>
                            <div style={{ display: "flex", marginTop: "5px", fontSize: "18px" }}>
                                <div style={{ flex: "1", alignSelf: "left", textAlign: "left" }}>
                                    Roi Percent
                                </div>
                                <div style={{ flex: "1", alignSelf: "right", textAlign: "right"}}>
                                    0.00%
                                </div>
                            </div>

                            <div style={{ display: "flex", marginTop: "5px", fontSize: "18px" }}>
                                <div style={{ flex: "1", alignSelf: "left", textAlign: "left" }}>
                                    Max Cap
                                </div>
                                <div style={{ flex: "1", alignSelf: "right", textAlign: "right"}}>
                                   {(e.total_pooled / (10 ** 18))} / {(e.max_pooled / (10 ** 18))} {e.inputSymbol.toUpperCase()} <p><small>({this.getCapProgress(e.total_pooled, e.max_pooled) + "%"})</small></p>
                                </div>
                            </div>
                            <div className="p-progress-bar">
                                <div className="inner" style={{ width: this.getCapProgress(e.total_pooled, e.max_pooled) + "%" }}></div>
                            </div>
                        </div>
                    </div>
                })}
            </div>

            <div className="content-section">
                <div className="content-section col-12">
                    <div className="sub-section col-sm-12">
                        <div className="col-12">
                        <h2 style={{ fontSize: "18px" }}> Use filters to retrieve an ended pool if you dont have the hash</h2>
                        <select onChange={(e) => {
                            this.setPoolFilterState(e.target.value)
                         }}>
                            <option value="livePools">Only Live Pools</option>
                            <option value="endedPools">Only Ended Pools</option>
                        </select>
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
        push: (route) => {
            dispatch(ConnectedReactRouter.push(route));
        },
    }
})(EthereumPoolsView)