import * as React from 'react';
import { Component } from 'react';
import { View, Image, FlatList, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as API from './api';
import ActionSheet from 'react-native-actionsheet';
import { Actions } from '../node_modules/react-native-router-flux';
import Moment from 'react-moment';
import 'moment/locale/es';

const { width } = Dimensions.get('window');

const frameWidth = width;
const columnWidth = frameWidth / 3.1;

export default class PostItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLiked: false,
            user: null,
            refresh: null
        };
        this.isFavorite = false;
        this.userLogged = null;
        this.favorites = [];

        BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBack)
    }

    componentWillReceiveProps(newProps) {
        //console.log("item props", newProps.message)
        //add to array of comments push
    }

    componentWillMount() {

       

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

        })

        storage.load({
            key: "likes",
        }).then(data => {
            //console.log("LIKES HAY", data)
            if (this.props.item.likes.length) {
                for (let i = 0; i < this.props.item.likes.length; i++) {
                    for (let z = 0; z < data.length; z++) {
                        if (this.props.item.likes[i]._id === data[z].userId) {
                            console.log("entro")
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
        }).catch(err => {
            return
        })

    }

    unLikePost() {
        //si this.userLogged = null o undefined mandar cartel de logiarse

        this.setState({ isLiked: false });
        this.props.item.likesCount -= 1;
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


            }).catch(err => {
                console.log("no hay me gusta")
            })
            this.props.updateLocalExpire(2, this.props.item, userId, null)
        })
            .catch((err) => console.log("Unlike error catch", err))
    }

    likePost() {
        //si this.userLogged = null o undefined mandar cartel de logiarse

        this.setState({ isLiked: true });
        this.props.item.likesCount += 1;

        let userId = this.userLogged._id;
        let userName = this.userLogged.name;

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
                //esta vacio el array
                storage.save({
                    key: "likes",
                    data: allLikes,
                    expires: null
                });
            })

            this.props.updateLocalExpire(1, this.props.item, userId, userName)



        })
            .catch((err) => console.log("like error catch", err))
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
                    this.isFavorite = false;
                    this.setState({ refresh: 1 });
                }
            }
        }
    }

    addFavorite() {
        this.favorites.push({ _id: this.props.item._id });
        storage.save({
            key: "favorites",
            data: this.favorites,
            expires: null
        });
        this.isFavorite = true;
        this.setState({ refresh: 1 });
    }

    deleteCache() {
        console.log(0)
        storage.save({
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
        }); 

        Actions.tabhome();
    }

    handleAndroidBack() {
        if(Actions.currentScene === 'detail') {
            storage.save({
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
            }); 
    
            Actions.tabhome();
            return true;
        }
    }

    goDetail() {
        if(Actions.currentScene === 'home') {
            Actions.detail({ item: this.props.item, onBack: () => this.deleteCache() })
        }
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

        if (this.props.item.comments.length) {
            if (this.props.item.comments[0].body.length > 90) {
                this.props.item.comments[0].body = this.props.item.comments[0].body.substring(0, 90);
                this.props.item.comments[0].body = this.props.item.comments[0].body + "...";
            }
        }

        if (this.favorites && this.favorites.length) {
            for (let i = 0; i < this.favorites.length; i++) {
                if (this.favorites[i]._id === this.props.item._id) {
                    this.isFavorite = true;
                }
            }

        } else {
            this.isFavorite = false;
        }


        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Image style={styles.userImg} source={{ uri: this.props.item.user.picture }} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{this.props.item.user.name}</Text>
                            <Moment locale="es" element={Text} style={styles.date} fromNow>{this.props.item.created}</Moment>
                        </View>
                        <View style={styles.arrowContainer}>
                            {this.isFavorite ?
                                <TouchableOpacity onPress={() => this.removeFavorite()}>
                                    <Icon name="md-star" color="#F5DA49" size={23} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => this.addFavorite()}>
                                    <Icon name="md-star-outline" color="#999" size={23} />
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
                        <Image style={{ width: width, height: 400 }} source={{ uri: this.props.item.image }} />
                    </TouchableOpacity>
                    <View style={styles.likesContainer}>
                        {likesCount}
                        <Text style={styles.dot}> • </Text>
                        {commentCount}
                    </View>
                    <View style={styles.actionsButtons}>
                        {this.state.isLiked === false ?
                            <TouchableOpacity style={styles.actionButton} onPress={() => this.likePost()}>
                                <Icon style={styles.iconAction} name="ios-heart-outline" size={23} />
                                <Text style={styles.textIcon}>Me gusta</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.actionButton} onPress={() => this.unLikePost()}>
                                <Icon style={styles.iconAction, styles.iconHeartFull} name="ios-heart" size={23} />
                            <Text style={styles.textIcon}>Me gusta</Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity onPress={this.goDetail.bind(this)} style={styles.actionButton}>
                            <Icon style={styles.iconAction} name="ios-chatbubbles-outline" size={23} />
                            <Text style={styles.textIcon}>Responder</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.actionButton}>
                            <Icon style={styles.iconAction} color="#3282b6" name="md-share-alt" size={23} />
                            <Text style={styles.textIconShare}>Compartir</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.commentsContainer}>
                        {this.props.item.comments.length && Actions.currentScene === 'home' ?
                            <View style={styles.firstCommentContainer}>
                                <Image style={styles.userImgComment} source={{ uri: this.props.item.comments[0].user.picture }} />
                                <View style={styles.infoContainer}>
                                    <Text style={styles.name}>{this.props.item.comments[0].user.name}</Text>
                                    <Text style={styles.date}>{this.props.item.comments[0].body}</Text>
                                </View>
                            </View>
                            : null}

                        {this.props.item.comments.length && Actions.currentScene === 'detail' ?
                            this.props.item.comments.map((item, index) => (
                                <View key={item._id} style={[styles.firstCommentContainer, this.props.item.comments.length - 1 === index ? styles.lastComment : styles.commentContainer]}>
                                    <Image style={styles.userImgComment} source={{ uri: item.user.picture }} />
                                    <View style={styles.infoContainer}>
                                        <Text style={styles.name}>{item.user.name}</Text>
                                        <Text style={styles.date}>{item.body}</Text>
                                        <Moment locale="es" element={Text} style={styles.date} fromNow>{item.created}</Moment>
                                    </View>
                                </View>
                            ))
                            : null}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
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
    bodyComment: {
        color: "#999",
        marginLeft: 10
    },
    date: {
        color: "#999",
        marginLeft: 10
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
        paddingBottom: 48
    },
    commentContainer: {
        borderBottomColor: '#999',
        borderBottomWidth: 1,
        borderTopColor: '#999',
    },
    actionsComments: {
    },
    lastComment: {
        borderBottomWidth: 0
    },
    commentItem: {
        flexDirection: "row"
    }
})
