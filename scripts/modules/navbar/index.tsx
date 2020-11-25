import * as React from 'react'
import { connect } from "react-redux";
import { requestLogin, requestLogout } from '../../actions/eth';
import { EthState } from '../../reducers/types/eth';
import { ChainId } from '@uniswap/sdk'

class Navbar extends React.Component {
    constructor(props: EthState) {
        super(props);
    }

    render() {
        return <div id="navbar">
            <div className="nav-container">
                <div className="logo">
                    <img src={require("../../../assets/pdfilogo.png")} />
                </div>

                <div className="right-content">
                    <div className="mobile-container">
                        {
                        (this.props.eth as EthState).accounts.length > 0 ?
                            <span>
                                <div className={"btn-icon-rounded " + ((this.props.eth as EthState).netName == "MAINNET" ? "active-green" : "active-orange")} style={{maxWidth: "200px"}}>
                                    {(this.props.eth as EthState).netName}
                                </div>
                                <div className="btn-icon-rounded active" style={{maxWidth: "200px"}}>
                                    <i className="fas fa-user"></i> {(this.props.eth as EthState).accounts[0]}
                                </div>
                            </span>
                            :
                            <div className="btn-icon-rounded" onClick={() => this.props.requestLogin()}>
                                <i className="fas fa-sign-in-alt"></i> Connect to a wallet
                            </div>
                        }

                        <div className="break-online-mobile"></div>

                        <div className="btn-icon-rounded btn-only-icon" data-tip="Twitter">
                            <i className="fab fa-twitter"></i>
                        </div>

                        <div className="btn-icon-rounded btn-only-icon" data-tip="Discord">
                            <i className="fab fa-discord"></i>
                        </div>

                        <div className="btn-icon-rounded btn-only-icon" data-tip="Telegram">
                            <i className="fab fa-telegram"></i>
                        </div>

                        <div className="btn-icon-rounded btn-only-icon" data-tip="BitcoinTalk">
                            <i className="fab fa-bitcoin"></i>
                        </div>

                        <div className="btn-icon-rounded btn-only-icon" data-tip="Github">
                            <i className="fab fa-github"></i>
                        </div>

                        <div className="btn-icon-rounded btn-only-icon" data-tip="Medium">
                            <i className="fab fa-medium"></i>
                        </div>
                    </div>
                </div>
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
        requestLogin: () => {
            dispatch(requestLogin() as any)
        }
    }
})(Navbar)