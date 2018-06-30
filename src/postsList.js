import * as React from 'react';
import { Component } from 'react';
import { View, Image, FlatList, ListView, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from './actions';
import { emptyData } from './actions';

class PostsList extends Component {
    constructor() {
        super();
        this.position = 0;
    }

    componentWillMount() {
        this.props.emptyData();
        this.props.fetchData(this.props.tabId, 0, this.props.dateFilter, this.position);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.dateFilter !== this.props.dateFilter || newProps.tabId !== this.props.tabId) {
            this.position = 0;
            this.props.emptyData();
            this.props.fetchData(newProps.tabId, 0, newProps.dateFilter, this.position);
        }
    }

    handleLoadMore = () => {
        this.position += 10;
        if (this.props.posts.data.total === this.props.posts.data.posts.length) {
            console.log("ALL LOADED")
            return
        }
        console.log("POSITION", this.position)
        this.props.fetchData(this.props.tabId, 0, this.props.dateFilter, this.position);
        
    };

    renderRow({ item }) {
        return (
            <View>
                <Text>{item._id}</Text>
                <Image style={{ width: 200, height: 400 }} source={{ uri: item.image }} />
                <Text>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</Text>
            </View>
        );
    }

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.posts.data.posts}
                    renderItem={this.renderRow}
                    onEndReached={this.handleLoadMore}
                    keyExtractor={item => item._id}
                    onEndReachedThreshold={0.5}
                />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.dataReducer,
        tabId: state.tabId,
        dateFilter: state.dateFilter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: (type, filter, dateFilter, position) => dispatch(fetchData(type, filter, dateFilter, position)),
        emptyData: () => dispatch(emptyData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)

