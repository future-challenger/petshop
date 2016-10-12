//@flow

import React, {Component} from 'react';
import {
	View,
	Text,
	ListView
} from 'react-native';

export default class BaseListController extends Component {
	constructor(props) {
		super(props);

		this.state = {
			dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
		};

		this.getDataSource = this.getDataSource.bind(this);
		this._renderRow = this._renderRow.bind(this);
		this._renderSeperator = this._renderSeperator.bind(this);
	}

	componentWillMount() {
		let source: Array<string> = this.getDataSource();
		this.setState({dataSource: this.state.dataSource.cloneWithRows()})
	}

	getDataSource() => Array<string> {
		return [
			'base data'
		];
	}

	_renderRow(data: any, sectionID: number, rowID: number, 
		highlightRow: (sectionID: number, rowID: number) => void) {
		return (
			<TouchableHighlight onPress={() => {
					if(this._onPressRow) {
						this._onPressRow(rowID);
					}
					
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

	render() {
		return (
			<ListView 
				dataSource={this.getDataSource}
				renderRow=(this.renderRow)
				renderSeperator={this._renderSeperator}
			 />
		);
	}
};

export var TableStyle = StyleSheet.create({
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