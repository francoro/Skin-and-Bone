import * as React from 'react';
import { Component } from 'react';
import { View, Image, FlatList, Text, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from './actions';
import { emptyData } from './actions';
import { selected_filter, reload_new_post } from './actions';
import Icon from 'react-native-vector-icons/Ionicons';
import PostItem from './postItem';
import SkeletonLoading from './skeletonLoading';
import * as API from './api';
import { Actions } from 'react-native-router-flux';
import ModalLogin from './modalLogin';

const window = Dimensions.get('window');

class PostsList extends Component {
    constructor() {
        super();
        this.position = 0;
        this.state = {
            reloadState: null,
            modalVisible: false,
            dataPosts: [],
            total: null,
            isFetching: null
        }
        ///this.updateLocalExpire.bind(this);\
    }

    componentWillMount() {
        this.setState({ isFetching: true })
        API.getPosts(this.props.tabId, this.props.filter, this.props.dateFilter, this.position)
            .then(res => {
                this.setState({ isFetching: false })

                this.setState({ dataPosts: res[1].posts, total: res[1].total })
            })
            .catch((err) => {
                console.log("Fetch posts catch", err);
                this.setState({ isFetching: false })

            })
    }

    componentWillReceiveProps(newProps) {
        console.log("entro will receive props")
        if (newProps.dateFilter !== this.props.dateFilter || newProps.tabId !== this.props.tabId || newProps.filter !== this.props.filter || newProps.reloadNewPost === true) {
            this.position = 0;
            this.setState({ isFetching: true })

            API.getPosts(newProps.tabId, newProps.filter, newProps.dateFilter, this.position)
                .then(res => {
                    this.setState({ isFetching: false })

                    this.setState({ dataPosts: res[1].posts, total: res[1].total })
                })
                .catch((err) => {
                    console.log("Fetch posts catch", err);
                    this.setState({ isFetching: false })

                })
            this.props.reload_new_post(false);
        }
    }

    handleLoadMore = () => {
        this.position += 10;
        if (this.state.total === this.state.dataPosts.length) {
            console.log("ALL LOADED")
            return
        }
        console.log("POSITION", this.position)

        API.getPosts(this.props.tabId, this.props.filter, this.props.dateFilter, this.position)
            .then(res => {
                console.log("this.state.dataPosts", this.state.dataPosts)

                this.setState({ dataPosts: [...this.state.dataPosts, ...res[1].posts], total: res[1].total })
                console.log("this.state.dataPosts", this.state.dataPosts)
            })
            .catch((err) => console.log("Fetch posts catch", err))
    };

    changeFilter() {
        let filter = this.props.filter === 1 ? 0 : 1;
        this.props.selected_filter(filter);
    }

    renderSectionHeader() {
        return (
            this.state.total ?
                <View style={styles.container}>
                    <Text style={{ fontSize: 12 }}>#{this.state.total} RESULTADOS</Text>
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

    goNewPost() {
        storage.load({
            key: "user",
        }).then(user => {
            console.log("entro hay user")
            Actions.newPost()
        }).catch(err => {
            console.log("entro no hay user")
            this.setState({ modalVisible: true })
            return;
        })
    }
    modalClose() {
        console.log("entro modal close")
        this.setState({ modalVisible: false })
    }

    posts() {
        return (
            <View>
                <FlatList
                    data={this.state.dataPosts}
                    renderItem={({ item, separators }) => (
                        <PostItem isTabFavorites={false} item={item} />
                    )}
                    onEndReached={this.handleLoadMore}
                    keyExtractor={item => item._id}
                    onEndReachedThreshold={0.5}
                    ListHeaderComponent={this.renderSectionHeader.bind(this)}
                />
                <View style={styles.floatingButtonContainer}>
                    <TouchableHighlight onPress={this.goNewPost.bind(this)} style={styles.floatingButton}>
                        <Icon name="md-create" color="#000" style={{ position: "relative", top: 15, left: 15 }} size={28} />
                    </TouchableHighlight>
                </View>
                <ModalLogin modalVisible={this.state.modalVisible} setModalClose={this.modalClose.bind(this)} />
            </View>
        )
    }


    skeleton() {
        return (
            <SkeletonLoading />
        )
    }

    noPost() {
        return (
            <View style={styles.noPosts}>
                <Icon name="md-alert" size={80} />
                <Text style={styles.textNoPosts}> No hay publicaciones </Text>
            </View>
        )
    }

    render() {
        return (
            <View>
                {this.state.isFetching && this.position == 0 ? this.skeleton() : null}
                {this.posts()}
                {this.state.total === 0 ? this.noPost() : null}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        tabId: state.tabId,
        dateFilter: state.dateFilter,
        filter: state.filter,
        reloadNewPost: state.reloadNewPost
    }
}

const mapDispatchToProps = dispatch => {
    return {
        selected_filter: (filterId) => dispatch(selected_filter(filterId)),
        reload_new_post: (reloadPost) => dispatch(reload_new_post(reloadPost))
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
    },
    noPosts: {
        height: window.height / 2,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textNoPosts: {
        marginTop: 20,
        fontSize: 25
    }
})

