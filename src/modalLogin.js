import * as React from 'react';
import { Component } from "react";
import Overlay from 'react-native-modal-overlay';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const columnWidth = width / 2;

export default class ModalLogin extends Component {
    constructor(props) {
        super(props);
    }
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
                        <TouchableOpacity style={styles.button}>
                            <Text style={[styles.text, styles.cancelButton]}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.text}>Aceptar</Text>
                        </TouchableOpacity>
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
        flex: 1
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