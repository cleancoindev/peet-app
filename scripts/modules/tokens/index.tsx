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
                    <h2>Total Supply : 100.000</h2>
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="btn-icon-rounded" onClick={() => {}}>
                            <i className="fas fa-sign-in-alt"></i> Go to Ethereum Contract
                        </div>
                    </div>
                </div>

                <div className="sub-section">
                    <h2>Neo</h2>
                    <div style={{textAlign: "center", margin: "10px"}}>
                        <img src={require("../../../assets/neo.png")} style={{borderRadius: "15px", width: "170px"}} />
                    </div>
                    <h2>Total Supply : 10.000</h2>
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="btn-icon-rounded" onClick={() => {}}>
                            <i className="fas fa-sign-in-alt"></i> Go to Neo Contract
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