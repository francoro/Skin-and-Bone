import * as React from 'react';
import { Component } from 'react';
import { View, Image, FlatList, Text, TouchableOpacity, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from './actions';
import { emptyData } from './actions';
import { selected_filter } from './actions';
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
            modalVisible: false
        }
        ///this.updateLocalExpire.bind(this);\
    }

    componentWillMount() {
       
        this.props.emptyData();
        //let tabIdText = String(this.props.tabId);
        /* storage.save({
          key: "0",
          data: false,
          expires: null
      });
      storage.save({
          key: "1",
          data: false,
          expires: null
      });   

      storage.save({
          key: "2",
          data: false,
          expires: null
      });   

      storage.save({
          key: "3",
          data: false,
          expires: null
      });   */


        //API.getLocalExpire(tabIdText).then((dataLocalStorage) => {
        //  console.log("!dataLocalStorage", dataLocalStorage)
        // if (!dataLocalStorage) {
        this.props.fetchData(this.props.tabId, this.props.filter, this.props.dateFilter, this.position).then((postData) => {
            //API.saveLocalExpire(tabIdText, postData.posts, postData.total, 10);
            //console.log("HIZO LLAMADA API")
        })
        //} else {
        /* storage.load({
            key: tabIdText,
        }).then(data => {
            this.props.posts.data.posts = data.value;
            this.props.posts.data.total = data.total;
            
            this.setState({ reloadState: 1 })
        }).catch(err => {
            console.log("error11")
            return;
        }) */
        //  }
        //})
    }

    componentWillReceiveProps(newProps) {
        if (newProps.dateFilter !== this.props.dateFilter || newProps.tabId !== this.props.tabId || newProps.filter !== this.props.filter) {
            this.position = 0;
            this.props.emptyData();
            console.log("ENTRO WILL UPDATE")
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
        //let tabIdText = String(this.props.tabId);

        this.props.fetchData(this.props.tabId, this.props.filter, this.props.dateFilter, this.position).then((postData) => {
            /* if (postData === undefined) {
                API.saveLocalExpire(tabIdText, this.props.posts.data.posts, this.props.posts.data.total, 10);
            } else {
                API.saveLocalExpire(tabIdText, postData.posts, postData.total, 10);
            } */

        })

    };

    changeFilter() {
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

    updateLocalExpire = (state, post, userId, userName) => {
        /* let tabIdPersonal = String(post.type);
         if (state === 2) {
             for (let i = 0; i < this.props.posts.data.posts.length; i++) {
                 if (this.props.posts.data.posts[i]._id == post._id) {
                     for(let j = 0; j < this.props.posts.data.posts[i].likes.length; j ++) {
                         if(this.props.posts.data.posts[i].likes[j]._id == userId) {
                             this.props.posts.data.posts[i].likes.splice(this.props.posts.data.posts[i].likes.indexOf(this.props.posts.data.posts[i].likes[j]), 1)
                             
                         }
                     }
                 }
             }
         }
         
         if (state === 1) {
             for (let i = 0; i < this.props.posts.data.posts.length; i++) {
                 if (this.props.posts.data.posts[i]._id == post._id) {
                     this.props.posts.data.posts[i].likes.push({ _id: userId, name: userName })
                 }
             }
         }
         let tabIdText = "0";
         API.saveLocalExpire(tabIdText, this.props.posts.data.posts, this.props.posts.data.total, 10);
 
         storage.load({
             key: tabIdPersonal,
         }).then(data => {
 
             if (state === 1) {
                 for (let i = 0; i < data.value.length; i++) {
                     if (data.value.posts[i]._id == post._id) {
                         data.value.posts[i].likes.push({ _id: userId, name: userName })
                     }
                 }
             }
 
             if(state === 2) {
                 for (let i = 0; i < data.value.length; i++) {
                     if (data.value.posts[i]._id == post._id) {
                         for(let j = 0; j < data.value.posts[i].likes.length; j ++) {
                             if(data.value.posts[i].likes[j]._id == userId) {
                                 data.value.posts[i].likes.splice(data.value.posts[i].likes.indexOf(data.value.posts[i].likes[j]), 1)
                                 //console.log("ENTRO A TABIDPERSONAL ELIMINAR")
                             }
                         }     
                     }
                 }
             }
 
 
 
             API.saveLocalExpire(tabIdPersonal, data.value.posts, data.value.total, 10);
 
         }).catch(err => {
             console.log("TABID PERSONAL ESTA VACIO")
         })*/


    }

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
                    data={this.props.posts.data.posts}
                    renderItem={({ item, separators }) => (
                        <PostItem item={item} updateLocalExpire={this.updateLocalExpire} />
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
                {this.props.posts.isFetching && this.position == 0 ? this.skeleton() : null}
                {this.posts()}
                {this.props.posts.data.total === 0 ? this.noPost() : null}
            </View>
        )
    }
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

