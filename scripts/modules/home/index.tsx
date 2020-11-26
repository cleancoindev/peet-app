import * as React from 'react'
import { connect } from "react-redux";
import * as ConnectedReactRouter from 'connected-react-router'
import PeetOracleProvider from '../../providers/peetOracle';

class Home extends React.Component {

    public state: any
    public interval: any
    constructor(props: any) {
        super(props);

        this.state = {
            supply: 0,
            price: 0,
            addresses: 0,
            swaps: 0
        }
        this.getFrontInfos = this.getFrontInfos.bind(this)
    }

    async getFrontInfos() {
        const response = await PeetOracleProvider.fetchTokenInfos()
        if (response.result) {
            this.setState({
                supply: response.supply,
                price: response.price,
                addresses: response.addresses,
                swaps: response.swaps
            })
        }
    }

    componentDidMount() {
        this.getFrontInfos()
        this.interval = setInterval(this.getFrontInfos, 30000)
    }

    render() {
        return <div>
            <h1>The Cross-Chain Secure Asset</h1>
            
            <div className="content-section">
                <div className="sub-section">
                    <h2 style={{fontSize: "18px"}}>Market Cap</h2>
                    <i className="fas fa-chart-pie sub-section-big-icon" style={{fontSize: "60px", margin: "5px"}}></i>
                    <h2>{this.state.supply / 1000000}M</h2>
                </div>
                <div className="sub-section">
                    <h2 style={{fontSize: "18px"}}>Peet Price</h2>
                    <i className="fas fa-coins sub-section-big-icon" style={{fontSize: "60px", margin: "5px"}}></i>
                    <h2>{this.state.price} $</h2>
                </div>
                <div className="sub-section">
                    <h2 style={{fontSize: "18px"}}>ETH User Wallets</h2>
                    <i className="fas fa-wallet sub-section-big-icon" style={{fontSize: "60px", margin: "5px"}}></i>
                    <h2>{this.state.addresses}</h2>
                </div>
                <div className="sub-section">
                    <h2 style={{fontSize: "18px"}}>Cross Chain Swap</h2>
                    <i className="fas fa-random sub-section-big-icon" style={{fontSize: "60px", margin: "5px"}}></i>
                    <h2>{this.state.swaps}</h2>
                </div>
            </div>

            <div className="content-section">
                <div className="sub-section">
                    <h2>Expanding the Use of BlockChain Technology</h2>
                    <i className="fas fa-cube sub-section-big-icon"></i>
                    Peet platform's objectives allow you to convert any asset of value into our native asset PTE or use your asset as collateral for PTE. You can then lend or stake to earn the highest rates possible across any supported blockchain.
                    <br /><br />
                    The Peet platform integrates blockchain technology with traditional off chain assets through the use of decentralized protocols. This 'Chainlink' allows for the value of USD, stocks, home equity, or any share of ownership to be represented on chain and used as collateral to earn a high rate of return.
                    <div style={{ textAlign: "center", marginTop: "15px" }}>
                        <div className="btn-icon-rounded" onClick={() => this.props.push("/chain-bridge")}>
                            <i className="fas fa-sign-in-alt"></i> Go to the Chain Bridge
                        </div>
                    </div>
                </div>
                <div className="sub-section">
                    <h2>Interoperability & Capital Efficiency</h2>
                    <i className="fas fa-chart-bar sub-section-big-icon"></i>
                    Decentralized Finance has contributed to the development of many innovative services that could not exist in the traditional financial industry and has opened up a world of opportunity to investors.
                    <br /><br />
                    The problem with the current system is most of these DeFi applications exist soley on the Ethereum network. PTE, the native token of Peet exists on multiple blockchains and has the ability to interact with multiple types of financial applications at once.
                    <br /><br />
                    Because of this Peet can offer its users more options, lower fees, and higher returns than typical single blockchain applications who make up the vast majority of projects in the space. You will earn more and keep more with Peet
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
})(Home)