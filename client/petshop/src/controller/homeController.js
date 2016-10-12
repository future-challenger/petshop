//@flow

import React from 'react';
import {
	View,
	Alert,
	Text,
	ListView
} from 'react-native';

import Button from '../view/touchableButton';
import BaseListController, {TableStyle} from './baseListController';
import PetListController from './petListController';

/*
type State = {
	message: string,
	dataSource: ListView.DataSource<string>
};
*/

export default class HomeController extends BaseListController {
	props: Props;

	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			message: '',
			dataSource: ds
		};

		this.fetchAction = this.fetchAction.bind(this);
		this.sampleData = this.sampleData.bind(this);
	}

	componentWillMount() {
		this.setState({dataSource: this.state.dataSource.cloneWithRows([
			'Micheal', 'Jack', 'Paul'
		])});
	}

	fetchAction() {
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

	_renderRow(data: any, sectionID: number, rowID: number, 
		highlightRow: (sectionID: number, rowID: number) => void) {
		return (
			<TouchableHighlight onPress={() => {
					this._onPressRow(rowID);
					highlightRow(sectionID, rowID);
				}}>
				<View style={TableStyle.row}>
					<Text style={TableStyle.text}>data</Text>
				</View>
			</TouchableHighlight>
		);
	}

	_onPressRow(rowID: number) {
		this.props.navigator.push({
			title: 'Users',
			component: PetListController,
			passProps: {}
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

