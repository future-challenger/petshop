import React from 'react';
import {
    View,
    Alert,
    Text
} from 'react-native';

import Button from '../view/touchableButton';

export default class HomeController extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };

        this.fetchAction = this.fetchAction.bind(this);
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
        this.setState({message: 'Empty'});

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

                // Alert.alert(
                //     `你点击了按钮`,
                //     'Hello World！' + responseJson.message,
                //     [
                //         // {text: '以后再说', onPress: () => console.log('Ask me later pressed')},
                //         // {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                //         {text: '确定', onPress: () => console.log('OK Pressed')},
                //     ]
                // );
                this.setState({message: `${responseJson[0].id} - ${responseJson[0].title}`});
            })
            .catch(e => {console.log(`error ${e}`)});
    }

    render() {
        return (
            <View style={{flex: 1, marginTop: 100, alignItems: 'center'}}>
                <Button style={{marginTop: 50}} buttonTitle='Click to fetch'
                    onFetch={this.fetchAction} />
                <Text style={{marginTop: 10}}>{this.state.message ? this.state.message : "Empty"}</Text>
            </View>
        );
    }
}
