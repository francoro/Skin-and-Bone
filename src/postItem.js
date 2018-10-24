import * as React from 'react';
import { Component } from 'react';
import { View, Image, FlatList, Text, Dimensions, TouchableOpacity, StyleSheet, ScrollView, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as API from './api';
import ActionSheet from 'react-native-actionsheet';
import { Actions } from '../node_modules/react-native-router-flux';
import Moment from 'react-moment';
import 'moment/locale/es';
import Share from 'react-native-share';


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
            comments: this.props.item.comments
        };
        this.isFavorite = false;
        this.userLogged = null;
        this.favorites = [];

        BackHandler.addEventListener('hardwareBackPress', this.handleAndroidBack)
    }

    componentWillReceiveProps(newProps) {
        if (newProps.message) {
            let newState = Object.assign({}, this.state);
            newState.comments.push(newProps.message)
            this.setState(newState);
        }
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
        if (Actions.currentScene === 'detail') {
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
        if (Actions.currentScene === 'home') {
            Actions.detail({ item: this.props.item, onBack: () => this.deleteCache() })
        }
    }

    addLikeComment(commentItem, index) {
        //Objeto en base de datos es -1 por eso va a 0 en vez de 1
        let newState = Object.assign({}, this.state);
        newState.comments[index].isLiked = true;
        newState.comments[index].likesCount += 1;
        console.log(newState.comments[index].likesCount)
        this.setState(newState);

        let likeComment = { userId: this.userLogged._id, postId: this.props.item._id, commentId: commentItem._id };
        API.addLikeComment(likeComment).then((data) => {
            //console.log("LIKE COMMENT", data)
        })
    }

    removeLikeComment(commentItem, index) {
        let newState = Object.assign({}, this.state);
        newState.comments[index].isLiked = false;
        newState.comments[index].likesCount -= 1;

        for (let i = 0; i < newState.comments[index].likes.length; i++) {
            if (newState.comments[index].likes[i]._id == this.userLogged._id) {
                newState.comments[index].likes.splice(newState.comments[index].likes.indexOf(newState.comments[index].likes[i]), 1)
            }
        }

        this.setState(newState);

        API.removeLikeComment(this.userLogged._id, this.props.item._id, commentItem._id).then((data) => {
            //console.log("REMOVED LIKE COMMENT", data)
        })
    }

    addNameToAnswer(userName, userId) {
        this.props.setCommentAnswer(userName, userId)
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    test() {
        Share.shareSingle(Object.assign(shareOptions, {
            "social": "facebook"
        }));
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
                        <Image style={{ width: width, height: 400 }} resizeMode="cover" source={{ uri: this.props.item.picture }} />
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
                        <TouchableOpacity style={styles.actionButton} onPress={this.showActionSheet}>
                            <Icon style={styles.iconAction} color="#3282b6" name="md-share-alt" size={23} />
                            <Text style={styles.textIconShare}>Compartir</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.commentsContainer}>
                        {this.state.comments.length && Actions.currentScene === 'home' ?
                            <View style={styles.firstCommentContainer}>
                                <Image style={styles.userImgComment} source={{ uri: this.props.item.comments[0].user.picture }} />
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
                                <View key={item._id} style={[styles.firstCommentContainerDetail, this.props.item.comments.length - 1 === index ? styles.lastComment : styles.commentContainer]}>
                                    <Image style={styles.userImgComment} source={{ uri: item.user.picture }} />
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
                        options={['WhatsApp']}
                        onPress={(index) => {
                            setTimeout(() => {
                                Share.shareSingle(Object.assign({}, shareOptions, {
                                    "social": "whatsapp"
                                })).catch(err => console.log(err));
                            }, 300)
                        }}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
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
        paddingBottom: 48
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
        borderBottomWidth: 0
    },
    commentItem: {
        flexDirection: "row"
    }
})

