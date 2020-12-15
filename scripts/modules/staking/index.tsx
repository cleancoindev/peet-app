import * as React from 'react'
import { connect } from "react-redux";
import EthereumPoolViews from "./eth/poolsEth"
import NeoPoolViews from "./neo/poolsNeo";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Env from "../../env";

enum ChainPools {
    ETH = "eth",
    NEO = "neo",
    NULS = "nuls"
}

class Staking extends React.Component {
    public state: any
    constructor(props: any) {
        super(props);
        this.state = {
            defaultChain: ChainPools.ETH
        }

        this.onChangeChain = this.onChangeChain.bind(this)
    }

    onChangeChain(chain: ChainPools) {
        this.setState({ defaultChain: chain })
    }

    render() {
        return <div>
            <h1>Staking</h1>

            <div className="content-section">

                <div className="content-section" style={{ marginBottom: "0px" }}>
                    <div className="sub-section">
                        <h2 style={{ fontSize: "22px" }}>  Stake with Peet and earn on any blockchain. Feel the simplicity to use and embrace the defi world multi-chain. <br /><br />Select your desired chain pools from the list</h2>

                    </div>
                </div>


                <div className={`sub-section col-6-md col-12-sm content-sub-staking ${(this.state.defaultChain === ChainPools.ETH ? 'active-sub-staking' : '')}`}>
                    <div onClick={() => { this.onChangeChain(ChainPools.ETH) }}>
                        <div className="content-sub">
                            <img src={require("../../../assets/ethereum-logo.png")} style={{ borderRadius: "15px", width: "30px" }} />
                        </div>
                    </div>
                </div>

              
                <div className={`sub-section col-6-md col-12-sm content-sub-staking ${(this.state.defaultChain === ChainPools.NEO ? 'active-sub-staking' : '')}`}>
                    <div onClick={() => { this.onChangeChain(ChainPools.NEO) }}>
                        <div className="content-sub">
                            <img src={require("../../../assets/neo.png")} style={{ borderRadius: "15px", width: "50px" }} />
                        </div>
                    </div>
                </div>


                <div className={`sub-section col-6-md col-12-sm content-sub-staking ${(this.state.defaultChain === ChainPools.NULS ? 'active-sub-staking' : '')}`}>
                    <div onClick={() => { this.onChangeChain(ChainPools.NULS) }}>
                        <div className="content-sub">
                            <img src={require("../../../assets/nuls.svg")} style={{ borderRadius: "15px", width: "125px" }} />
                        </div>
                    </div>
                </div>
            </div>

            <TransitionGroup>
                <CSSTransition
                        key={this.state.defaultChain}
                        classNames="scale"
                        timeout={350}>
                    <div>
                        {(
                            (this.state.defaultChain === ChainPools.ETH && <EthereumPoolViews />)
                            || (this.state.defaultChain === ChainPools.NEO && <NeoPoolViews />)
                        )}
                    </div>
                </CSSTransition>
            </TransitionGroup>
        </div>;
    }
}

export default connect((state: any, ownProps: any) => {
    return {}
}, (dispatch) => {
    return {

    }
})(Staking)