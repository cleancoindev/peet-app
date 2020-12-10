import * as React from 'react'
import { connect } from "react-redux";
import { requestLogin, requestLogout } from '../../actions/eth';
import { bindNeoline } from '../../actions/neo';
import { requestSwitchSidebarOpen } from '../../actions/app';
import { EthState } from '../../reducers/types/eth';
import { ChainId } from '@uniswap/sdk'
import ReducersCombinedState from '../../reducers/types/reducers';
import { NeoState } from '../../reducers/types/neo';

interface NavbarProps {
    requestLogin: Function
    requestSwitchSidebarOpen: Function
    requestNeoLogin: Function
}

interface NavbarState {
    dropdownWallet: boolean
}

class Navbar extends React.Component<ReducersCombinedState & NavbarProps, NavbarState> {
    constructor(props: ReducersCombinedState & NavbarProps) {
        super(props);

        this.state = {
            dropdownWallet: false,
        };
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
                        <div className="btn-icon-rounded" onClick={() => this.setState({dropdownWallet: !this.state.dropdownWallet})}>
                            <i className="fas fa-sign-in-alt"></i> {(this.props.eth as EthState).accounts.length > 0 || (this.props.neo as NeoState).address != null ? "Connected" : "Connect to a wallet"}
                        </div>

                        { this.state.dropdownWallet ? <div className="login-dropdown-menu">
                        {
                            (this.props.eth as EthState).accounts.length > 0 ?
                                <span>
                                    <div className="btn-icon-rounded connected" style={{marginBottom: "5px", width: "100%"}} onClick={() => this.props.requestLogin()}>
                                        <img src={require("../../../assets/metamask.png")} /> <span>{`${this.props.eth.accounts[0].substr(0, 6)}...${this.props.eth.accounts[0].substr(this.props.eth.accounts[0].length - 6, this.props.eth.accounts[0].length)}`}</span>
                                        <div className={"btn-icon-rounded btn-small " + ((this.props.eth as EthState).netName == "MAINNET" ? "active-green" : "active-orange")} style={{maxWidth: "200px"}}>
                                            {(this.props.eth as EthState).netName}
                                        </div>
                                    </div>
                                </span>
                                :
                                <div className="btn-icon-rounded" style={{marginBottom: "5px", width: "100%"}} onClick={() => this.props.requestLogin()}>
                                    <img src={require("../../../assets/metamask.png")} /> <span>Connect with Metamask</span> <i className="fas fa-arrow-right"></i>
                                </div>
                            }
                            <div />
                            {
                            (this.props.neo as NeoState).address != null ?
                                <div className="btn-icon-rounded connected" style={{ width: "100%"}} onClick={() => this.props.requestNeoLogin()}>
                                    <img src={require("../../../assets/neoline.png")} /> <span>{`${this.props.neo.address.substr(0, 6)}...${this.props.neo.address.substr(this.props.neo.address.length - 6, this.props.neo.address.length)}`}</span>
                                    <div className={"btn-icon-rounded btn-small " + ((this.props.neo as NeoState).network == "MainNet" ? "active-green" : "active-orange")} style={{maxWidth: "200px"}}>
                                        {(this.props.neo as NeoState).network.toUpperCase()}
                                    </div>
                                </div>
                            :
                                <div className="btn-icon-rounded" style={{ width: "100%"}} onClick={() => this.props.requestNeoLogin()}>
                                    <img src={require("../../../assets/neoline.png")} /> <span>Connect with Neoline</span> <i className="fas fa-arrow-right"></i>
                                </div>
                            }
                        </div> : null }

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
        eth: state.eth,
        neo: state.neo
    }
}, (dispatch) => {
    return {
        requestLogin: () => {
            dispatch(requestLogin() as any)
        },
        requestNeoLogin: () => {
            dispatch(bindNeoline() as any)
        },
        requestSwitchSidebarOpen: () => {
            dispatch(requestSwitchSidebarOpen() as any)
        }
    }
})(Navbar)