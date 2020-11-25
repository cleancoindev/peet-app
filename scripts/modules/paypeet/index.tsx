import * as React from 'react'
import { connect } from "react-redux";

class PayPeet extends React.Component {
    constructor(props: any) {
        super(props);
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
    return {}
})(PayPeet)