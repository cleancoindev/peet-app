import * as React from 'react'
import { connect } from "react-redux";
import * as ConnectedReactRouter from 'connected-react-router'

class Exchanges extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <div>
            <h1>Exchanges</h1>
            
            <div className="content-section">
            <div className="sub-section">
                    <h2>Uniswap</h2>
                    <div style={{textAlign: "center", margin: "10px"}}>
                        <img src={require("../../../assets/uniswap.jpg")} style={{borderRadius: "15px", width: "200px"}} />
                    </div>
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="btn-icon-rounded" onClick={() => {}}>
                            <a target="_blank" href="https://info.uniswap.org/token/0x51bb9c623226ce781f4a54fc8f4a530a47142b6b"><i className="fas fa-sign-in-alt"></i> Go to Uniswap</a>
                        </div>
                    </div>
                </div>

                <div className="sub-section">
                    <h2>Coinpark</h2>
                    <div style={{textAlign: "center", margin: "10px"}}>
                        <img src={require("../../../assets/coinpark.jpg")} style={{borderRadius: "15px", width: "112px"}} />
                    </div>
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="btn-icon-rounded" onClick={() => {}}>
                            <a target="_blank" href="https://www.coinpark.com/fullExchange?coinPair=PTE_USDT"><i className="fas fa-sign-in-alt"></i> Go to CoinPark</a>
                        </div>
                    </div>
                </div>

                <div className="sub-section">
                    <h2>ForkDelta</h2>
                    <div style={{textAlign: "center", margin: "10px"}}>
                        <img src={require("../../../assets/forkdelta.png")} style={{borderRadius: "15px", width: "230px"}} />
                    </div>
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="btn-icon-rounded" onClick={() => {}}>
                            <a target="_blank" href="https://forkdelta.app/#!/trade/0x51bb9c623226ce781f4a54fc8f4a530a47142b6b-ETH"><i className="fas fa-sign-in-alt"></i> Go to ForkDelta</a>
                        </div>
                    </div>
                </div>

                <div className="sub-section">
                    <h2>FatBTC</h2>
                    <div style={{textAlign: "center", margin: "10px"}}>
                        <img src={require("../../../assets/fatbtc.png")} style={{borderRadius: "15px", width: "230px"}} />
                    </div>
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="btn-icon-rounded" onClick={() => {}}>
                            <a target="_blank" href="https://www.fatbtc.com/trading?currency=PTE%2FBTC"><i className="fas fa-sign-in-alt"></i> Go to FatBTC</a>
                        </div>
                    </div>
                </div>

                <div className="sub-section">
                    <h2>Altilly</h2>
                    <div style={{textAlign: "center", margin: "10px"}}>
                        <img src={require("../../../assets/altilly.jpg")} style={{borderRadius: "15px", width: "270px"}} />
                    </div>
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="btn-icon-rounded" onClick={() => {}}>
                            <a target="_blank" href="https://altilly.com/asset/PTE"><i className="fas fa-sign-in-alt"></i> Go to Altilly</a>
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
})(Exchanges)