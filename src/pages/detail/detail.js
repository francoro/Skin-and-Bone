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
            messageToSend: null
        }
    }

    sendMessage() {
        //send message to api tengo properties en this.props.item
        this.setState({messageToSend : 123})
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
                    onChangeText={(text) => window.message = text}
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
        width: window.width - 90,
        backgroundColor: "#fff",
        padding: 10,
        margin: 20,
        borderRadius: 6,
        flexDirection: "column"
    },
    iconSend: {
        flexDirection: "column",
        position: "relative",
        top: 25
    }
})