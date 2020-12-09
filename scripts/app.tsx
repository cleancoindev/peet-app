import * as React from 'react'
import { connect } from "react-redux";
import { AppState } from './interfaces/props';
import { Navbar, Sidemenu, ChainBridge, PayPeet, Home, Exchanges, Tokens, Staking, StakingDetails } from "./modules";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import ReduxToastr from 'react-redux-toastr'
import { requestLogin, requestLogout } from './actions/eth';
import { bindNeoline } from "./actions/neo";

interface AppProps {
    bindNeoline: Function
    requestLogout: Function
    requestLogin: Function
}

class App extends React.Component<AppState & AppProps, {}> {
    constructor(props: AppState & AppProps) {
        super(props);
    }

    componentDidMount() {
        // Bind ethereum
        if(window.ethereum != null) {
            window.ethereum.on('accountsChanged', (accounts) => {
                this.props.requestLogout();
            })
    
            window.ethereum.on('networkChanged', (networkId) => {
                this.props.requestLogin();
            })
        }

        // Bind Neo
        this.props.bindNeoline();
    }

    render() {
        return <div>
            <ReduxToastr
                timeOut={4000}
                newestOnTop={false}
                preventDuplicates
                position="bottom-right"
                getState={(state) => state.toastr} // This is the default
                transitionIn="fadeIn"
                transitionOut="fadeOut"
                progressBar
                closeOnToastrClick/>
            <ReactTooltip />
            <Navbar />
            <Sidemenu />
            <div id="content">
                <div className="content-container">
                    <TransitionGroup>
                        <CSSTransition
                            key={this.props.location.key}
                            classNames="fade"
                            timeout={250}>
                            <Switch>
                                <Route path="/paypeet">
                                    <PayPeet />
                                </Route>
                                <Route path="/chain-bridge">
                                    <ChainBridge />
                                </Route>
                                <Route path="/tokens">
                                    <Tokens />
                                </Route>
                                <Route path="/exchanges">
                                    <Exchanges />
                                </Route>
                                <Route exact path="/staking">
                                    <Staking />
                                </Route>
                                <Route path="/staking/:poolId">
                                    <StakingDetails />
                                </Route>
                                <Route exact path="/">
                                    <Home />
                                </Route>
                            </Switch>

                        </CSSTransition>
                    </TransitionGroup>
                </div>
            </div>
        </div>;
    }
}

export default connect((state: any, ownProps: any) => {
    return {
        location: state.router.location
    }
}, (dispatch) => {
    return {
        requestLogin: () => {
            dispatch(requestLogin() as any)
        },
        requestLogout: () => {
            dispatch(requestLogout() as any)
        },
        bindNeoline: () => {
            dispatch(bindNeoline() as any)
        }
    }
})(App);