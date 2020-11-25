import * as React from 'react'
import { connect } from "react-redux";
import * as ConnectedReactRouter from 'connected-react-router'

class ChainBridge extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return <div>
            <h1>Chain Bridge</h1>
            <div className="content-section">
            </div>
        </div>;
    }
}

export default connect((state: any, ownProps: any) => {
    return {}
}, (dispatch) => {
    return {
  
    }
})(ChainBridge)