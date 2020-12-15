import * as React from 'react'
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Line } from 'react-chartjs-2';
import DataTable, { createTheme } from 'react-data-table-component';
import {toastr} from 'react-redux-toastr';
import PeetOracleProvider from '../../providers/peetOracle';
import StakingPoolProvider from '../../providers/stakingPoolProvider';
import EthereumHelper from '../../helpers/ethHelper';
import * as ConnectedReactRouter from 'connected-react-router';
import { getImageByPoolName } from "./images";

const moment = require('moment');

createTheme('peet-table', {
    text: {
        primary: '#6772ac',
        secondary: 'rgba(208, 47, 182, 0.3)',
    },
    background: {
        default: '#21263e',
    },
    context: {
        background: '#21263e',
        text: '#FFFFFF',
    },
    divider: {
        default: '#3b4267',
    },
    action: {
        button: 'rgba(0,0,0,.54)',
        hover: 'rgba(0,0,0,.08)',
        disabled: 'rgba(0,0,0,.12)',
    },
});

class StakingDetails extends React.Component {
    public state: any
    public props: any
    constructor(props: any) {
        super(props);
        this.state = {
            chartData: {
                labels: ["", "", "", "", "", "", ""],
                datasets: [
                    {
                        label: 'staked asset in the pool',
                        data: [],
                        fill: true,
                        backgroundColor: 'rgba(208, 47, 182, 0.3)',
                        borderColor: 'rgba(208, 47, 182, 1)',
                    },
                ]
            },
            pool: undefined,
            loading: true
        }
        this.fetchHistory = this.fetchHistory.bind(this)
    }

    async fetchHistory() {
        try {
            const history = await PeetOracleProvider.fetchHistoryPool(this.props.match.params.poolId)
                const datas = []
                let minLen: number = history.data.length - 7;

                while(minLen < 0) {
                    datas.push(0)
                    minLen++;
                }
                history.data.forEach(x => datas.push(x))
                this.setState({
                    chartData: {
                    labels: ["", "", "", "", "", "", ""],
                    datasets: [
                        {
                            label: 'staked asset in the pool',
                            data: datas,
                            fill: true,
                            backgroundColor: 'rgba(208, 47, 182, 0.3)',
                            borderColor: 'rgba(208, 47, 182, 1)',
                        },
                    ]
                }})
        } catch (e) { console.error(e) }

    }

    async componentDidMount() {
        this.fetchHistory()
 
        try {
            const pool = await StakingPoolProvider.fetchPool(this.props.match.params.poolId)
            this.setState({pool, loading: false})
        } catch (e) {
            const errorString: string = EthereumHelper.getContractError(e)
            if (errorString.includes("Invalid Pool")) {
                this.props.push('/staking')
            } else {
                toastr.error('Error', errorString);
            }
        }
        // toastr.info('Staking', 
        //     "This is a demonstration page for the future staking system, you can't interact with the page yet, stay tuned on our social networks",
        //     {
        //         timeOut: 10000
        //     });
    }

