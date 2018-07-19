import * as React from 'react';
import { Component } from 'react';
import { View, Image, FlatList, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const frameWidth = width;
const columnWidth = frameWidth / 3.1;

export default class PostItem extends Component {
    constructor() {
        super()
        this.state = {
            isLiked: false
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

        //!!ESTE VA A TRAER DE LOCAL STORAGE
        //let userId = "5ae312c8b8df4100041a14c6";

        /* if (this.props.item.likes.length) {
            for (let i = 0; i < this.props.item.likes.length; i++) {
                if (this.props.item.likes[i]._id === userId) {
                    this.setState({ isLiked: true });
                }
            }
        } */

        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image style={styles.userImg} source={{ uri: this.props.item.user.picture }} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{this.props.item.user.name}</Text>
                        <Text style={styles.date}>{this.props.item.created}</Text>
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
                    <Text> - </Text>
                    {commentCount}
                </View>
                <View style={styles.actionsButtons}>
                    {this.state.isLiked === false ?
                        <TouchableOpacity style={styles.actionButton}>
                            <Icon style={styles.iconAction} name="ios-heart-outline" size={23} />
                            <Text style={styles.textIcon}>Me gusta</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.actionButton}>
                            <Icon style={styles.iconAction} name="ios-heart" size={23} />
                            <Text style={styles.textIcon}>No me gusta</Text>
                        </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon style={styles.iconAction} name="ios-create-outline" size={23} />
                        <Text style={styles.textIcon}>Comentar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.actionButton}>
                        <Icon style={styles.iconAction} name="ios-share-outline" size={23} />
                        <Text style={styles.textIcon}>Compartir</Text>
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
})
