//@flow

import React from 'react';
import {
	TouchableHighlight,
	Text,
	Alert,
	StyleSheet,
	Animated
} from 'react-native';

const ButtonText: string = 'Button';

type Props = {
	buttonTitle: ?string,
	onFetch: ?any
};

type State = {
	pressed: boolean
};

export default class TouchableButton extends React.Component {
	props: Props;
	state: State;

	constructor(props: Props) {
		super(props);
		this.state = {
			pressed: false
		}
	}

	render() {
		let buttonTitle = this.props.buttonTitle ? this.props.buttonTitle : 'Button';
		return (
			<TouchableHighlight onPress={
				() => {
				}
			} style={[styles.button, this.state.pressed ? { backgroundColor: 'green' } : {}]}
				onHideUnderlay={() => { this.setState({ pressed: false }) } }
				onShowUnderlay={() => { this.setState({ pressed: true }) } }>
				<Text>{buttonTitle}</Text>
			</TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		padding: 10,
		borderColor: 'blue',
		borderWidth: 1,
		borderRadius: 5
	},
});
