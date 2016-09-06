import React from 'react';
import {render} from 'react-dom';

class App extends React.Component {
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
                <input type="text" style={{display: 'block'}}/>
                <input type="text" style={{display: 'block'}}/>
            </div>
        );
    }
}

class LabeledInputText extends React.Component {
    constructor(props) {

    }

    render() {
        return (
            <div>
                <span>this.props.labelText</span><input type="text" />
            </div>
        );
    }
}

render(<App />, document.getElementById('content'));
