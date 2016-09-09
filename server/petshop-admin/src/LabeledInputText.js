import React from 'react';

export default class LabeledInputText extends React.Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(e) {
        if (this.props.labelText.toLowerCase() == 'username') {
            this.props.onUserNameChanged(e.target.value);
        } else {
            this.props.onPasswordChanged(e.target.value);
        }
    }

    render() {
        return (
            <div className={this.props.labelText.toLowerCase() == 'username'
                            ? 'form-control'
                            : 'form-control form-under'}>
                <span>{`${this.props.labelText} :`}</span>
                <input type="text" placeholder={this.props.labelText} onChange={this.handleTextChange} />
            </div>
        );
    }
}
