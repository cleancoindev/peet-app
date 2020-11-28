import * as React from 'react'
import { connect } from "react-redux";
import { requestLogin, requestLogout } from '../../actions/eth';
import { requestSwitchSidebarOpen } from '../../actions/app';
import { EthState } from '../../reducers/types/eth';
import { ChainId } from '@uniswap/sdk'
import ReducersCombinedState from '../../reducers/types/reducers';

interface NavbarProps {
    requestLogin: Function
    requestSwitchSidebarOpen: Function
}

class Navbar extends React.Component<ReducersCombinedState & NavbarProps, {}> {
    constructor(props: ReducersCombinedState & NavbarProps) {
        super(props);
    }

    render() {
        return <div id="navbar">
            <div className="burger-menu-icon" onClick={() => this.props.requestSwitchSidebarOpen()}>
                <i className="fas fa-bars"></i>
            </div>

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
                                <div className="btn-icon-rounded active" >
                                    <i className="fas fa-user"></i> {`${this.props.eth.accounts[0].substr(0, 6)}...${this.props.eth.accounts[0].substr(this.props.eth.accounts[0].length - 6, this.props.eth.accounts[0].length)}`}
                                </div>
                            </span>
                            :
                            <div className="btn-icon-rounded" onClick={() => this.props.requestLogin()}>
                                <i className="fas fa-sign-in-alt"></i> Connect to a wallet
                            </div>
                        }

                        <div className="break-online-mobile"></div>

                        <div className="btn-icon-rounded btn-only-icon" data-tip="Twitter">
                            <a target="_blank" href="https://twitter.com/peet_fi"><i className="fab fa-twitter"></i></a>
                        </div>

                        <div className="btn-icon-rounded btn-only-icon" data-tip="Discord">
                            <a target="_blank" href="https://discord.gg/vszbYWj"><i className="fab fa-discord"></i></a>
                        </div>

                        <div className="btn-icon-rounded btn-only-icon" data-tip="Telegram">
                            <a target="_blank" href="https://t.me/peetdefi"> <i className="fab fa-telegram"></i></a>
                        </div>

                        <div className="btn-icon-rounded btn-only-icon" data-tip="BitcoinTalk">
                            <a target="_blank" href="https://bitcointalk.org/index.php?topic=5285069.20"><i className="fab fa-bitcoin"></i></a>
                        </div>

                        <div className="btn-icon-rounded btn-only-icon" data-tip="Github">
                            <a target="_blank" href="https://github.com/PeetFinanceDefi"><i className="fab fa-github"></i></a>
                        </div>

                        <div className="btn-icon-rounded btn-only-icon" data-tip="Medium">
                            <a target="_blank" href="https://medium.com/@peetdefi"><i className="fab fa-medium"></i></a>
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
        },
        requestSwitchSidebarOpen: () => {
            dispatch(requestSwitchSidebarOpen() as any)
        }
    }
})(Navbar)