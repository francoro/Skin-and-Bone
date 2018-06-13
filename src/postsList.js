import * as React from 'react';
import { Component } from 'react';
import { View, Text, Image, Dimensions, FlatList, ListView, ActivityIndicator, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from './actions';
import { emptyData } from './actions';

class PostsList extends Component {
    constructor() {
        super();
        this.state = {
            position: 0
        }
    }
    
    componentWillMount() {

        let tabId = 0;

        switch (this.props.tabId) {
            case "TAB_1":
                tabId = 0;
                break;
            case "TAB_2":
                tabId = 1;
                break;
            case "TAB_3":
                tabId = 2;
                break;
            case "TAB_4":
                tabId = 3;
                break;
        }

        ///search/${type}/${filter}/${dateFilter}/${position}
        this.props.fetchData(tabId, 0, 0, 0);
    }

    /* componentWillReceiveProps(newProps) {

        if (newProps.tabId !== this.props.tabId) {

            this.setState({ position: 0 });

            this.props.emptyData();

            switch (newProps.tabId) {
                case "TAB_1":
                    tabId = 0;
                    break;
                case "TAB_2":
                    tabId = 1;
                    break;
                case "TAB_3":
                    tabId = 2;
                    break;
                case "TAB_4":
                    tabId = 3;
                    break;
            }
            this.props.fetchData(tabId, 0, 0, 0);
        }
    } */

    handleLoadMore = () => {
        this.setState(
            {
                position: this.state.position + 10
            },
            () => {

                if (this.props.posts.data.total === this.props.posts.data.posts.length) {
                    console.log(1)
                    return
                }

                let tabId = 0;

                switch (this.props.tabId) {
                    case "TAB_1":
                        tabId = 0;
                        break;
                    case "TAB_2":
                        tabId = 1;
                        break;
                    case "TAB_3":
                        tabId = 2;
                        break;
                    case "TAB_4":
                        tabId = 3;
                        break;
                }

                this.props.fetchData(tabId, 0, 0, this.state.position);
            }
        );
    };

    render() {
        return (
            <View>
                <FlatList
                    data={this.props.posts.data.posts}
                    renderItem={({ item }) => (
                        <Image
                        style={{width: 200, height: 200}}
                        source={{uri: item.image}}
                      />
                    )}
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
        tabId: state.tabId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: (type, filter, dateFilter, position) => dispatch(fetchData(type, filter, dateFilter, position)),
        emptyData: () => dispatch(emptyData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)

