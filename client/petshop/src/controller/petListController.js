//@flow

import React, {Component} from 'react';
import {
	View,
	Text,
	ListView
} from 'react-native';

import BaseListController from './baseListController';

export default class PetListController extends BaseListController {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(['Dog 1', 'Dog 2', 'Dog 3'])
		};
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