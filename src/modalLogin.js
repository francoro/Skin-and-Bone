import * as React from 'react';
import { Component } from "react";
import Overlay from 'react-native-modal-overlay';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { LoginManager } from "react-native-fbsdk";
import { LoginButton, AccessToken,  GraphRequest, GraphRequestManager } from 'react-native-fbsdk';
const { width } = Dimensions.get('window');
const columnWidth = width / 2;

export default class ModalLogin extends Component {
    constructor(props) {
        super(props);
    }

    logInFacebook() {
        console.log("entro")
        LoginManager.logInWithReadPermissions(["public_profile, email"]).then(
            function (result) {
                AccessToken.getCurrentAccessToken().then((data) => {
                    const accessToken = data.accessToken;
                    const responseInfoCallback = (error, result) => {
                      if (error) {
                        console.log(error);
                        console.log('Error fetching data=', error);
                      } else {
                        console.log('Success fetching data=', result);
                      }
                    };
                    const infoRequest = new GraphRequest(
                      '/me',
                      {
                        accessToken,
                        parameters: {
                          fields: {
                            string: 'email,name,first_name,middle_name,last_name, picture',
                          },
                        },
                      },
                      responseInfoCallback,
                    );
                    new GraphRequestManager().addRequest(infoRequest).start();
                  });
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }
    //Siempre q ue construyo devuelta agregar en overlay node_module a inner container 180 style

    render() {
        return (
            <Overlay visible={this.props.modalVisible}
                closeOnTouchOutside animationType="zoomIn"
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                childrenWrapperStyle={{ backgroundColor: '#eee' }}
                animationDuration={500}
                onClose={() => this.props.setModalClose()}>
                <View style={styles.container}>
                    <Text style={styles.title}>Para usar esta funcionalidad debes iniciar sesión con Facebook.</Text>
                    <View style={styles.containerButtons}>
                        <TouchableOpacity onPress={() => this.props.setModalClose()} style={styles.button}>
                            <Text style={[styles.text, styles.cancelButton]}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.logInFacebook()} style={styles.button}>
                            <Text style={styles.text}>Aceptar</Text>
                        </TouchableOpacity> 
                        {/* <LoginButton
                            style={styles.button}
                            onLoginFinished={
                                (error, result) => {
                                    if (error) {
                                        console.log("login has error: " + result.error);
                                    } else if (result.isCancelled) {
                                        console.log("login is cancelled.");
                                    } else {
                                        AccessToken.getCurrentAccessToken().then(
                                            (data) => {
                                                console.log(data.accessToken.toString())
                                            }
                                        )
                                    }
                                }
                            }
                            onLogoutFinished={() => console.log("logout.")} /> */}
                    </View>
                </View>
            </Overlay>
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        padding: 10
    },
    container: {
        flexDirection: "column",
        flex: 1,
    },
    containerButtons: {
        flexDirection: "row",
        position: "absolute",
        bottom: 0
    },
    button: {
        width: columnWidth,
        padding: 10
    },
    text: {
        fontSize: 20,
        fontWeight: "600"
    },
    cancelButton: {
        position: "relative",
        left: 30
    }
})