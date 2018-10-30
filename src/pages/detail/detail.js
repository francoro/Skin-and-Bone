import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, Dimensions, TouchableOpacity, Keyboard } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as API from '../../api';
import PostItem from '../../postItem';
import Icon from 'react-native-vector-icons/Ionicons';
import Overlay from 'react-native-modal-overlay';
const window = Dimensions.get('window');

export default class Detail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messageToSend: null,
            textInput: null,
            modalVisible: false
        }
        this.body = "";
        this.answer = null;
        this.userIdToAnswer = null;
    }

    sendMessage() {
        storage.load({
            key: "user",
        }).then(user => {

            if (this.answer) {
                if (this.state.textInput.length > 0) {
                    storage.load({
                        key: "user",
                    }).then(user => {
                        API.answerComment(this.props.item, this.state.textInput, user, this.answer, this.userIdToAnswer).then((data) => {
                            console.log("ANSWER DATA", data)

                            this.setState({ messageToSend: data })
                        })
                        this.setState({ textInput: null })
                        Keyboard.dismiss()
                    }).catch(err => {

                        return;
                    })
                }
            } else {
                if (this.state.textInput.length > 0) {
                    storage.load({
                        key: "user",
                    }).then(user => {
                        API.addComment(this.props.item, this.state.textInput, user).then((data) => {
                            //console.log(2, data)
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
        }).catch(err => {
            this.setState({ modalVisible: true })
            return;
        })
    }

    setCommentAnswer(userName, userId) {
        this.answer = "@" + userName;
        this.userIdToAnswer = userId;
        this.setState({ textInput: this.answer })
    }

    onChangeText(text) {
        if (text.length == 0) {
            this.answer = null;
            this.userIdToAnswer = null;
        }
        this.setState({ textInput: text })
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
                        onChangeText={(text) => this.onChangeText(text)}
                        ref={input => { this.textInput = input }}
                        value={this.state.textInput}
                    />
                    <TouchableOpacity onPress={() => this.sendMessage()}>
                        <Icon style={styles.iconSend} name="md-send" color="#F5DA49" size={30} />
                    </TouchableOpacity>
                </View>
                <Overlay visible={this.state.modalVisible}
                    closeOnTouchOutside animationType="zoomIn"
                    containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    childrenWrapperStyle={{ backgroundColor: '#eee' }}
                    animationDuration={500}
                    onClose={() => this.setState({ modalVisible: false })}>

                    <Text>Some Modal Content</Text>

                </Overlay>
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