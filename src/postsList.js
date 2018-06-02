import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from './actions';

export default class PostsList extends Component {
    constructor(props) {
        super(props);
    }

    getTvShows() {
        let post = this.props.post;
        return (
            <View>
                <Text key={post._id}>{post.name}</Text>
                <Image
                    style={{ width: 200, height: 200 }}
                    source={{ uri: post.image }}
                />
            </View>
        )
        /* let posts = this.props.posts.data;
        if (posts.posts != undefined) {
            return dataTVShow = posts.posts.map((post) => {
                return <Text key={post._id}>{post.name}</Text>
            })
        } */
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