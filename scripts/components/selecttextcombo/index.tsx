import * as React from 'react'
import { connect } from "react-redux";

interface SelectTextComboProps {
    items: Array<SelectTextComboItem>,
    selectedItem: string,
    readonly: boolean,
    value: string,
    onChange?: Function,
    onSelectChange?: Function
}

interface SelectTextComboItem {
    id: string,
    name: string,
    image: any
}

interface SelectTextComboState {
    selectState: boolean
}

class SelectTextCombo extends React.Component<SelectTextComboProps, SelectTextComboState> {
    constructor(props: SelectTextComboProps) {
        super(props);
        this.state = {
            selectState: false
        }
    }

    componentDidMount() {

    }

    getSelectedItem() {
        return this.props.items.find(x => x.id == this.props.selectedItem);
    }

    onChange(e) {
        if(this.props.onChange != null) this.props.onChange(e.target.value);
    }

    render() {
        return <div className="select-text-combo">
            <div className="select-container">
                <div className="current-select" onClick={() => this.setState({ selectState: !this.state.selectState })}>
                    <img src={this.getSelectedItem().image} />
                    <span>{this.getSelectedItem().name}</span>

                    {!this.props.readonly ? <i className="fas fa-caret-down" style={{ verticalAlign: "middle", marginLeft: "7px" }}></i> : null}

                </div>
                {!this.props.readonly && this.state.selectState ? <div className="select-other-container">
                    {this.props.items.filter(x => x.id != this.getSelectedItem().id).map((e, i) => {
                        return <div className="select-other-container-item" onClick={() => {
                            this.setState({
                                selectState: false
                            });
                            if(this.props.onSelectChange != null) this.props.onSelectChange(e.id);
                        }}>
                            <img src={e.image} />
                            <span>{e.name}</span>
                        </div>
                    })}
                </div> : null}

                {!this.props.readonly ? <input type="number" placeholder="0.00" onChange={this.onChange.bind(this)} value={this.props.value} /> : 
                    <input type="number" placeholder="0.00" readOnly={this.props.readonly} value={this.props.value} />}
            </div>
        </div>;
    }
}

export {
    SelectTextComboProps,
    SelectTextCombo
}