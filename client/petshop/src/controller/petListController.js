import React, {Component} from 'react';
import {
	View,
	Text,
	ListView
} from 'react-native';

export default class PetListController extends Component {
	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(['Dog 1', 'Dog 2', 'Dog 3']);
		};
	}

	render() {
		return (
			<View>
				<ListView
					
				 />
			</View>
		);
	}
};