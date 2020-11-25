import * as React from 'react'
import { connect } from "react-redux";
import { AppState } from './interfaces/props';
import { Navbar, Sidemenu, ChainBridge, PayPeet, Home, Exchanges, Tokens } from "./modules";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    withRouter
} from "react-router-dom";
import ReactTooltip from 'react-tooltip';
import { TransitionGroup, CSSTransition } from "react-transition-group";


class App extends React.Component {
    constructor(props: AppState) {
        super(props);
    }

    render() {
        return <div>
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
    return {}
})(App);