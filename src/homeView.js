import * as React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import  PostsList  from './postsList';
export default class HomeView extends Component {
  render() {
    return (
        <View>
            <PostsList/>
        </View>
    );
  }
}
