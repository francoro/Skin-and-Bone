import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as actions from "./actions";
import { connect } from 'react-redux';
import * as API from './api';
import { Actions } from 'react-native-router-flux';


export default class ButtonsNewPost extends Component {

    createPost() {
        //validar window variables, mandar evento si no pasa validacion a newPost

        let bodySendNewPost = {};

        if (!window.description) {
            // send event message : La descripcion es requerida
            return;
        } else {
            bodySendNewPost.body = window.description;
        }

        //if (!window.image) {
        //send event message: La imagen es requerida
        //   return;
        // } else {
        bodySendNewPost.picture = "https://playdauntless.com/images/media-wallpapers/shrike-soaring-wallpaper-dauntless-2560x1600.jpg";
        // }

        bodySendNewPost.type = window.type;

        bodySendNewPost.created = new Date();

        storage.load({
            key: "user",
        }).then(user => {
            bodySendNewPost.user = {
                _id: user._id,
                name: user.name,
                picture: user.picture
            }
            API.uploadPost(bodySendNewPost).then((dataNewPost) => {
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
                console.log("err uplaod post", err)
            })

        }).catch(err => {
            console.log("error11 no user")
            //no hago nada porque sin logearse no puede entrar ala pantalla
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
