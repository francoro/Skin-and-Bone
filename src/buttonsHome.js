import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export class ButtonsHome extends Component {
    openFilterTypeModal() {
        console.log("entrooo")
    }

    render() {
        return (
            <View>
                <TouchableHighlight onPress={this.openFilterTypeModal}>
                    <Icon name="md-options" size={18} />
                </TouchableHighlight>
            </View>
        );
    }
}