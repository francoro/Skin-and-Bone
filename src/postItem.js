import * as React from 'react';
import { Component } from 'react';
import { View, Image, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default class PostItem extends Component {
    render() {
        return (
            <View>
                <Text>{this.props.item._id}</Text>
                <Image style={{ width: 200, height: 400 }} source={{ uri: this.props.item.image }} />
                <Text>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</Text>
            </View>
        );
    }
}
