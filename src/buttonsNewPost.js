import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as actions from "./actions";
import { connect } from 'react-redux';
import { validation_body, validation_picture } from './actions';
import * as API from './api';
import { Actions } from 'react-native-router-flux';
import axios from 'axios';
class ButtonsNewPost extends Component {

    createPost() {
        storage.save({
            key: "user",
            data: { _id: 1, name: "Franco Coronel", picture: "url" },
            expires: null
        });
        let bodySendNewPost = {};

        if (!window.description) {
            this.props.validation_body(true);
            return;
        } else {
            bodySendNewPost.body = window.description;
        }

        if (!window.picture) {
            this.props.validation_picture(true);
            return;
        }

        bodySendNewPost.picture = window.picture;
        bodySendNewPost.type = window.type;

        bodySendNewPost.created = new Date();

        storage.load({
            key: "user",
        }).then(user => {
            //alert(1)
            bodySendNewPost.user = {
                _id: user._id,
                name: user.name,
                picture: user.picture
            }
            API.uploadPost(bodySendNewPost).then((dataNewPost) => {
                alert(3)
                console.log("UPLOAD POST", dataNewPost)
                bodySendNewPost._id = dataNewPost.ops[0]._id;
                bodySendNewPost.likes = [];
                bodySendNewPost.comments = [];
                bodySendNewPost.likesCount = 0;
                let tabIdText = String(bodySendNewPost.type);
                API.getLocalExpire(tabIdText).then((dataLocalStorage) => {
                    if (!dataLocalStorage) {
                        API.saveLocalExpire(tabIdText, [bodySendNewPost], 1, 10);
                        console.log(1)
                    } else {
                        storage.load({
                            key: tabIdText,
                        }).then(data => {
                            let postsArray = data.value;
                            let postsTotal = Number(data.total) + 1;
                            postsArray.unshift(bodySendNewPost);
                            API.saveLocalExpire(tabIdText, postsArray, postsTotal, 10);
                            console.log(2)
                        }).catch(err => {
                            console.log("error11")
                            return;
                        })
                    }

                    let tabTodos = "0";
                    //bodySendNewPost._id = dataNewPost.ops[0]._id + 123;
                    API.getLocalExpire(tabTodos).then((dataLocalStorage) => {
                        if (!dataLocalStorage) {
                            API.saveLocalExpire(tabTodos, [bodySendNewPost], 1, 10);
                            console.log(3)
                        } else {
                            storage.load({
                                key: tabTodos,
                            }).then(data => {
                                let postsArray = data.value;
                                let postsTotal = Number(data.total) + 1;
                                postsArray.unshift(bodySendNewPost);
                                console.log("postArray", postsArray)
                                API.saveLocalExpire(tabTodos, postsArray, postsTotal, 10);
                                console.log(4)
                            }).catch(err => {
                                console.log("error11")
                                return;
                            })
                        }

                        Actions.tabhome();
                    })
                })

            }).catch(err => {
                alert(err)
                console.log("err uplaod post", err)
            })

        }).catch(err => {
            console.log("error11 no user")
            return;
        })



    }

    render() {
        return (
            <View style={styles.containerIcons}>
                <TouchableHighlight onPress={this.createPost.bind(this)}>
                    <Text style={styles.colorButton}>PUBLICAR</Text>
                </TouchableHighlight>
            </View>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        validation_body: (validationBody) => dispatch(validation_body(validationBody)),
        validation_picture: (validationPicture) => dispatch(validation_picture(validationPicture))
    }
}

export default connect(null, mapDispatchToProps)(ButtonsNewPost)

const styles = StyleSheet.create({
    containerIcons: {
        flex: 1,
        flexDirection: "row"
    },
    colorButton: {
        color: "#F5DA49",
        fontSize: 17,
        marginRight: 15
    }
});
