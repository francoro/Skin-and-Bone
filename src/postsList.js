import * as React from 'react';
import { Component } from 'react';
import { View, Image, FlatList } from 'react-native';
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


        if (this.props.tab === this.props.tabId) {
            this.props.emptyData();
            ///search/${type}/${filter}/${dateFilter}/${position}
            this.props.fetchData(this.props.tabId, 0, this.props.dateFilter, 0);
        }
    }

    componentWillReceiveProps(newProps) {

        if (newProps.dateFilter !== this.props.dateFilter || newProps.tabId !== this.props.tabId && this.props.tab === newProps.tabId) {
            this.setState({ position: 0 });
            
            this.props.emptyData();

            this.props.fetchData(newProps.tabId, 0, newProps.dateFilter, 0);
        }
    }

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
                console.log(this.state.position,this.state.position)
                this.props.fetchData(this.props.tabId, 0, this.props.dateFilter, this.state.position);
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
                            style={{ width: 200, height: 200 }}
                            source={{ uri: item.image }}
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

