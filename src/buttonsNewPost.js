import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as actions from "./actions";
import { connect } from 'react-redux';
import { validation_body, validation_picture, loading_toggle } from './actions';
import * as API from './api';
import { Actions } from 'react-native-router-flux';
import loadingToggle from './reducers/loadingToggle';

class ButtonsNewPost extends Component {

    createPost() {
        this.props.loading_toggle(true);

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
            bodySendNewPost.user = {
                _id: user._id,
                name: user.name,
                picture: user.picture
            }
            API.uploadPost(bodySendNewPost).then((dataNewPost) => {
                this.props.loading_toggle(false);
                console.log("UPLOAD POST", dataNewPost)
                /* bodySendNewPost._id = dataNewPost.ops[0]._id;
                bodySendNewPost.likes = [];
                bodySendNewPost.comments = [];
                bodySendNewPost.likesCount = 0; */
                /*let tabIdText = String(bodySendNewPost.type);
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
                        } else {
                            storage.load({
                                key: tabTodos,
                            }).then(data => {
                                let postsArray = data.value;
                                let postsTotal = Number(data.total) + 1;
                                postsArray.unshift(bodySendNewPost);
                                API.saveLocalExpire(tabTodos, postsArray, postsTotal, 10);
                                console.log(4)
                            }).catch(err => {
                                return;
                            })
                        }

                        
                    })
                })*/
                
                Actions.tabhome();

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
                    <Text style={[styles.colorButton, this.props.loadingToggle ? styles.disabledButton : null]}>PUBLICAR</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        loadingToggle: state.loadingToggle
    }
}


const mapDispatchToProps = dispatch => {
    return {
        validation_body: (validationBody) => dispatch(validation_body(validationBody)),
        validation_picture: (validationPicture) => dispatch(validation_picture(validationPicture)),
        loading_toggle: (loadingToggle) => dispatch(loading_toggle(loadingToggle))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsNewPost)

const styles = StyleSheet.create({
    containerIcons: {
        flex: 1,
        flexDirection: "row"
    },
    colorButton: {
        color: "#F5DA49",
        fontSize: 17,
        marginRight: 15
    },
    disabledButton: {
        color: "#F5DA49",
        opacity: 0.5
    }
});
