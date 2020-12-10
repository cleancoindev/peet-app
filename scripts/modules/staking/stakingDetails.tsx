import * as React from 'react'
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Line } from 'react-chartjs-2';
import DataTable, { createTheme } from 'react-data-table-component';
import {toastr} from 'react-redux-toastr';

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
    constructor(props: any) {
        super(props);
        this.state = {
            chartData: {
                labels: ["", "", "", "", "", "", ""],
                datasets: [
                    {
                        label: 'PTE in the pool',
                        data: [
                            100, 200, 350, 584, 798, 1256, 1985
                        ],
                        fill: true,
                        backgroundColor: 'rgba(208, 47, 182, 0.3)',
                        borderColor: 'rgba(208, 47, 182, 1)',
                    },
                ]
            }
        }
    }

    componentDidMount() {
        toastr.info('Staking', 
            "This is a demonstration page for the future staking system, you can't interact with the page yet, stay tuned on our social networks",
            {
                timeOut: 10000
            });
    }

    render() {
        return <div>
            <h1>Staking Details</h1>

            <div className="two-col-md stacking-details">
                <div style={{ flex: 1 }}>
                    <div className="content-section" style={{ flex: 1, margin: "10px", display: "block", textAlign: "center" }}>
                        <img src={"https://s2.coinmarketcap.com/static/img/coins/200x200/7150.png"} className="pool-logo" />
                        <div className="pool-name">
                            Flamingo
                        </div>
                        <div className="sub-text">
                            <div>
                                Stake
                            </div>
                            <div>
                                <i className="fas fa-long-arrow-alt-right arrow-to"></i>
                            </div>
                            <div>
                                <span>PTE</span>
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
                                <span>FLM</span>
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
                            <h2>PTE pooled</h2>
                        </div>
                        <div style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
                            <h3>
                                0
                            </h3>
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
                                                    return value + " PTE";
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
                                    <span style={{ marginLeft: 0 }}>Amount to pool</span>
                                </div>
                                <input style={{ flex: 2, minWidth: "auto" }} type="number" placeholder="0.00" readOnly />
                            </div>
                        </div>

                        <div className="select-text-combo" style={{ display: "block", width: "100%" }}>
                            <div className="select-container" style={{ display: "flex" }}>
                                <div className="current-select" style={{ flex: 1 }} onClick={() => this.setState({ selectState: !this.state.selectState })}>
                                    <span style={{ marginLeft: 0 }}>Staking period</span>
                                </div>
                                <input style={{ flex: 2, minWidth: "auto" }} type="number" placeholder="0" readOnly />
                            </div>
                        </div>

                        <div style={{ textAlign: "center", marginTop: "10px", display: "block", width: "100%" }}>
                            <div className="btn-icon-rounded" style={{ display: "block" }} onClick={() => { }}>
                                <i className="fas fa-lock"></i> Pool my assets
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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
                    data={[
                        {
                            action: "Deposit", amount: 100 + " PTE", date: new Date().toLocaleDateString("en-US"),
                            tx: <a href="#">View on Etherscan</a>
                        }
                    ]}
                />
            </div>
        </div>;
    }
}

export default connect((state: any, ownProps: any) => {
    return {}
}, (dispatch) => {
    return {

    }
})(StakingDetails)