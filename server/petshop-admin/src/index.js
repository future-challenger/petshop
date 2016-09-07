import React from 'react';
import {render} from 'react-dom';

import LabeledInputText from './LabeledInputText';
import SubmitButton from './SubmitButton';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(username, password) {

    }

    render() {
        var divStyle = {
            color: 'blue',
            wdith: '150px',
            paddingTop: '10px',
            display: 'inline-block'
        };
        return (
            <div style={divStyle}>
                <p> Yo, React </p>
                <LabeledInputText labelText="Username: " />
                <LabeledInputText labelText="Password: " />

                <SubmitButton title="Submit" onLogin={this.handleLogin} />
            </div>
        );
    }
}



render(<App />, document.getElementById('content'));
