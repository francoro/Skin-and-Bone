import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet , Dimensions, TouchableOpacity} from 'react-native';
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
            body: ""
        }
        this.body = "";
    }

    sendMessage() {
        
                
        if(this.state.body.length > 0) {
            storage.load({
                key: "user",
            }).then(user => {
                API.addComment(this.props.item, this.body, user).then((data) => {

                    console.log("Comment added", data);
                })
                this.textInput.clear()
                this.setState({messageToSend : 123})
            }).catch(err => {
                
                return;
            })
        }
        
    }

    render() {
        
        return (
            <View>
                <PostItem item={this.props.item} message={this.state.messageToSend}/>
                <View style={styles.inputFloating}>
                    <TextInput
                    style={styles.input}
                    placeholder="Escribe un comentario"
                    underlineColorAndroid= "transparent"
                    onChangeText={(text) => this.body = text}
                    ref={input => { this.textInput = input }}
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