//@flow

import React from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

type StyleType = {
  flex: number,
  width?: number,
};

type State = {
  view1Style: {flex: number}
};

export default class FlexDemo extends React.Component {
  _onPress: (buttonIndex: number) => void;

  constructor(props) {
    super(props);
    this.state = {
      view1Style: {flex: 1, width: 0}, // If flex is 1, width does not work.
      view2Style: {flex: 0, width: 0},
      view3Style: {flex: 0, width: 0}
    };

    this._onPress = this._onPress.bind(this);
  }

  _onPress(buttonIndex) {
    switch(buttonIndex) {
      case 0:
        this.setState({
          view1Style: {flex: 1, width: 0}, // If flex is 1, width does not work.
          view2Style: {flex: 0, width: 0},
          view3Style: {flex: 0, width: 0}
        });
        break;
      case 1:
        this.setState({
          view1Style: {flex: 0, width: 0}, // If flex is 1, width does not work.
          view2Style: {flex: 1, width: 0},
          view3Style: {flex: 0, width: 0}
        });
        break;
      case 2:
        this.setState({
          view1Style: {flex: 0, width: 0}, // If flex is 1, width does not work.
          view2Style: {flex: 0, width: 0},
          view3Style: {flex: 1, width: 0}
        });
        break;
      default:
        this.setState({
          view1Style: {flex: 1, width: 0}, // If flex is 1, width does not work.
          view2Style: {flex: 0, width: 0},
          view3Style: {flex: 0, width: 0}
        });
        break;
    }
  }

  render() {
    return (
  <View style={{flex: 1, flexDirection: 'row', marginTop: 64}}>
    <View key="view1" style={[this.state.view1Style, {backgroundColor: 'red'}]}></View>
    <View key="view2" style={[this.state.view2Style, {backgroundColor: 'orange'}]}></View>
    <View key="view3" style={[this.state.view3Style, {backgroundColor: 'yellow'}]}></View>

    <View style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'absolute',
      height: 50,
      left:0,
      right: 0,
      bottom: 0,
      backgroundColor: 'black',
      opacity: 0.6
    }}>
      <View style={{flex: 1, justifyContent:'center'}} key='b1'>
        <TouchableOpacity
          style={styles.button}
          onPress={()=>this._onPress(0)}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}} key='b2'>
        <TouchableOpacity
          style={styles.button}
          onPress={()=>this._onPress(1)}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}} key='b3'>
        <TouchableOpacity
          style={styles.button}
          onPress={()=>this._onPress(2)}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
    );
  }
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'center',
    margin: 1,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 20,
  }
});
