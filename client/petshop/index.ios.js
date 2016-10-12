/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TabBarIOS,
  Navigator,
  Text,
  View
} from 'react-native';

import HomeController from './src/controller/homeController';

type State = {
	selectedTab: string 
};

class Petshop extends Component {
	state: State;
	initialRoute: Route;
	_renderScene: (r: Route, nav: Navigator) => ?ReactElement<*>;

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'default'
    }

		this.initialRoute = {
			title: 'Users',
			component: HomeController,
			index: 0,
			passProps: {

			}
		}

    // Bind
    // this._renderContent = this._renderContent.bind(this);
    this._renderScene = this._renderScene.bind(this);
  }

  _renderScene(route: Route, navigator: Navigator) {
    if(route.component) {
			return React.createElement(route.component
				, {...this.props, ...route.passProps, navigator, route});
		}
  }

  render() {
    return (
      <View style={styles.container}>
        <Navigator
          initialRoute={this.initialRoute}
          renderSecene={this._renderScene}
          />
      </View>
    );
  }

  _renderContent(category: string, title: ?string) {
    // return (
      // <NatvigatorIOS style={styles.wrapper}
      //   initialRoute={{
      //     component: HomeController,
      //     title: title,
      //     passProps: { filter: category }
      //   }}>

      // </NatvigatorIOS>
    // );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Petshop', () => Petshop);
