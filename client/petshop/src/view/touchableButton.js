//@flow

import React from 'react';
import {
<<<<<<< HEAD
  TouchableHighlight,
  Text,
  Alert,
  StyleSheet,
  Animated
=======
	TouchableHighlight,
	Text,
	Alert,
	StyleSheet,
	Animated
>>>>>>> origin/dev
} from 'react-native';

type Props = {
  buttonTitle: string
};

type State = {
  pressed: boolean
};

const ButtonText: string = 'Button';

type Props = {
	buttonTitle: ?string,
	onFetch: ?any
};

type State = {
	pressed: boolean
};

export default class TouchableButton extends React.Component {
<<<<<<< HEAD
  props: Props;
  state: State;

  constructor(props) {
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
          // Alert.alert(
          //     `你点击了按钮`,
          //     'Hello World！',
          //     [
          //         {text: '以后再说', onPress: () => console.log('Ask me later pressed')},
          //         {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          //         {text: '确定', onPress: () => console.log('OK Pressed')},
          //     ]
          // )
          this.props.onFetch();
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
=======
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
>>>>>>> origin/dev
});