//  twitter icon
const TWITTER_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABvFBMVEUAAAAA//8AnuwAnOsAneoAm+oAm+oAm+oAm+oAm+kAnuwAmf8An+0AqtUAku0AnesAm+oAm+oAnesAqv8An+oAnuoAneoAnOkAmOoAm+oAm+oAn98AnOoAm+oAm+oAmuoAm+oAmekAnOsAm+sAmeYAnusAm+oAnOoAme0AnOoAnesAp+0Av/8Am+oAm+sAmuoAn+oAm+oAnOoAgP8Am+sAm+oAmuoAm+oAmusAmucAnOwAm+oAmusAm+oAm+oAm+kAmusAougAnOsAmukAn+wAm+sAnesAmeoAnekAmewAm+oAnOkAl+cAm+oAm+oAmukAn+sAmukAn+0Am+oAmOoAmesAm+oAm+oAm+kAme4AmesAm+oAjuMAmusAmuwAm+kAm+oAmuoAsesAm+0Am+oAneoAm+wAmusAm+oAm+oAm+gAnewAm+oAle0Am+oAm+oAmeYAmeoAmukAoOcAmuoAm+oAm+wAmuoAneoAnOkAgP8Am+oAm+oAn+8An+wAmusAnuwAs+YAmegAm+oAm+oAm+oAmuwAm+oAm+kAnesAmuoAmukAm+sAnukAnusAm+oAmuoAnOsAmukAqv9m+G5fAAAAlHRSTlMAAUSj3/v625IuNwVVBg6Z//J1Axhft5ol9ZEIrP7P8eIjZJcKdOU+RoO0HQTjtblK3VUCM/dg/a8rXesm9vSkTAtnaJ/gom5GKGNdINz4U1hRRdc+gPDm+R5L0wnQnUXzVg04uoVSW6HuIZGFHd7WFDxHK7P8eIbFsQRhrhBQtJAKN0prnKLvjBowjn8igenQfkQGdD8A7wAAAXRJREFUSMdjYBgFo2AUDCXAyMTMwsrGzsEJ5nBx41HKw4smwMfPKgAGgkLCIqJi4nj0SkhKoRotLSMAA7Jy8gIKing0KwkIKKsgC6gKIAM1dREN3Jo1gSq0tBF8HV1kvax6+moG+DULGBoZw/gmAqjA1Ay/s4HA3MISyrdC1WtthC9ebGwhquzsHRxBfCdUzc74Y9UFrtDVzd3D0wtVszd+zT6+KKr9UDX749UbEBgULIAbhODVHCoQFo5bb0QkXs1RAvhAtDFezTGx+DTHEchD8Ql4NCcSyoGJYTj1siQRzL/JKeY4NKcSzvxp6RmSWPVmZhHWnI3L1TlEFDu5edj15hcQU2gVqmHTa1pEXJFXXFKKqbmM2ALTuLC8Ak1vZRXRxa1xtS6q3ppaYrXG1NWjai1taCRCG6dJU3NLqy+ak10DGImx07LNFCOk2js6iXVyVzcLai7s6SWlbnIs6rOIbi8ViOifIDNx0uTRynoUjIIRAgALIFStaR5YjgAAAABJRU5ErkJggg==";

//  facebook icon
const FACEBOOK_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAAAQIAAWpwAX5kAX5gAX5gAX5gAXJwAXpgAWZ8AX5gAXaIAX5gAXpkAVaoAX5gAXJsAX5gAX5gAYJkAYJkAXpoAX5gAX5gAX5kAXpcAX5kAX5gAX5gAX5YAXpoAYJijtTrqAAAAIHRSTlMABFis4vv/JL0o4QvSegbnQPx8UHWwj4OUgo7Px061qCrcMv8AAAB0SURBVEjH7dK3DoAwDEVRqum9BwL//5dIscQEEjFiCPhubziTbVkc98dsx/V8UGnbIIQjXRvFQMZJCnScAR3nxQNcIqrqRqWHW8Qd6cY94oGER8STMVioZsQLLnEXw1mMr5OqFdGGS378wxgzZvwO5jiz2wFnjxABOufdfQAAAABJRU5ErkJggg==";

//  whatsapp icon
const WHATSAPP_ICON = "data:image/png;base64,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";

