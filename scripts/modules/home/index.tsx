import * as React from 'react'
import { connect } from "react-redux";
import * as ConnectedReactRouter from 'connected-react-router'
import PeetOracleProvider from '../../providers/peetOracle';
import $ from 'jquery';

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
        this.handleResize = this.handleResize.bind(this)
    }

    

    handleResize() {
        this.waitForApplyWidgetStyle()
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
        window.addEventListener('resize', this.handleResize)
        this.getFrontInfos()
        this.interval = setInterval(this.getFrontInfos, 30000)

        
        let templateElementCmc = document.createElement("script")
        templateElementCmc.src = `https://files.coinmarketcap.com/static/widget/currency.js`
        document.body.appendChild(templateElementCmc)

        let templateElementCg = document.createElement("script")
        templateElementCg.src = `https://widgets.coingecko.com/coingecko-coin-compare-chart-widget.js`
        document.body.appendChild(templateElementCg)

        this.waitForApplyWidgetStyle();
    }

    waitForApplyWidgetStyle() {
        setTimeout(() => {
            if(document.querySelector("coingecko-coin-compare-chart-widget") == null) {
                this.waitForApplyWidgetStyle();
                return;
            }
            const host = document.querySelector("coingecko-coin-compare-chart-widget").shadowRoot;
            if(host == null || host.querySelector(".highcharts-background") == null) {
                this.waitForApplyWidgetStyle();
                return;
            }
            var sheet = new CSSStyleSheet
            sheet.replaceSync( `.cg-container { background-color: rgb(43 49 79); border: none; } 
                .highcharts-title { color: white !important; fill: white !important; }
                .highcharts-button-normal text { fill: white !important; }
                .cg-linear-button rect { fill: #d02fb6 !important; }
                .cg-primary-color-dark { color: #d02fb6 !important; }`)
            host.adoptedStyleSheets = [ sheet ];
            host.querySelector(".highcharts-background").setAttribute("fill", "none");
            host.querySelector(".highcharts-button-pressed rect").setAttribute("fill", "#d02fb6");
            host.querySelector(".highcharts-scrollbar").setAttribute("display", "none");
            host.querySelector(".cg-container .cg-widget .cg-absolute").style.display = "none";
        }, 10)
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
                    <div dangerouslySetInnerHTML={{
                        __html: '<coingecko-coin-compare-chart-widget coin-ids="peet-defi" currency="usd" locale="fr"></coingecko-coin-compare-chart-widget>'
                    }}></div>
                </div>
            </div>

            <div className="content-section">
                <div className="sub-section">
                    <div className="coinmarketcap-currency-widget" data-currencyid="7659" data-base="USD" data-secondary="" data-ticker="true" data-rank="true" data-marketcap="true" data-volume="true" data-statsticker="true" data-stats="USD"></div>
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