import * as React from 'react'
import { connect } from "react-redux";
import { fetchPTEWETHPrice, fetchPTEWBTCPrice } from "../../actions/eth";
import { SelectTextCombo } from "../../components";
import ReducersCombinedState from '../../reducers/types/reducers';
import { CSSTransition } from "react-transition-group";
import { web3, wethContract, wbtcContract, peetPayContract } from "../../store";
import Env from "../../env";
import * as _ from 'underscore';
import {toastr} from 'react-redux-toastr';


interface PayPeetProps {
    requestFetchPTEWETHPrice: Function
    requestFetchPTEWBTCPrice: Function
}

interface PayPeetState {
    fromAddr: string
    selectFrom: string
    valueFrom: number
    currentBonus: number
    rawValue: string
    lastTxHash: string
    waitingForTx: boolean
}

class PayPeet extends React.Component<ReducersCombinedState & PayPeetProps, PayPeetState>  {
    constructor(props: ReducersCombinedState & PayPeetProps) {
        super(props);
        this.state = {
            lastTxHash: '',
            fromAddr: '',
            selectFrom: 'eth',
            valueFrom: 0,
            rawValue: "0",
            currentBonus: 0,
            waitingForTx: false
        }
    }

    componentDidMount() {
        this.props.requestFetchPTEWETHPrice();
        this.fetchBonus();
        
        if(this.props.eth.accounts.length == 0) return;
        this.fetchAddr();
        this.fetchBalanceBySelectedCurrency();
    }

    componentDidUpdate(prevProps: ReducersCombinedState & PayPeetProps, prevState: PayPeetState) {
        if(!_.isEqual(prevProps, this.props)){
            this.fetchBalanceBySelectedCurrency();
            this.fetchBonus();
        }
        if(!_.isEqual(prevProps.eth.accounts, this.props.eth.accounts)){
            this.fetchAddr();
        }
        if(prevState.selectFrom != this.state.selectFrom) {
            this.fetchBalanceBySelectedCurrency();
        }
    }

    fetchAddr() {
        if(this.props.eth.accounts.length == 0) return;
        this.setState({fromAddr: this.props.eth.accounts[0]});
    }

    fetchBalanceBySelectedCurrency() {
        switch(this.state.selectFrom) {
            case "eth":
                this.fetchEthereumBalance();
                break;

            case "weth":
                this.fetchWEthereumBalance();
                break;

            case "wbtc":
                this.fetchWbtcBalance();
                break;
        }
    }

    fetchBonus() {
        peetPayContract.methods.getCurrentSaleBonus().call().then((result) => {
            this.setState({currentBonus: result})
        })
    }

    fetchEthereumBalance() {
        if(this.props.eth.accounts.length == 0) return;
        web3.eth.getBalance(this.props.eth.accounts[0], (err, result) => {
            if(err) return;
            this.setState({valueFrom: parseFloat(web3.utils.fromWei(result, "ether")), rawValue: web3.utils.fromWei(result, "ether")})
        })
    }

    fetchWEthereumBalance() {
        if(this.props.eth.accounts.length == 0) return;
        wethContract.methods.balanceOf(this.props.eth.accounts[0]).call({from: this.props.eth.accounts[0]}).then((result) => {
            this.setState({valueFrom: parseFloat(web3.utils.fromWei(result, "ether")), rawValue: web3.utils.fromWei(result, "ether")})
        })
    }

    fetchWbtcBalance() {
        if(this.props.eth.accounts.length == 0) return;
        wbtcContract.methods.balanceOf(this.props.eth.accounts[0]).call({from: this.props.eth.accounts[0]}).then((result: any) => {
            this.setState({valueFrom: parseFloat(result) / 100000000})
        })
    }

    requestSwap() {
        if(this.props.eth.accounts.length == 0) {
            toastr.error('Not connected', 'Please login first with Metamask or just follow the instructions below to send your ETH with your external wallet')
            return;
        }
        const amount = web3.utils.toWei(this.state.valueFrom.toString(), "ether");
        if(this.state.selectFrom != "eth") {
            const allowance = wethContract.methods.allowance(this.props.eth.accounts[0], Env().PEETPAY_CONTRACT_ADDR).call().then(async (result) => {
                if(result == 0) {
                    toastr.warning('Approve required', 'Please approve the contract in Metamask');
                    wethContract.methods.approve(Env().PEETPAY_CONTRACT_ADDR, web3.utils.toWei("100000", "ether")).send({from: this.props.eth.accounts[0]}).then(() => {
                        toastr.success('Approved', 'You have approved the contract with success');
                        this.requestTransaction(amount);
                    }).catch((ex: Error) => {
                        toastr.error('Error', 'Allowance declined')
                    });
                }
                else {
                    this.requestTransaction(amount);
                }
            }).catch((ex: Error) => {
                console.log(ex);
                toastr.error('Error', 'Allowance check failed')
            }) 
        }
        else {
            this.requestTransaction(amount);
        }
    }

