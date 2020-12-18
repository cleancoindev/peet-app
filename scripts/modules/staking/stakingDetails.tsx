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
import { getErc20Contract, web3 } from "../../store"
import { getWebsiteByPoolName } from "./website"
import ReducersCombinedState from '../../reducers/types/reducers';
import Env from "../../env";

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

class StakingDetails extends React.Component<ReducersCombinedState> {
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
            amountPooled: 0,
            pool: undefined,
            loading: true,
            canWithdraw: false,
            rawValueStakeAmount: "0.00",
            fromAddr: undefined,
            textPool: "",
            textWithdraw: ""
        }
        this.fetchHistory = this.fetchHistory.bind(this)
        this.poolAsset = this.poolAsset.bind(this)
        this.withdraw = this.withdraw.bind(this)
    }

    async fetchHistory(toAdd: number[]) {
        try {
            const history = await PeetOracleProvider.fetchHistoryPool(this.props.match.params.poolId)
                const datas = []
                let minLen: number = (toAdd.length + history.data.length) - 7;

                while(minLen < 0) {
                    datas.push(0)
                    minLen++;
                }
                history.data.forEach(x => datas.push(x))
                toAdd.forEach(x => datas.push(x))
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
        this.fetchAddrAndInit()
        this.fetchHistory([])
    }

    componentDidUpdate(prevProps: any, _: any) {
        if(prevProps.eth.accounts !== this.props.eth.accounts) {
            this.fetchAddrAndInit();
        }
    }

    fetchAddrAndInit() {
        if(this.props.eth.accounts.length == 0) return;
        this.setState({fromAddr: this.props.eth.accounts[0]});

        this.initPoolInfo(this.props.eth.accounts[0])
    }

    async initPoolInfo(fromAddr: string) {
    try {
            const pool = await StakingPoolProvider.fetchPool(this.props.match.params.poolId)
            const amountPooled = await StakingPoolProvider.fetchAmountPooled(this.props.match.params.poolId, fromAddr)
            // var canWithdraw: boolean = (amountPooled > 0 && new Date() > pool.endDate)
            var canWithdraw: boolean = true
            this.setState({pool, loading: false, amountPooled, canWithdraw, textPool: `Pool my ${pool.inputSymbol}`, textWithdraw: `Withdraw my ${pool.outputSymbol} / ${pool.inputSymbol}`})
        } catch (e) {
            const errorString: string = EthereumHelper.getContractError(e)
            if (errorString.includes("Invalid Pool")) {
                toastr.error('Error', 'Invalid pool hash.. redirecting to live pools list')
                this.props.push('/staking')
            }
            EthereumHelper.errorParser(e)
        }
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

    async withdraw(event: any)
    {
        event.preventDefault()
        if (!this.state.canWithdraw) {
            return toastr.error("Error", `You cant withdraw, invalid amount or end date of the pool not reached`)
        }
        try
        {
            this.setState({textWithdraw: `Waiting Confirmation...`})
            let withdrawReward: number = await StakingPoolProvider.withdrawFromPool(this.props.match.params.poolId, this.state.fromAddr)
            withdrawReward = withdrawReward / (10 ** 18)

            toastr.success("Staking ended", `Congratulations! You received ${withdrawReward} ${this.state.pool.outputSymbol} as reward from that pool`)
            this.setState({canWithdraw: false, textWithdraw: `Withdraw my ${this.state.pool.outputSymbol} / ${this.state.pool.inputSymbol}`, amountPooled: 0})
        }
        catch (e) {
            this.setState({textWithdraw: `Withdraw my ${this.state.pool.outputSymbol} / ${this.state.pool.inputSymbol}`})
            EthereumHelper.errorParser(e)
        }
    }

    async checkAllowance(): Promise<boolean>
    {
        return new Promise<boolean>(async (res, rej) => {
            const inputAssetContract = getErc20Contract(this.state.pool.inputAsset)
            const maxAllowance: number = (await EthereumHelper.callOnContract(inputAssetContract.methods.allowance(this.state.fromAddr, Env().ETH_STAKING_CONTRACT), this.state.fromAddr)) / (10 ** 18)
            if (maxAllowance > 0) { return res(true) }

            this.setState({textPool: `Waiting Approvance...`})
            inputAssetContract.methods.approve(Env().ETH_STAKING_CONTRACT, web3.utils.toWei("100000", "ether")).send({from: this.props.eth.accounts[0]}).then(() => {
                this.setState({textPool: `Pool my ${this.state.pool.inputSymbol}`})
                res(true)
            }).catch((ex: Error) => {
                toastr.error('Error', 'Allowance declined')
                res(false)
            });
        })

    }

    calculateReward(): string {
        const maxPooled = this.state.pool.max_pooled / (10 ** 18)
        const rewardAmount = this.state.pool.amount_reward / (10 ** 18)
        const poolPercent: number = (100 * this.state.amountPooled) / maxPooled

        return (rewardAmount * (poolPercent / 100)).toFixed(8)
    }

    async poolAsset(event: any)
    {
        event.preventDefault()

        if (this.state.fromAddr === undefined) { return toastr.error('Wallet Error', 'Please connect your wallet') }

        const allowance: boolean = await this.checkAllowance()
        if (!allowance) { return }
        const inputAssetContract = getErc20Contract(this.state.pool.inputAsset)
        try {
            const maxInputAmount: number = (await EthereumHelper.callOnContract(inputAssetContract.methods.balanceOf(this.state.fromAddr), this.state.fromAddr)) / (10 ** 18)
            const value: number = Number(this.state.rawValueStakeAmount)
            if (this.state.rawValueStakeAmount === "0.00") { return toastr.error('Staking Error', `Please set a value to stake`) } 
            if (value < 0 || value > maxInputAmount) {
                return toastr.error('Staking Error', `You only have ${maxInputAmount} ${this.state.pool.inputSymbol} available in your wallet!`)
            }
            this.setState({textPool: `Waiting Confirmation...`})
            await StakingPoolProvider.depositInPool(this.props.match.params.poolId, value, this.state.fromAddr)
            
            this.setState({amountPooled: this.state.amountPooled + value, textPool: `Pool my ${this.state.pool.inputSymbol}`})
            toastr.success('Staking Success', `Congratulations! You sucessfully pooled your ${value} ${this.state.pool.inputSymbol}`)

            this.fetchHistory([value])
            this.initPoolInfo(this.state.fromAddr)
        } catch (e) {
            const errorString: string = EthereumHelper.getContractError(e)
            if (errorString.includes("Max wallet")) {
                toastr.error(`Staking Error`, `Max wallet pool limit reach with this amount, you can only stake a maximum of ${this.state.pool.max_wallet_pooled / (10 ** 18)} ${this.state.pool.inputSymbol}`)
            }

            EthereumHelper.errorParser(e)
            this.setState({textPool: `Pool my ${this.state.pool.inputSymbol}`})
        }
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
                        <hr/>
                        <div className="sub-text">
                            <div>
                            <span title="Total of reward amount in that pool" style={{fontSize: 10, letterSpacing: 1}}>Max rewards {this.state.pool.amount_reward / (10 ** 18)} {this.state.pool.outputSymbol} </span>
                            </div>
                        </div>

                        <div className="sub-text">
                            <div>
                            <span title="Max participation per wallet" style={{fontSize: 10, letterSpacing: 1}}>Max participation {this.state.pool.max_wallet_pooled / (10 ** 18)} {this.state.pool.inputSymbol} </span>
                            </div>
                        </div>
                    </div>

                    <div className="content-section" style={{ margin: "10px", padding: "20px", display: "block" }}>
                        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                            <h2>My {this.state.pool.inputSymbol} pooled</h2>
                        </div>
                        <div style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                            <h3>
                                {this.state.amountPooled}
                            </h3>
                        </div>
                        <hr/>
                        <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                            <h2>Total {this.state.pool.inputSymbol} pooled</h2>
                        </div>
                        <div style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                            <h3>
                                {this.state.pool.total_pooled / (10**18)} / {this.state.pool.max_pooled / (10**18)}
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
                        <form style={{minWidth: "100%"}}>
                        <div className="select-text-combo" style={{ display: "block", width: "100%", marginBottom: "10px" }}>
                            <div className="select-container" style={{ display: "flex" }}>
                                <div className="current-select" style={{ flex: 1 }} onClick={() => this.setState({ selectState: !this.state.selectState })}>
                                    <span style={{ marginLeft: 0 }}>Amount to stake</span>
                                </div>
                                <input value={this.state.rawValueStakeAmount} style={{ flex: 2, minWidth: "auto" }} type="number" placeholder={`0.00 ${this.state.pool.inputSymbol}`} onChange={(event: any) => {
                                    if (event.target.value < 0) { event.target.value = 0}

                                    this.setState({rawValueStakeAmount: event.target.value});
                                }} />
                            </div>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "10px", display: "block", width: "100%" }}>
                            <div className="alert" role="alert">
                                <p style={{fontSize: 12}}>I understand that my {this.state.pool.inputSymbol} will be locked for the time of the pool duration.</p>
                            </div>
                        </div>
                       
                        <div style={{ textAlign: "center", display: "block", width: "100%" }}>
                            <div style={{ display: "block" }} onClick={() => { }}>
                                    <input onClick={this.poolAsset} id="submit-staking" type="submit" value={this.state.textPool}></input>
                            </div>
                        </div>
                     </form>
                    </div>

                    <div className="content-section" style={{ margin: "10px", padding: "20px" }}>

                        <div className="select-text-combo" style={{ display: "block", width: "100%", marginBottom: "10px" }}>
                            <div className="select-container" style={{ display: "flex" }}>
                                <div className="current-select" style={{ flex: 1 }} onClick={() => this.setState({ selectState: !this.state.selectState })}>
                                    <span style={{ marginLeft: 0 }}>Pooled {this.state.pool.inputSymbol}</span>
                                </div>
                                <input style={{ flex: 2, minWidth: "auto" }} type="readonly" value={`${this.state.amountPooled} ${this.state.pool.inputSymbol}`} />
                            </div>
                        </div>

                        <div className="select-text-combo" style={{ display: "block", width: "100%", marginBottom: "10px" }}>
                            <div className="select-container" style={{ display: "flex" }}>
                                <div className="current-select" style={{ flex: 1 }} onClick={() => this.setState({ selectState: !this.state.selectState })}>
                                    <span style={{ marginLeft: 0, fontSize: 13 }}>{this.state.pool.outputSymbol} Calculated Reward</span>
                                </div>
                                <input style={{ flex: 2, minWidth: "auto" }} type="readonly" value={`${this.calculateReward()} ${this.state.pool.outputSymbol}`} />
                            </div>
                        </div>

                        <div style={{ textAlign: "center", display: "block", width: "100%" }}>
                            <div style={{ display: "block" }} onClick={() => { }}>
                                <form>
                                    {this.state.canWithdraw ?
                                    <input onClick={this.withdraw} id="submit-staking" type="submit" value={this.state.textWithdraw}></input>
                                    :
                                    <input title="You cant withdraw, invalid amount or end date of the pool not reached" onClick={this.withdraw} id="submit-staking" type="submit" value={this.state.textWithdraw} disabled></input>
                                    }
                                    
                                </form>
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
    return {
        eth: state.eth
    }
}, (dispatch) => {
    return {
        push: (route) => {
            dispatch(ConnectedReactRouter.push(route));
        },
    }
})(StakingDetails)