import React from 'react';
import {render} from 'react-dom';

import LabeledInputText from './LabeledInputText';
import SubmitButton from './SubmitButton';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {un: '', pwd: ''};
        this.handleLogin = this.handleLogin.bind(this);
        this.handleUserNameChanged = this.handleUserNameChanged.bind(this);
        this.handlePasswordChanged = this.handlePasswordChanged.bind(this);
    }

    handleUserNameChanged(un) {
        this.setState({un: un});
    }

    handlePasswordChanged(pwd) {
        this.setState({pwd: pwd});
    }

    handleLogin() {
        // $.ajax({
        //     url: this.props.url,
        //     dataType: 'json',
        //     method: 'POST',
        //     data: this.state,
        //     cache: false,
        //     success: function(data) {
        //         this.setState({data: data});
        //     }.bind(this),
        //     error: function(xhr, status, err) {
        //         console.error(this.props.url, status, err.toString());
        //     }.bind(this)
        // });

        alert(`${this.state.un}, ${this.state.pwd}`);
    }

    render() {
        var divStyle = {
            color: 'blue',
            wdith: '150px',
            paddingTop: '10px',
            display: 'inline-block'
        };
        return (
            // <div style={divStyle}>
            <div className="">
                {/*<p> Yo, React </p>*/} 
                <LabeledInputText labelText="Username" onUserNameChanged={this.handleUserNameChanged} />
                <LabeledInputText labelText="Password" onPasswordChanged={this.handlePasswordChanged} />

                <SubmitButton title="Click" onLogin={this.handleLogin} />
            </div>
        );
    }
}



render(<App />, document.getElementById('content'));
