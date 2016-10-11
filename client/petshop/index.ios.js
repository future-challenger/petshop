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
    Text,
    View
} from 'react-native';

import HomeController from './src/controller/homeController';

class petshop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'default'
        }

        // Bind
        this._renderContent = this._renderContent.bind(this);
    }

    _renderContent(category: string, title: ?string) {
        return (
            <NatvigatorIOS style={styles.wrapper}
                initialRoute={{
                    component: HomeController,
                    title: title,
                    passProps: {filter: category}
                }}>

            </NatvigatorIOS>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <HomeController />
            </View>
        );
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

var styles = StyleSheet.create({
    tabContent: {
        flex: 1,
        alignItems: "center",
    },
    tabText: {
        color: "white",
        margin: 50,
    },
    wrapper: {
        flex: 1
    }
});

AppRegistry.registerComponent('petshop', () => petshop);
