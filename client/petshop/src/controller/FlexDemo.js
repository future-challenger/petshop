//@flow

import React from 'react';
import {
  View,
  Dimensions
} from 'react-native';

export default class FlexDemo extends React.Component {
  constructor(props) {
    super(props);

    this._renderContent = this._rend_renderContent.bind(this);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'red'}}></View>
        <View style={{flex: 1, backgroundColor: 'orange'}}}></View>
        <View style={{flex: 1, backgroundColor: 'yellow'}}}></View>
        <View style={{flex: 1, backgroundColor: 'green'}}}></View>
        <View style={{flex: 1, backgroundColor: 'purple'}}}></View>
      </View>
    );
  }
};
