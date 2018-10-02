import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as API from '../../api';
import PostItem from '../../postItem';

export default class Detail extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View>
                <PostItem item={this.props.item}/>
            </View>
        )
    } 

}