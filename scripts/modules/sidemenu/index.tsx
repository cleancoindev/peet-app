import * as React from 'react'
import { connect } from "react-redux";
import {
    BrowserRouter as Router,
    Link,
    withRouter
  } from "react-router-dom";
  import * as ConnectedReactRouter from 'connected-react-router'
import ReducersCombinedState from '../../reducers/types/reducers';
import {AppState} from '../../reducers/types/app';
import { requestSwitchSidebarOpen } from '../../actions/app';

interface SidemenuProps {
    location: any,
    app: AppState,
    requestSwitchSidebarOpen: Function
}

class Sidemenu extends React.Component<ReducersCombinedState & SidemenuProps, {}> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <div id="sidemenu" className={this.props.app.sidebarOpen ? "sidemenu-open" : ""}>
            <Router>
                <div className="sidebar-container">
                    <div className="menu">
                        <div className={"menu-item " + (location.pathname == "/" ? "active" : "")} onClick={() => {
                            this.props.push("/")
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
                        }}>
                            <div className="menu-item-icon">
                                <i className="fab fa-ethereum"></i>
                            </div>
                            <span>PayPeet</span>
                            <div className="new-feature-icon">new</div>
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
                            <span>Tokens</span>
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
                </div>
            </Router>
        </div>;
    }
}

export default connect((state: any, ownProps: any) => {
    return {
        location: state.router.location,
        app: state.app
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