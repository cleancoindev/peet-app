import * as React from 'react'
import { connect } from "react-redux";
import { fetchPTEWETHPrice } from "../../actions/eth";

class PayPeet extends React.Component {
    constructor(props: any) {
        super(props);
    }

    componentDidMount() {
        this.props.requestFetchPTEWETHPrice();
    }

    render() {
        return <div>
            <h1>PayPeet - Get PTE with WETH</h1>
            <div className="content-section">
                
            </div>
        </div>;
    }
}

export default connect((state: any, ownProps: any) => {
    return {}
}, (dispatch) => {
    return {
        requestFetchPTEWETHPrice: () => {
            dispatch(fetchPTEWETHPrice() as any)
        }
    }
})(PayPeet)