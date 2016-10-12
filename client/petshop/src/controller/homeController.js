//@flow

import React from 'react';
import {
	View,
	Alert,
	Text,
	ListView
} from 'react-native';

import Button from '../view/touchableButton';

/*
type State = {
	message: string,
	dataSource: ListView.DataSource<string>
};
*/

export default class HomeController extends React.Component {
	props: Props;

	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			message: '',
			dataSource: ds.cloneWithRows(['Micheal', 'Jack', 'Paul']),
		};

		this.fetchAction = this.fetchAction.bind(this);
		this.sampleData = this.sampleData.bind(this);
	}

	componentDidMount() {

	}

	fetchAction() {
		// Alert.alert(
		//     `你点击了按钮`,
		//     'Hello World！',
		//     [
		//         {text: '以后再说', onPress: () => console.log('Ask me later pressed')},
		//         {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
		//         {text: '确定', onPress: () => console.log('OK Pressed')},
		//     ]
		// )
		this.setState({ message: 'Empty' });

		const init = {
			method: 'GET',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer 8d9bd601f9461955b330d88c44f2930257364de98cddc2064d93cdcb300cb91d',
			},
			// body: JSON.stringify({
			//
			// })
		};

		fetch('https://api.dribbble.com/v1/shots', init)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({ message: `${responseJson[0].id} - ${responseJson[0].title}` });
			})
			.catch(e => { console.log(`error ${e}`) });
	}

	_renderRow(data: string, sectionID: number, rowID: number, 
		highlightRow: (sectionID: number, rowID: number) => void) {
		return (
			<TouchableHighlight onPress={() => {
					this._onPressRow(rowID);
					highlightRow(sectionID, rowID);
				}}>
				<View style={styles.row}>
					<Text style={styles.text}>data</Text>
				</View>
			</TouchableHighlight>
		);
	}

	_renderSeperator(sectionID: number, rowID: number, adjacentRowHighlighted: boolean) {
		return (
			<View 
				key={`${sectionID}-${rowID}`} 
				style={{backgroundColor: '#CCCCCC'}}>
			/>
		);
	}

	_onPressRow(rowID: number) => void {
		this.props.navigator.push({
			title: 'Users',
			component: 
		});
	}

	render() {
		return (
			<View>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderRow.bind(this)}
					renderSeperator={this._renderSeperator.bind(this)}
					/>
			</View>
		);
	}
};

var styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },
  text: {
    flex: 1,
  },
});