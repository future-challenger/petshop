import React from 'react';

export default class LabeledInputText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {focused: false};
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);

        //
        this.unStyle = {
            padding:'5px'
        };
        this.pwdStyle = {
            padding:'5px',
            marginTop:'10px'
        };
        this.getStyles = this.getStyles.bind(this);
        this.getInputStyles = this.getInputStyles.bind(this);
    }

    handleTextChange(e) {
        if (this.props.labelText.toLowerCase() == 'username') {
            this.props.onUserNameChanged(e.target.value);
        } else {
            this.props.onPasswordChanged(e.target.value);
        }
    }

    handleFocus() {
        this.setState({focused: true});
    }

    handleBlur() {
        this.setState({focused: false});
    }

    getStyles() {
        let styleObj;
        if (this.props.labelText.toLowerCase() == 'username') {
            if (this.state.focused == true) {
                styleObj = Object.assign({}, this.unStyle, {border: '1px solid ' + this.props.bordercolor});
            } else  {
                styleObj = Object.assign({}, this.unStyle);
            }
        } else {
            if (this.state.focused == true) {
                styleObj = Object.assign({}, this.pwdStyle, {border: '1px solid ' + this.props.bordercolor});
            } else {
                styleObj = Object.assign({}, this.pwdStyle);
            }
        }

        return styleObj;
    }

    getInputStyles() {
        let styleObj;
        if (this.state.focused == true) {
            styleObj = {outlineStyle: 'none'};
        }
        return styleObj;
    }

    render() {
        let labelText = this.props.labelText.toLowerCase();

        return (
            <div style={this.getStyles()}>
                <span>{`${this.props.labelText} :`}</span>
                <input type="text" ref="theInput" placeholder={this.props.labelText}
                    style={this.getInputStyles()}
                    onChange={this.handleTextChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}/>
            </div>
        );
    }
}
