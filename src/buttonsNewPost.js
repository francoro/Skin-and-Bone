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
            bodySendNewPost.image = "https://playdauntless.com/images/media-wallpapers/shrike-soaring-wallpaper-dauntless-2560x1600.jpg";
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
                Actions.tabhome();
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
