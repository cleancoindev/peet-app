import * as React from 'react'
import { connect } from "react-redux";
import * as ConnectedReactRouter from 'connected-react-router'

class Tokens extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <div>
            <h1>Tokens</h1>
            
            <div className="content-section">
            <div className="sub-section">
                    <h2>Ethereum</h2>
                    <i className="fab fa-ethereum sub-section-big-icon"></i>
                    <h2>Available Supply : 90.000</h2>
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="btn-icon-rounded" onClick={() => {}}>
                            <a target="_blank" href="https://etherscan.io/token/0x51bb9c623226ce781f4a54fc8f4a530a47142b6b"><i className="fas fa-sign-in-alt"></i> Go to PTE Contract</a>
                        </div>
                    </div>

                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="btn-icon-rounded" onClick={() => {}}>
                            <a target="_blank" href="https://etherscan.io/address/0x509c136121E1C60D3EAc26ea20FEEaE1f51959BA"><i className="fas fa-sign-in-alt"></i> Go to Staking Contract</a>
                        </div>
                    </div>
                </div>

                <div className="sub-section">
                    <h2>Neo</h2>
                    <div style={{textAlign: "center", margin: "10px"}}>
                        <img src={require("../../../assets/neo.png")} style={{borderRadius: "15px", width: "170px"}} />
                    </div>
                    <h2>Available Supply : 10.000</h2>
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="btn-icon-rounded" onClick={() => {}}>
                            <a target="_blank" href="https://neotube.io/nep5/b259ee05485cd9f729ac5a2d5cd462221e40be96/page/1"><i className="fas fa-sign-in-alt"></i> Go to PTE Contract</a>
                        </div>
                    </div>

                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="btn-icon-rounded" onClick={() => {}}>
                            <a target="_blank" href="#"><i className="fas fa-sign-in-alt"></i> Go to Staking Contract</a>
                        </div>
                    </div>
                </div>

                
                <div className="sub-section">
                    <h2>Nuls</h2>
                    <div style={{textAlign: "center", margin: "10px"}}>
                        <img src={require("../../../assets/nuls.svg")} style={{borderRadius: "15px", width: "300px"}} />
                    </div>
                    <h2>Available Supply : 10.000</h2>
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="btn-icon-rounded" onClick={() => {}}>
                            <a target="_blank" href="https://nulscan.io/token/info?contractAddress=NULSd6HgwUyGLm7iJetfPxZGJrDxcc51p2Qat"><i className="fas fa-sign-in-alt"></i> Go to PTE Contract</a>
                        </div>
                    </div>

                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="btn-icon-rounded" onClick={() => {}}>
                            <a target="_blank" href="https://pocm.nuls.io/pocm/Projects/ProjectsInfo?releaseId=55"><i className="fas fa-sign-in-alt"></i> Go to Staking Contract</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default connect((state: any, ownProps: any) => {
    return {}
}, (dispatch) => {
    return {
        push: (route) => {
            dispatch(ConnectedReactRouter.push(route));
        }
    }
})(Tokens)