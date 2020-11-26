import * as React from 'react'
import { connect } from "react-redux";
import { fetchPTEWETHPrice } from "../../actions/eth";
import { SelectTextCombo } from "../../components";
import ReducersCombinedState from '../../reducers/types/reducers';
import { CSSTransition } from "react-transition-group";
import { web3, wethContract } from "../../store";
import * as _ from 'underscore';

interface PayPeetProps {
    requestFetchPTEWETHPrice: Function
}

interface PayPeetState {
    selectFrom: string,
    valueFrom: number
}

class PayPeet extends React.Component<ReducersCombinedState & PayPeetProps, PayPeetState>  {
    constructor(props: ReducersCombinedState & PayPeetProps) {
        super(props);
        this.state = {
            selectFrom: 'eth',
            valueFrom: 0
        }
    }

    componentDidMount() {
        this.props.requestFetchPTEWETHPrice();
    }

    componentDidUpdate(prevProps: ReducersCombinedState & PayPeetProps, prevState: PayPeetState) {
        if(!_.isEqual(prevProps, this.props)){
            this.fetchBalanceBySelectedCurrency();
        }
        if(prevState.selectFrom != this.state.selectFrom) {
            this.fetchBalanceBySelectedCurrency();
        }
    }

    fetchBalanceBySelectedCurrency() {
        switch(this.state.selectFrom) {
            case "eth":
                this.fetchEthereumBalance();
                break;

            case "weth":
                this.fetchWEthereumBalance();
                break;
        }
    }

    fetchEthereumBalance() {
        if(this.props.eth.accounts.length == 0) return;
        web3.eth.getBalance(this.props.eth.accounts[0], (err, result) => {
            if(err) return;
            this.setState({valueFrom: parseFloat(web3.utils.fromWei(result, "ether"))})
        })
    }

    fetchWEthereumBalance() {
        //await wethContractInstance.methods.balanceOf(accounts[0]).call({from: accounts[0]}))
        if(this.props.eth.accounts.length == 0) return;
        wethContract.methods.balanceOf(this.props.eth.accounts[0]).call({from: this.props.eth.accounts[0]}).then((result) => {
            this.setState({valueFrom: parseFloat(web3.utils.fromWei(result, "ether"))})
        })
    }

    render() {
        return <div>
            <h1>PayPeet - Buy your Peet Tokens</h1>
            <div className="content-section">
                {this.props.eth.currentPTEWETHPrice == 0 ? <div style={{display: "inline-block", marginLeft: "auto", marginRight: "auto", marginTop: "10px"}}>
                    <h2 style={{fontSize: "25px", marginTop: "10px"}}>
                        Loading ..
                    </h2>
                </div> : <div style={{display: "inline-block", marginLeft: "auto", marginRight: "auto", marginTop: "10px"}}>
                    <SelectTextCombo readonly={false} selectedItem={this.state.selectFrom} items={[
                        {id: "eth", name: "ETH", image: require("../../../assets/ethereum-logo.png")},
                        {id: "weth", name: "WETH", image: require("../../../assets/ethereum-logo.png")}
                    ]} value={this.state.valueFrom.toFixed(8).toString()} onChange={(value) => {
                        this.setState({valueFrom: parseFloat(value)});
                    }} onSelectChange={(value) => {
                        this.setState({selectFrom: value});
                    }} />
                    <i className="fas fa-long-arrow-alt-right arrow-to"></i>
                    <SelectTextCombo readonly={true} selectedItem="pte" items={[
                        {id: "pte", name: "PTE", image: require("../../../assets/pte.png")}
                    ]} value={(this.state.valueFrom * this.props.eth.currentPTEWETHPrice).toFixed(8).toString()} />
                    <h2 style={{fontSize: "20px", marginTop: "10px"}}>You will exchange ERC-20 token to Peet Tokens</h2>
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="btn-icon-rounded" onClick={() => {}}>
                            <i className="fas fa-random"></i> Request swap
                        </div>
                    </div>
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
        }
    }
})(PayPeet)