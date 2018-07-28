import * as React from 'react';
import { Component } from 'react';
import { View, Image, FlatList, Text, TouchableOpacity, TouchableHighlight, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from './actions';
import { emptyData } from './actions';
import { selected_filter } from './actions';
import Icon from 'react-native-vector-icons/Ionicons';
import PostItem from './postItem.js';

class PostsList extends Component {
    constructor() {
        super();
        this.position = 0;
    }

    componentWillMount() {
        this.props.emptyData();
        this.props.fetchData(this.props.tabId, this.props.filter, this.props.dateFilter, this.position);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.dateFilter !== this.props.dateFilter || newProps.tabId !== this.props.tabId || newProps.filter !== this.props.filter) {
            this.position = 0;
            this.props.emptyData();
            this.props.fetchData(newProps.tabId, newProps.filter, newProps.dateFilter, this.position);
        }
    }

    handleLoadMore = () => {
        this.position += 10;
        if (this.props.posts.data.total === this.props.posts.data.posts.length) {
            console.log("ALL LOADED")
            return
        }
        console.log("POSITION", this.position)
        this.props.fetchData(this.props.tabId, this.props.filter, this.props.dateFilter, this.position);

    };

    renderRow({ item }) {
        return (
            <View>
                <Text>{item._id}</Text>
                <Image style={{ width: 200, height: 400 }} source={{ uri: item.image }} />
                <Text>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</Text>
            </View>
        );
    };

    changeFilter() {
        //can i make this.props = to that ?
        let filter = this.props.filter === 1 ? 0 : 1;
        this.props.selected_filter(filter);
    }

    renderSectionHeader() {
        return (
            this.props.posts.data.total ?
                <View style={styles.container}>
                    <Text style={{ fontSize: 12 }}>#{this.props.posts.data.total} RESULTADOS</Text>
                    <View>
                        <TouchableOpacity onPress={this.changeFilter.bind(this)}>
                            <View style={styles.containerFilterText}>
                                <Icon name="ios-arrow-round-up" size={19} />
                                <Icon name="ios-arrow-round-down" size={19} />
                                {this.props.filter === 1 ? <Text style={{ fontSize: 12 }}>MAS ME GUSTA</Text> : <Text style={{ fontSize: 12, marginLeft: 5 }}>MAS RECIENTES</Text>}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                : null
        );
    };

    render() {
        console.log("/////////////////ENTRORENDER//////////////")
        return (
            <View>
                <FlatList
                    data={this.props.posts.data.posts}
                    renderItem={({ item, separators }) => (
                        <PostItem item={item} />
                    )}
                    onEndReached={this.handleLoadMore}
                    keyExtractor={item => item._id}
                    onEndReachedThreshold={0.5}
                    ListHeaderComponent={this.renderSectionHeader.bind(this)}
                />
                <View style={styles.floatingButtonContainer}>
                    <TouchableHighlight style={styles.floatingButton}>
                        <Icon name="md-create" color="#000" style={{position: "relative", top: 15, left: 15}} size={28}/>
                    </TouchableHighlight>
                </View>
            </View>
        );
    };
}

const mapStateToProps = state => {
    return {
        posts: state.dataReducer,
        tabId: state.tabId,
        dateFilter: state.dateFilter,
        filter: state.filter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: (type, filter, dateFilter, position) => dispatch(fetchData(type, filter, dateFilter, position)),
        emptyData: () => dispatch(emptyData()),
        selected_filter: (filterId) => dispatch(selected_filter(filterId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        marginVertical: 10
    },
    containerFilterText: {
        flex: 1,
        flexDirection: 'row'
    },
    floatingButtonContainer: {
        flexDirection: 'column',
        flex: 1
    },
    floatingButton: {
        alignSelf: 'flex-end',
        position: 'absolute',
        bottom: 20,
        right: 20,
        borderRadius: 50,
        width: 55,
        height: 55,
        backgroundColor: "#EFCF50",
        elevation: 5
    }
})