    requestTransaction(amount: String) {
        this.setState({waitingForTx: true})
        toastr.warning('Transaction request', 'Please accept the transaction of ' + this.state.valueFrom + " " + this.state.selectFrom.toUpperCase() + " in Metamask");
        if(this.state.selectFrom == "eth") {
            web3.eth.sendTransaction({to: Env().PEETPAY_CONTRACT_ADDR, from: this.props.eth.accounts[0], value: amount}).then((result) => {
                console.log(result);
                toastr.success('Approved', 'You have approved the transaction with success, check the TX Hash on Metamask');
                this.setState({lastTxHash: result.transactionHash, waitingForTx: false})
            }).catch((ex: Error) => {
                this.setState({waitingForTx: false})
                toastr.error('Error', 'Transaction declined')
            });;
        } else if(this.state.selectFrom == "weth") {
            peetPayContract.methods.transferToken(amount).send({from: this.props.eth.accounts[0]}).then((result) => {
                console.log(result);
                toastr.success('Approved', 'You have approved the transaction with success, check the TX Hash on Metamask');
                this.setState({lastTxHash: result.transactionHash, waitingForTx: false})
            }).catch((ex: Error) => {
                this.setState({waitingForTx: false})
                toastr.error('Error', 'Transaction declined')
            });
        }
    }

    render() {
        return <div>
            <h1>PayPeet - Swap your currency</h1>
            {this.state.lastTxHash != '' ? <div className="alert-success" role="alert" 
                style={{textAlign: "center", padding: "10px", borderRadius: "10px", marginBottom: "15px", marginTop: "15px"}}>
                Tx Hash : {this.state.lastTxHash}
            </div> : null}

            {this.state.waitingForTx ? <div className="alert-infos" role="alert" 
                style={{textAlign: "center", padding: "10px", borderRadius: "10px", marginBottom: "15px", marginTop: "15px"}}>
                <i className="fas fa-spinner"></i> Waiting for TX ..
            </div> : null}

            <div className="content-section">
                {this.props.eth.currentPTEWETHPrice == 0 ? <div style={{display: "inline-block", marginLeft: "auto", marginRight: "auto", marginTop: "10px"}}>
                    <h2 style={{fontSize: "25px", marginTop: "10px"}}>
                        Loading ..
                    </h2>
                </div> : <div style={{display: "inline-block", marginLeft: "auto", marginRight: "auto", marginTop: "10px"}}>
                    <input type="text" placeholder="From Address" style={{marginBottom: "10px", textAlign: "center"}} value={this.state.fromAddr} />
                    <div style={{ marginRight: "auto", marginLeft: "auto"}}>
                        <SelectTextCombo readonly={false} selectedItem={this.state.selectFrom} items={[
                            {id: "eth", name: "ETH", image: require("../../../assets/ethereum-logo.png")},
                            {id: "weth", name: "WETH", image: require("../../../assets/ethereum-logo.png")}
                        ]} value={this.state.rawValue} onChange={(value) => {
                            this.setState({valueFrom: parseFloat(value), rawValue: value});
                        }} onSelectChange={(value) => {
                            this.setState({selectFrom: value});
                        }} />
                        <i className="fas fa-long-arrow-alt-right arrow-to"></i>
                        <SelectTextCombo readonly={true} selectedItem="pte" items={[
                            {id: "pte", name: "PTE", image: require("../../../assets/pte.png")}
                        ]} value={(this.state.valueFrom * this.props.eth.currentPTEWETHPrice).toFixed(8).toString()} />
                    </div>
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="bonus-circle">
                            {this.state.currentBonus + "%"}
                            <div className="bonus-text">
                                Bonus
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="btn-icon-rounded" onClick={() => { this.requestSwap(); }}>
                            <i className="fas fa-random"></i> Request swap
                        </div>
                    </div>
                    
                    <h2 style={{fontSize: "20px", marginTop: "15px"}}>If you don't have Metamask you can just send your ETH on this address and you will receive PTE back.</h2>
                    <input type="text" readOnly style={{marginBottom: "10px", textAlign: "center"}} value={Env().PEETPAY_CONTRACT_ADDR} />
                </div>}
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
        requestFetchPTEWETHPrice: () => {
            dispatch(fetchPTEWETHPrice() as any)
        },
        requestFetchPTEWBTCPrice: () => {
            dispatch(fetchPTEWBTCPrice() as any)
        }
    }
})(PayPeet)