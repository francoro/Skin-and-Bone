import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from './actions';

export default class PostsList extends Component {
    constructor(props) {
        super(props);
    }

    getTvShows() {

        let posts = this.props.posts.data;
        if (posts.posts != undefined) {
            return dataTVShow = posts.posts.map((post) => {
                return <Text key={post._id}>{post.name}</Text>
            })
        }
    }

    render() {
        // see bookmark chrome canary update component on tabid change or video traversimedia fav youtube
        return (
            <View>
                {this.getTvShows()}
            </View>

        )
    }
}