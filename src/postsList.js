import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from './actions';

class PostsList extends Component {

    componentWillMount() {
        //pasar this.props.tabId
        this.props.fetchData(2);
    }

    getTvShows() {

        let posts = this.props.dataTvMaze.data;
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

                <Text>{this.props.tabId}</Text>

                {this.getTvShows()}


            </View>

        )
    }
}

const mapStateToProps = state => {
    return {
        dataTvMaze: state.dataReducer,
        tabId: state.tabId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: (val) => dispatch(fetchData(val))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)