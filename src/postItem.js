import * as React from 'react';
import { Component } from 'react';
import { View, Image, FlatList, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as API from './api';
import ActionSheet from 'react-native-actionsheet';
import { Actions } from '../node_modules/react-native-router-flux';
import Moment from 'react-moment';
import 'moment/locale/es';
import Share from 'react-native-share';
import ModalLogin from './modalLogin';
import { AsyncStorage } from 'react-native';

const { width } = Dimensions.get('window');

const frameWidth = width;
const columnWidth = frameWidth / 3.1;

export default class PostItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLiked: false,
            user: null,
            refresh: null,
            comments: this.props.item.comments,
            modalVisible: false,
            isFavorite: false
        };
        this.userLogged = null;
        this.favorites = [];

    }

    componentWillReceiveProps(newProps) {
        if (newProps.message) {
            let newState = Object.assign({}, this.state);
            newState.comments.push(newProps.message)
            this.setState(newState);
        }
    }

    componentDidMount() {

        /* AsyncStorage.getItem('user', (err, result) => {
            console.log(1,result);
          }); */

        storage.load({
            key: "user",
        }).then(data => {

            this.userLogged = data;

            /* if (this.props.item.likes.length) {
                if (this.userLogged) {
                    for (let i = 0; i < this.props.item.likes.length; i++) {
                        if (this.props.item.likes[i]._id === this.userLogged._id) {
                            
                            this.setState({ isLiked: true });
                        }
                    }
                }
            } */

        }).catch(err => {
            console.log(222)
        })

        storage.load({
            key: "likes",
        }).then(data => {

            if (this.props.item.likes && this.props.item.likes.length) {
                for (let i = 0; i < this.props.item.likes.length; i++) {
                    for (let z = 0; z < data.length; z++) {
                        if (this.props.item.likes[i]._id === data[z].userId) {
                            this.setState({ isLiked: true });
                        }
                    }
                }
            }



        }).catch(err => {

        })

        storage.load({
            key: "favorites",
        }).then(data => {
            this.favorites = data;
            if (this.favorites && this.favorites.length) {
                for (let i = 0; i < this.favorites.length; i++) {
                    if (this.favorites[i]._id === this.props.item._id) {
                        this.setState({ isFavorite: true })
                    }
                }
                if (this.props.isTabFavorites)
                    this.setState({ isFavorite: true })

            } else {
                this.setState({ isFavorite: false })
            }
        }).catch(err => {
            //console.log("NO HAY FAVS")
            return
        })





    }

    unLikePost() {
        storage.load({
            key: "user",
        }).then(user => {
            //this.props.item.likesCount -= 1;
            this.setState({ isLiked: false });
            let userId = this.userLogged._id;
            API.unLikePost(userId, this.props.item._id).then(res => {
                storage.load({
                    key: "likes",
                }).then(data => {
                    for (let i = 0; i < data.length; i++) {
                        if (data[i]._id === userId) {
                            data.splice(data.indexOf(data[i]), 1)
                        }
                    }
                    storage.save({
                        key: "likes",
                        data: data,
                        expires: null
                    });

                    this.props.updatePostByLike(2, this.props.item, userId, null)


                }).catch(err => {
                    console.log("no hay me gusta")
                })
            }).catch((err) => console.log("Unlike error catch", err))
        }).catch(err => {
            this.setState({ modalVisible: true })
            return;
        })
    }

    likePost() {
        storage.load({
            key: "user",
        }).then(user => {
            //this.props.item.likesCount += 1;
            let userId = this.userLogged._id;
            let userName = this.userLogged.name;

            this.setState({ isLiked: true });

            var like = { postId: this.props.item._id, name: userName, userId: userId };
            API.likePost(like).then(res => {

                storage.load({
                    key: "likes",
                }).then(data => {
                    data.push(like);
                    storage.save({
                        key: "likes",
                        data: data,
                        expires: null
                    });
                }).catch(err => {
                    let allLikes = []
                    allLikes.push(like);
                    storage.save({
                        key: "likes",
                        data: allLikes,
                        expires: null
                    });
                })
                this.props.updatePostByLike(1, this.props.item, userId, userName)



            }).catch((err) => console.log("like error catch", err))
        }).catch(err => {
            this.setState({ modalVisible: true })
            return;
        })
    }

    removeFavorite() {
        if (this.favorites && this.favorites.length) {
            for (let i = 0; i < this.favorites.length; i++) {
                if (this.favorites[i]._id == this.props.item._id) {
                    this.favorites.splice(this.favorites.indexOf(this.favorites[i]), 1)
                    storage.save({
                        key: "favorites",
                        data: this.favorites,
                        expires: null
                    });
                    this.setState({ isFavorite: false });
                    this.props.removedFav()
                }
            }
        }
    }

    addFavorite() {
        this.favorites.push(this.props.item);
        console.log(1, this.favorites);
        storage.save({
            key: "favorites",
            data: this.favorites,
            expires: null
        });
        this.setState({ isFavorite: true });
    }

    goDetail() {
        if (Actions.currentScene === '_tabhome' || Actions.currentScene === '_tabprofile') {
            Actions.detail({ item: this.props.item });
        }
    }

    addLikeComment(commentItem, index) {
        //Objeto en base de datos es -1 por eso va a 0 en vez de 1
        storage.load({
            key: "user",
        }).then(user => {
            let newState = Object.assign({}, this.state);
            newState.comments[index].isLiked = true;
            newState.comments[index].likesCount += 1;
            console.log(newState.comments[index].likesCount)
            this.setState(newState);

            let likeComment = { userId: this.userLogged._id, postId: this.props.item._id, commentId: commentItem._id };
            API.addLikeComment(likeComment).then((data) => {
                //console.log("LIKE COMMENT", data)
            })
        }).catch(err => {
            this.setState({ modalVisible: true })
            return;
        })
    }

    removeLikeComment(commentItem, index) {
        storage.load({
            key: "user",
        }).then(user => {
            let newState = Object.assign({}, this.state);
            newState.comments[index].isLiked = false;
            newState.comments[index].likesCount -= 1;

            for (let i = 0; i < newState.comments[index].likes.length; i++) {
                if (newState.comments[index].likes[i]._id == this.userLogged._id) {
                    newState.comments[index].likes.splice(newState.comments[index].likes.indexOf(newState.comments[index].likes[i]), 1)
                }
            }

            this.setState(newState);

            API.removeLikeComment(this.userLogged._id, this.props.item._id, commentItem._id).then((data) => { })
        }).catch(err => {
            this.setState({ modalVisible: true })
            return;
        })
    }

    addNameToAnswer(userName, userId) {
        this.props.setCommentAnswer(userName, userId)
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    modalClose() {
        this.setState({ modalVisible: false })
    }


    render() {
        let tagType;
        switch (this.props.item.type) {
            case 1:
                tagType = "Encontrados";
                break;
            case 2:
                tagType = "Perdidos";
                break;
            case 3:
                tagType = "Adopción";
                break;
        }
        let likesCount;

        if (this.props.item.likesCount > 0) {
            if (this.props.item.likesCount === 1) {
                likesCount = <Text> {this.props.item.likesCount} me gusta </Text>
            } else {
                likesCount = <Text> {this.props.item.likesCount} me gustas </Text>
            }
        } else {
            likesCount = <Text>Sin me gusta</Text>
        }

        let commentCount;
        if (this.props.item.comments && this.props.item.comments.length) {
            if (this.props.item.comments.length === 1) {
                commentCount = <Text> {this.props.item.comments.length} comentario </Text>
            } else {
                commentCount = <Text> {this.props.item.comments.length} comentarios </Text>
            }
        } else {
            commentCount = <Text> Sin comentarios </Text>
        }

        if (this.props.item.comments && this.props.item.comments.length) {
            if (this.props.item.comments[0].body.length > 90) {
                this.props.item.comments[0].body = this.props.item.comments[0].body.substring(0, 90);
                this.props.item.comments[0].body = this.props.item.comments[0].body + "...";
            }
        }



        if (this.props.item.comments && this.props.item.comments.length > 0) {
            for (let i = 0; i < this.props.item.comments.length; i++) {
                if (this.props.item.comments[i].likes && this.props.item.comments[i].likes.length > 0) {
                    for (let j = 0; j < this.props.item.comments[i].likes.length; j++) {
                        if (this.userLogged && this.props.item.comments[i].likes[j]._id == this.userLogged._id) {
                            this.props.item.comments[i].isLiked = true;
                        }
                    }
                }
            }
        }

        const shareOptions = {
            message: this.props.item.body,
            url: this.props.item.picture
        };

        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Image style={styles.userImg} source={{ uri: "data:image/png;base64," + this.props.item.user.picture }} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{this.props.item.user.name}</Text>
                            <Moment locale="es" element={Text} style={styles.date} fromNow>{this.props.item.created}</Moment>
                        </View>
                        <View style={styles.arrowContainer}>
                            {Actions.currentScene != '_tabprofile' || this.props.isTabFavorites ?
                                this.state.isFavorite ?
                                    <TouchableOpacity onPress={() => this.removeFavorite()}>
                                        <Icon name="md-star" color="#F5DA49" size={23} />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity onPress={() => this.addFavorite()}>
                                        <Icon name="md-star-outline" color="#999" size={23} />
                                    </TouchableOpacity>

                                :
                                Actions.currentScene === '_tabprofile' && this.props.isTabMyPosts &&
                                <TouchableOpacity onPress={() => this.props.removePost(this.props.item._id, this.props.item.user._id)}>
                                    <Icon name="md-trash" color="#999" size={23} />
                                </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <Text style={styles.body}>{this.props.item.body}</Text>
                    <View style={styles.contentView}>
                        <Text style={{ borderColor: "#999", borderWidth: 2, borderRadius: 6, padding: 6 }}>
                            <Text style={styles.tagName}>
                                {tagType}
                            </Text>
                        </Text>
                    </View>
                    <TouchableOpacity onPress={this.goDetail.bind(this)}>
                        <Image style={{ width: width, height: 400 }} resizeMode="cover" source={{ uri: this.props.item.picture }} />
                    </TouchableOpacity>
                    <View style={styles.likesContainer}>
                        {likesCount}
                        <Text style={styles.dot}> • </Text>
                        {commentCount}
                    </View>
                    <View style={[styles.actionsButtons, this.state.comments.length < 1 && Actions.currentScene === 'detail' ? styles.noComments : null]}>
                        {this.state.isLiked === false ?
                            <TouchableOpacity style={styles.actionButton} onPress={() => this.likePost()}>
                                <Icon style={styles.iconAction} name="ios-heart-outline" size={23} />
                                <Text style={styles.textIcon}>Me gusta</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.actionButton} onPress={() => this.unLikePost()}>
                                <Icon style={[styles.iconAction, styles.iconHeartFull]} name="ios-heart" size={23} />
                                <Text style={styles.textIcon}>Me gusta</Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={this.goDetail.bind(this)} style={[styles.actionButton, styles.answerText]}>
                            <Icon style={styles.iconAction} name="ios-chatbubbles-outline" size={23} />
                            <Text style={styles.textIcon}>Responder</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.actionButton, styles.shareText]} onPress={this.showActionSheet}>
                            <Icon style={styles.iconAction} color="#3282b6" name="md-share-alt" size={23} />
                            <Text style={styles.textIconShare}>Compartir</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.commentsContainer}>
                        {this.state.comments.length && Actions.currentScene === '_tabhome' ?
                            <View style={styles.firstCommentContainer}>
                                <Image style={styles.userImgComment} source={{ uri: "data:image/png;base64," + this.props.item.comments[0].user.picture }} />
                                <View style={styles.infoContainer}>
                                    <Text style={styles.name}>{this.props.item.comments[0].user.name}</Text>
                                    <View style={styles.bodyContainer}>
                                        <Text style={styles.bodyComment}>{this.props.item.comments[0].body}</Text>
                                    </View>
                                </View>
                            </View>
                            : null}

                        {this.state.comments.length && Actions.currentScene === 'detail' ?
                            this.state.comments.map((item, index) => (
                                <View key={index} style={[styles.firstCommentContainerDetail, this.props.item.comments.length - 1 === index ? styles.lastComment : styles.commentContainer]}>
                                    <Image style={styles.userImgComment} source={{ uri: "data:image/png;base64," + item.user.picture }} />
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.name}>{item.user.name}</Text>
                                        <View style={styles.bodyContainer}>
                                            <Text style={styles.bodyComment}>{item.body}</Text>
                                        </View>
                                        <View style={styles.bottomBody}>
                                            <Moment locale="es" element={Text} style={styles.date} fromNow>{item.created}</Moment>
                                            <Text style={styles.separator}>&#9679;</Text>
                                            {!item.isLiked ?
                                                <TouchableOpacity onPress={() => this.addLikeComment(item, index)}>
                                                    <Text>me gusta</Text>
                                                </TouchableOpacity>
                                                :
                                                <TouchableOpacity onPress={() => this.removeLikeComment(item, index)}>
                                                    <Text>ya no me gusta</Text>
                                                </TouchableOpacity>
                                            }

                                            {item.isLiked ?
                                                <View style={styles.likeCounter}>
                                                    <Text style={styles.separator}>&#9679;</Text>
                                                    <Icon name="md-heart" color="#999" size={20} />
                                                    <Text style={{ marginLeft: 5 }}>{item.likesCount}</Text>
                                                </View>
                                                : null
                                            }

                                            {!item.isLiked && item.likesCount > 0 ?
                                                <View style={styles.likeCounter}>
                                                    <Text style={styles.separator}>&#9679;</Text>
                                                    <Icon name="md-heart-outline" color="#999" size={20} />
                                                    <Text style={{ marginLeft: 5 }}>{item.likesCount}</Text>
                                                </View>
                                                : null
                                            }

                                            <Text style={styles.separator}>&#9679;</Text>
                                            <TouchableOpacity onPress={() => this.addNameToAnswer(item.user.name, item.user._id)}>
                                                <Text>responder</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                </View>

                            ))
                            : null}
                    </View>
                </View>
                <View>
                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        title={'Compartir'}
                        options={[
                            <Text style={{ color: '#000' }}>Whatsapp</Text>,
                            <Text style={{ color: '#000' }}>Cancelar</Text>
                        ]}
                        cancelButtonIndex={1}
                        onPress={(index) => {
                            if (index === 0) {
                                setTimeout(() => {
                                    Share.shareSingle(Object.assign({}, shareOptions, {
                                        "social": "whatsapp"
                                    })).catch(err => console.log(err));
                                }, 300)
                            }
                        }}
                    />
                </View>
                <ModalLogin modalVisible={this.state.modalVisible} setModalClose={this.modalClose.bind(this)} />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    noComments: {
        marginBottom: 50
    },
    paddingBottom: {
        paddingBottom: 0
    },
    bottomBody: {
        flexDirection: "row",
        marginTop: 10
    },
    likeCounter: {
        flexDirection: "row"
    },
    separator: {
        paddingHorizontal: 5
    },
    container: {
        backgroundColor: "white",
        marginBottom: 20
    },
    topContainer: {
        flex: 1,
        flexDirection: "row"
    },
    infoContainer: {
        marginTop: 20
    },
    arrowContainer: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: "center",
        position: "relative",
        right: 12
    },
    dot: {
        fontSize: 20,
        position: "relative",
        top: -3
    },
    userImg: {
        borderRadius: 50,
        width: 55,
        height: 55,
        marginLeft: 10,
        marginTop: 10
    },
    name: {
        marginLeft: 10,
        fontWeight: "600",
        color: "black"
    },
    bodyContainer: {
        width: 350
    },
    date: {
        color: "#999",
        marginLeft: 10
    },
    bodyComment: {
        color: "#999",
        marginLeft: 10,
    },
    body: {
        paddingVertical: 20,
        paddingHorizontal: 12
    },
    tagName: {
        color: "#999",
        fontWeight: "600"
    },
    contentView: {
        paddingLeft: 10,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 15
    },
    likesContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: 10,
        paddingVertical: 15
    },
    actionsButtons: {
        flexDirection: 'row',
        width: frameWidth,
        borderWidth: 1,
        borderColor: "#999",
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    actionButton: {
        flexDirection: 'row',
        width: columnWidth,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10
    },
    textIcon: {
        position: "relative",
        bottom: -3,
        left: 9
    },
    firstCommentContainer: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#F8F8F8",
        paddingBottom: 15
    },
    firstCommentContainerDetail: {
        flex: 1,
        flexDirection: "row",
        backgroundColor: "#F8F8F8",
        paddingBottom: 10
    },
    userImgComment: {
        borderRadius: 50,
        width: 50,
        height: 50,
        marginLeft: 10,
        marginTop: 15,
        flexDirection: "column"
    },
    iconHeartFull: {
        color: "#E94D3B"
    },
    textIconShare: {
        position: "relative",
        bottom: -2,
        left: 10,
        color: "#3282b6"
    },
    commentsContainer: {
    },
    commentContainer: {
        borderBottomColor: '#999',
        borderBottomWidth: 1,
        borderTopColor: '#999',
    },
    actionsComments: {
    },
    lastComment: {
        borderBottomWidth: 0,
        paddingBottom: 50
    },
    commentItem: {
        flexDirection: "row"
    },
    answerText: {
        paddingLeft: 20
    },
    shareText: {
        paddingLeft: 33
    }
})

