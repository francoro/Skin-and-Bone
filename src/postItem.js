import * as React from 'react';
import { Component } from 'react';
import { View, Image, FlatList, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as API from './api';
import ActionSheet from 'react-native-actionsheet';

const { width } = Dimensions.get('window');

const frameWidth = width;
const columnWidth = frameWidth / 3.1;

export default class PostItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLiked: false,
            user: null
        };
    }

    componentWillMount() {

        storage.load({
            key: "user",
        }).then(data => {
            let user = data[1];
            this.setState({ user: user });
            let userId = user._id;

            if (this.props.item.likes.length) {
                for (let i = 0; i < this.props.item.likes.length; i++) {
                    if (this.props.item.likes[i]._id === userId) {
                        this.setState({ isLiked: true });
                    }
                }
            }
        }).catch(err => {
            return;
        })

    }

    unLikePost() {
        this.setState({ isLiked: false });
        this.props.item.likesCount -= 1;
        let userId = "5ae312c8b8df4100041a14c6";
        //save in local storage all posts with {tabId: posts:}

        // yagregar a  TODOS tab primero checkieando si esta por id y si esta lo removemos y guardamos el index (si no esta no hacaeoms nada porq en el proximo load more va aapercer con los datos actualizados)
        //y despues agregamos el this.props.item con https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index
        //q ues arr.splice(index, 0, item) y confiamos q component willUnmount checke si el post is liked or not 

        API.unLikePost(userId, this.props.item._id).then(res => {
        })
            .catch((err) => console.log("Unlike error catch", err))
    }

    likePost() {
        this.setState({ isLiked: true });
        this.props.item.likesCount += 1;
        //save in local storage all posts with {tabId: posts:}

        // yagregar a  TODOS tab primero checkieando si esta por id y si esta lo removemos y guardamos el index (si no esta no hacaeoms nada porq en el proximo load more va aapercer con los datos actualizados)
        //y despues agregamos el this.props.item con https://stackoverflow.com/questions/586182/how-to-insert-an-item-into-an-array-at-a-specific-index
        //q ues arr.splice(index, 0, item) y confiamos q component willUnmount checke si el post is liked or not 

        let userId = "5ae312c8b8df4100041a14c6";
        let userName = "Alejandro Coronel"
        var like = { postId: this.props.item._id, name: userName, userId: userId };
        API.likePost(like).then(res => {
            console.log("Countlikes", this.props.item.likesCount)

        })
            .catch((err) => console.log("like error catch", err))
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    actionSheetPress(index) {
        if(index === 0) return;

        if(index === 1) {
            if (this.state.user.favorites.length) {
                for (let i = 0; i < this.state.user.favorites.length; i++) {
                    if (this.state.user.favorites[i]._id == this.props.item._id) {
                        //remove favorite api
                        //remove fromn local storage user.favorites
                        API.removeFavorite(this.state.user._id, this.props.item._id).then(() => {

                        })
                    }
                }
            } else {
                //add favorite
                //add to user.favorites localstorage
                //see object that i send to favorite in animals
            }
            //use setstate options to have a global variable y remove index button
        }

        if(index === 2) {
            //remove posts
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
                tagType = "Adopcion";
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

        const options = [];
        //console.log("this.state.user", this.state.user)
        options.push("Cancelar")
        if (this.state.user != null) {
            if (this.state.user.favorites.length) {
                for (let i = 0; i < this.state.user.favorites.length; i++) {
                    if (this.state.user.favorites[i]._id == this.props.item._id) {
                        options.push("Eliminar de favoritos")
                    }
                }
            } else {
                options.push("Agregar a favoritos")
            }
            let userId = this.state.user._id;
            if (userId === this.props.item.user._id) {
                options.push("Eliminar publicacion")
            }
        }

        //options.push("Marcar como favorito")
        //chequear si esta en localstorage user.favoritos el id del post si esta poner desmarcar sino marcar

        // y despues en el index checkear si esta o no en favs y ahi hacer la llamada api para guardar o borrar, y tambien recorrer array favoritos para ver si esta en fav
        // y ahi api borrar o agregar
        //guardar fav en local storage

        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image style={styles.userImg} source={{ uri: this.props.item.user.picture }} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{this.props.item.user.name}</Text>
                        <Text style={styles.date}>{this.props.item.created}</Text>
                    </View>
                    <View style={styles.arrowContainer}>
                        <TouchableOpacity onPress={this.showActionSheet}>
                            <Icon name="ios-arrow-down" color="#999" size={23} />
                        </TouchableOpacity>
                        {options.length ?
                            <ActionSheet
                                ref={o => this.ActionSheet = o}
                                options={options}
                                cancelButtonIndex={0}
                                onPress={(index) => { this.actionSheetPress(index) }}
                            /> : null}
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
                <Image style={{ width: width, height: 400 }} source={{ uri: this.props.item.image }} />
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
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon style={styles.iconAction} name="ios-chatbubbles-outline" size={23} />
                        <Text style={styles.textIcon}>Responder</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon style={styles.iconAction} color="#3282b6" name="md-share-alt" size={23} />
                        <Text style={styles.textIconShare}>Compartir</Text>
                    </TouchableOpacity>
                </View>
                {this.props.item.comments.length ?
                    <View style={styles.firstCommentContainer}>
                        <Image style={styles.userImgComment} source={{ uri: this.props.item.comments[0].user.picture }} />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{this.props.item.comments[0].user.name}</Text>
                            <Text style={styles.date}>{this.props.item.comments[0].body}</Text>
                        </View>
                    </View>
                    : null}
            </View>
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
        flex: 1,
        flexDirection: "column",
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
        marginTop: 15
    },
    iconHeartFull: {
        color: "#E94D3B"
    },
    textIconShare: {
        position: "relative",
        bottom: -2,
        left: 10,
        color: "#3282b6"
    }
})
