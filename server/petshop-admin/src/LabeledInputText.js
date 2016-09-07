import React from 'react';

export default class LabeledInputText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <span>{this.props.labelText}</span><input type="text" />
            </div>
        );
    }
}