    getFarmingPeriod(endDate: Date): string {
        var a = moment(new Date().toISOString());
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


    render() {
        return <div>
            <h1>Staking Details</h1>

            {this.state.loading && <div className="content-section">
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
                </svg>
            </div>}

            {!this.state.loading && this.state.pool !== undefined &&
            <div className="two-col-md stacking-details">
                <div style={{ flex: 1 }}>
                    <div className="content-section" style={{ flex: 1, margin: "10px", display: "block", textAlign: "center" }}>
                        <img src={getImageByPoolName(this.state.pool.name)}  className="pool-logo" />
                        <div className="pool-name">
                            {this.state.pool.name}
                        </div>
                        <div className="sub-text">
                            <div>
                                Stake
                            </div>
                            <div>
                                <i className="fas fa-long-arrow-alt-right arrow-to"></i>
                            </div>
                            <div>
                                <span>{this.state.pool.inputSymbol}</span>
                            </div>
                        </div>
                        <div className="sub-text">
                            <div>
                                Earn
                            </div>
                            <div>
                                <i className="fas fa-long-arrow-alt-right arrow-to" style={{ transform: "rotate(180deg)" }}></i>
                            </div>
                            <div>
                                <span>{this.state.pool.outputSymbol}</span>
                            </div>
                        </div>
                        <div style={{ textAlign: "center", marginTop: "5px", marginBottom: "10px" }}>
                            <div className="btn-icon-rounded" style={{ display: "block" }} onClick={() => { }}>
                                <a target="_blank" href="#"><i className="fas fa-sign-in-alt"></i> Go to Pool Website</a>
                            </div>
                        </div>
                    </div>

                    <div className="content-section" style={{ margin: "10px", padding: "20px", display: "block" }}>
                        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                            <h2>My {this.state.pool.inputSymbol} pooled</h2>
                        </div>
                        <div style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                            <h3>
                                0
                            </h3>
                        </div>
                        <hr/>
                        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                            <h2>Total {this.state.pool.inputSymbol} pooled</h2>
                        </div>
                        <div style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                            <h3>
                                {this.state.pool.total_pooled / (10**18)}
                            </h3>
                        </div>
                        <hr/>
                        <p style={{color: "#6772ac", textAlign: "center"}}>Pool Progress ({this.getFarmingPeriod(this.state.pool.endDate)} left)</p>
                        <div className="p-progress-bar">
                                <div className="inner" style={{ width: `${this.getRewardProgress(this.state.pool.startDate, this.state.pool.endDate)}%` }}></div>
                        </div>
                    </div>
                </div>


                <div style={{ flex: 2 }}>
                    <div className="content-section" style={{ margin: "10px", padding: "20px", paddingBottom: 0 }}>
                        <Line
                            data={this.state.chartData}
                            height={255}
                            options={{
                                legend: {
                                    labels: {
                                        fontColor: "#6772ac"
                                    }
                                },
                                maintainAspectRatio: false,
                                scales: {
                                    yAxes: [
                                        {
                                            ticks: {
                                                beginAtZero: true,
                                                stepSize: 250,
                                                fontColor: "#6772ac",
                                                callback: (value, index, values) => {
                                                    return `${value} ${this.state.pool.inputSymbol}`
                                                }
                                            }
                                        }
                                    ]
                                }
                            }}
                        />
                    </div>
                    <div className="content-section" style={{ margin: "10px", padding: "20px" }}>

                        <div className="select-text-combo" style={{ display: "block", width: "100%", marginBottom: "10px" }}>
                            <div className="select-container" style={{ display: "flex" }}>
                                <div className="current-select" style={{ flex: 1 }} onClick={() => this.setState({ selectState: !this.state.selectState })}>
                                    <span style={{ marginLeft: 0 }}>Amount to stake</span>
                                </div>
                                <input style={{ flex: 2, minWidth: "auto" }} type="number" placeholder={`0.00 ${this.state.pool.inputSymbol}`} readOnly />
                            </div>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "10px", display: "block", width: "100%" }}>
                        <div className="alert" role="alert">
                            <p style={{fontSize: 12}}>I understand that my {this.state.pool.inputSymbol} will be locked for the time of the pool duration.</p>
                        </div>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "10px", display: "block", width: "100%" }}>
                            <div className="btn-icon-rounded" style={{ display: "block" }} onClick={() => { }}>
                                Pool my asset
                            </div>
                        </div>

                    </div>

                    <div className="content-section" style={{ margin: "10px", padding: "20px" }}>

                        <div className="select-text-combo" style={{ display: "block", width: "100%", marginBottom: "10px" }}>
                            <div className="select-container" style={{ display: "flex" }}>
                                <div className="current-select" style={{ flex: 1 }} onClick={() => this.setState({ selectState: !this.state.selectState })}>
                                    <span style={{ marginLeft: 0 }}>Pooled {this.state.pool.inputSymbol}</span>
                                </div>
                                <input style={{ flex: 2, minWidth: "auto" }} type="number" placeholder={`0.00 ${this.state.pool.inputSymbol}`} readOnly />
                            </div>
                        </div>

                        <div className="select-text-combo" style={{ display: "block", width: "100%", marginBottom: "10px" }}>
                            <div className="select-container" style={{ display: "flex" }}>
                                <div className="current-select" style={{ flex: 1 }} onClick={() => this.setState({ selectState: !this.state.selectState })}>
                                    <span style={{ marginLeft: 0 }}>{this.state.pool.outputSymbol} Reward</span>
                                </div>
                                <input style={{ flex: 2, minWidth: "auto" }} type="number" placeholder={`0.00 ${this.state.pool.outputSymbol}`} readOnly />
                            </div>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "10px", display: "block", width: "100%" }}>
                            <div className="btn-icon-rounded" style={{ display: "block" }} onClick={() => { }}>
                                Withdraw my asset
                            </div>
                        </div>

                    </div>
                </div>
            </div>}


            <div className="content-section" style={{ margin: "10px", padding: "20px" }}>
                <DataTable
                    title="History"
                    columns={[
                        { name: "Action", selector: "action", "sortable": true },
                        { name: "Amount", selector: "amount", "sortable": true },
                        { name: "Date", selector: "date", "sortable": true },
                        { name: "Transaction", selector: "tx", "sortable": false }
                    ]}
                    theme="peet-table"
                    data={[]}
                    // data={[
                    //     {
                    //         action: "Deposit", amount: 100 + " PTE", date: new Date().toLocaleDateString("en-US"),
                    //         tx: <a href="#">View on Etherscan</a>
                    //     }
                    // ]}
                />
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
})(StakingDetails)