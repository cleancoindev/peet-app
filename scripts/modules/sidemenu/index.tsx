import * as React from 'react'
import { connect } from "react-redux";
import {
    BrowserRouter as Router,
    Link,
    withRouter
} from "react-router-dom";
import * as ConnectedReactRouter from 'connected-react-router'
import ReducersCombinedState from '../../reducers/types/reducers';
import { AppState } from '../../reducers/types/app';
import { requestSwitchSidebarOpen } from '../../actions/app';
import { toastr } from 'react-redux-toastr';
import StakingPoolProvider from '../../providers/stakingPoolProvider';
import * as _ from 'underscore';
import { EthState } from '../../reducers/types/eth';
import { pteTokenContract, web3 } from '../../store';

interface SidemenuProps {
    location: any,
    app: AppState,
    eth: EthState,
    requestSwitchSidebarOpen: Function
}

class Sidemenu extends React.Component<ReducersCombinedState & SidemenuProps, {}> {

    state: any
    constructor(props: any) {
        super(props);
        this.state = {
            poolsCount: 0,
            pteBalance: 0
        }
    }

    async componentDidMount() {
        const count = await StakingPoolProvider.countLiveEthPools();
        if (count === 0) { return }
        this.setState({poolsCount: count})
    }

    componentDidUpdate(prevProps: SidemenuProps, prevState: any) {
        if(!_.isEqual(prevProps.eth.accounts, this.props.eth.accounts)){
            this.fetchBalance();
        }
    }

    async fetchBalance() {
        if(this.props.eth.accounts.length <= 0) return;
        pteTokenContract.methods.balanceOf(this.props.eth.accounts[0]).call().then((balance) => {
            const formattedBalance = parseFloat(web3.utils.fromWei(balance.toString(), "ether"));
            this.setState({pteBalance: formattedBalance});
        });
    }

    render() {
        return <div id="sidemenu" className={this.props.app.sidebarOpen ? "sidemenu-open" : ""}>
            <Router>
                <div className="sidebar-container">
                    <div className={"menu " + (location.pathname.startsWith("/staking") || (location.pathname.endsWith("/") ? "" : "menu-closed")}>
                        <h3>
                            Staking Pools Available
                        </h3>
                        <div style={{ textAlign: "center", fontSize: "24px" }}>
                            {this.state.poolsCount}
                        </div>
                        <h3>
                            PTE available
                        </h3>
                        <div style={{ textAlign: "center", fontSize: "24px" }}>
                            {this.state.pteBalance.toFixed(5)}
                        </div>
                    </div>
                    <div className="menu">

                    <div className={"menu-item " + (location.pathname == "/staking" || location.pathname =="/" ? "active" : "")} onClick={() => {
                            this.props.push("/staking")
                            this.props.requestSwitchSidebarOpen();
                        }}>
                            <div className="menu-item-icon">
                                <i className="fas fa-boxes"></i>
                            </div>
                            <span>Staking</span>
                            <div className="new-feature-icon">new</div>
                        </div>

                        <div className={"menu-item " + (location.pathname == "/analytics" ? "active" : "")} onClick={() => {
                            this.props.push("/analytics")
                            this.props.requestSwitchSidebarOpen();
                        }}>
                            <div className="menu-item-icon">
                                <i className="fas fa-chart-bar"></i>
                            </div>
                            <span>Analytics</span>
                        </div>


                        <div className={"menu-item " + (location.pathname == "/chain-bridge" ? "active" : "")} onClick={() => {
                            this.props.push("/chain-bridge")
                            this.props.requestSwitchSidebarOpen();
                        }}>
                            <div className="menu-item-icon">
                                <i className="fas fa-random"></i>
                            </div>
                            <span>Chain Bridge</span>
                        </div>
                        <div className={"menu-item " + (location.pathname == "/paypeet" ? "active" : "")} onClick={() => {
                            this.props.push("/paypeet")
                            this.props.requestSwitchSidebarOpen();
                            // toastr.warning("Paypeet", "In a short maintenance, will be back in few minutes.")
                        }}>
                            <div className="menu-item-icon">
                                <i className="fab fa-ethereum"></i>
                            </div>
                            <span>PayPeet</span>
                        </div>

                                            

                        <div className="menu-item" onClick={() => window.open("https://etherscan.io/token/0x51bb9c623226ce781f4a54fc8f4a530a47142b6b")}>
                            <div className="menu-item-icon">
                                <i className="fas fa-search"></i>
                            </div>
                            <span>Explorer</span>
                        </div>
                        <div className={"menu-item " + (location.pathname == "/tokens" ? "active" : "")} onClick={() => {
                            this.props.push("/tokens")

                            this.props.requestSwitchSidebarOpen();
                        }}>
                            <div className="menu-item-icon">
                                <i className="fas fa-coins"></i>
                            </div>
                            <span>Contracts</span>
                        </div>
                        <div className={"menu-item " + (location.pathname == "/exchanges" ? "active" : "")} onClick={() => {
                            this.props.push("/exchanges")
                            this.props.requestSwitchSidebarOpen();
                        }}>
                            <div className="menu-item-icon">
                                <i className="fas fa-exchange-alt"></i>
                            </div>
                            <span>Exchanges</span>
                        </div>

                    </div>

                    <div className="menu">
                        <div className="menu-item" onClick={() => window.open("https://peetdecentralized.finance/litepaper.pdf")}>
                            <div className="menu-item-icon">
                                <i className="fas fa-file-import"></i>
                            </div>
                            <span>Lite Paper</span>
                        </div>
                        <div className="menu-item" onClick={() => window.open("https://peetdecentralized.finance/roadmap.png")}>
                            <div className="menu-item-icon">
                                <i className="fas fa-map-signs"></i>
                            </div>
                            <span>Road Map</span>
                        </div>
                        <div className="menu-item" onClick={() => window.open("https://peetdefi.gitbook.io/docs")}>
                            <div className="menu-item-icon">
                                <i className="fas fa-book"></i>
                            </div>
                            <span>Documentation</span>
                        </div>
                    </div>
                    <div id="copyright">© 2020 Peet DeFi. All rights reserved</div>
                    <div id="copyright">Designed by Peet Core Team.</div>
                </div>
            </Router>
        </div>;
    }
}

export default connect((state: any, ownProps: any) => {
    return {
        location: state.router.location,
        app: state.app,
        eth: state.eth
    }
}, (dispatch) => {
    return {
        push: (route) => {
            dispatch(ConnectedReactRouter.push(route));
        },
        requestSwitchSidebarOpen: () => {
            dispatch(requestSwitchSidebarOpen() as any)
        }
    }
})(Sidemenu);