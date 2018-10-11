import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as API from '../../api';
import PostItem from '../../postItem';
import Icon from 'react-native-vector-icons/Ionicons';
const window = Dimensions.get('window');
export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageToSend: null,
            textInput: null
        }
        this.body = "";
        this.answer = null;
    }

    sendMessage() {
        if (this.answer) {
            console.log("IS ANSWER")
            //hacer api call comment answer
            // cuando borro mensaje q aprete responder mantiene y entra a anwser

            //hacer en onchagnge una funcion q se fije si text es length 0 si es asi ponemos this.answer en null y hacemos el setstate textinput text!!!!
        } else {

            if (this.state.textInput.length > 0) {
                storage.load({
                    key: "user",
                }).then(user => {
                    API.addComment(this.props.item, this.state.textInput, user).then((data) => {
                        this.setState({ messageToSend: data })
                    })
                    this.setState({ textInput: null })
                    Keyboard.dismiss()
                }).catch(err => {
                    //TODO NECESITAS LOGIARTE PARA ENVIAR MENSAJES
                    return;
                })
            } 
        }
    }

    setCommentAnswer(userName, userId) {
        this.answer = "@" + userName;
        this.setState({ textInput: this.answer })
        //this.textInput.focus();
    }

    render() {
        return (
            <View>
                <PostItem item={this.props.item} message={this.state.messageToSend} setCommentAnswer={this.setCommentAnswer.bind(this)} />
                <View style={styles.inputFloating}>
                    <TextInput
                        style={styles.input}
                        placeholder="Escribe un comentario"
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({ textInput: text })}
                        ref={input => { this.textInput = input }}
                        value={this.state.textInput}
                    />
                    <TouchableOpacity onPress={() => this.sendMessage()}>
                        <Icon style={styles.iconSend} name="md-send" color="#F5DA49" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    inputFloating: {
        position: "absolute",
        bottom: 0,
        width: window.width,
        backgroundColor: "#f2f2f2",
        flexDirection: "row"
    },
    input: {
        width: window.width - 70,
        backgroundColor: "#fff",
        padding: 10,
        margin: 10,
        borderRadius: 6,
        flexDirection: "column"
    },
    iconSend: {
        flexDirection: "column",
        position: "relative",
        width: 50,
        top: 20,
        left: 10
    }
})