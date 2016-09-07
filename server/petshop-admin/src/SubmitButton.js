import React from 'react';

export default class SubmitButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        // bind event handler
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(e) {
        this.setState({value: e.target.value});
        // alert('hello react');
        this.props.onLogin()
    }

    render() {
        return (
            <input onClick={this.handleLogin} type="button" value={this.props.title} />
        );
    }
}
