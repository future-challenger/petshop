//@flow

import React, { Component } from 'react';
import {
	View,
	Text,
	Alert,
	ListView,
	StyleSheet,
	TouchableHighlight
} from 'react-native';

// import BaseListController from './baseListController';
import FlexDemo from './FlexDemo';

type State = {
	dataSource: ListView.DataSource
};

export default class PetListController extends Component {
	state: State;

	constructor(props) {
		super(props);

		const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

		this.state = {
			dataSource: ds.cloneWithRows(['Dog 1', 'Dog 2', 'Dog 3'])
		};
	}

	_renderRow(data: string, sectionID: number, rowID: number,
		highlightRow: (sectionID: number, rowID: number) => void) {
		return (
			<TouchableHighlight
			 	key={`${sectionID}-${rowID}`}
				onPress={() => {
					this._onPressRow(data, rowID);
					highlightRow(sectionID, rowID);
				} }>
				<View style={styles.row}>
					<Text style={styles.text}>{data}</Text>
				</View>
			</TouchableHighlight>
		);
	}

	_renderSeparator(sectionID: number, rowID: number) {
		return (
			<View
				key={`${sectionID}-${rowID}`}
				style={{
					height: 1,
					backgroundColor: '#3B5998',
				}}
				/>
		);
	}

	_onPressRow(rowData: string, rowID: number) {
		// Alert.alert(
		// 	'Row [ ' + rowID + ' ]',
		// 	`Row data:- ${rowData}`,
		// 	[
		// 		{ text: 'OK', onPress: () => console.log('OK Pressed') },
		// 	]
		// );
		this.props.navigator.push({
			title: 'Flex Demo',
			component: FlexDemo,
			passProps: {}
		});
	}

	render() {
		return (
			<View style={{flex:1, marginTop: 64 }}>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderRow.bind(this)}
					renderSeperator={this._renderSeparator.bind(this)}
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
	thumb: {
		width: 64,
		height: 64,
	},
	text: {
		flex: 1,
	},
});
