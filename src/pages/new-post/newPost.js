import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: 1
        }
    }


    selectOption(option) {
        this.setState({ option: option })
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps='handled' style={styles.containerNewPost}>
                    <Text style={styles.titleColor}>DESCRIPCION</Text>
                    <TextInput
                        style={styles.textArea}
                        multiline={true}
                        textAlignVertical="top"
                        underlineColorAndroid="transparent"
                    />
                <View style={styles.containerType}>
                    <Text style={styles.titleColor}>TIPO DE PUBLICACION</Text>
                    <View style={styles.checkboxContainer}>
                        <View>
                            <TouchableWithoutFeedback onPress={() => this.selectOption(1)}>
                                <View style={[styles.checkboxItem, styles.firstItem, this.state.option === 1 ? styles.activeCheck : null]}>
                                    <Text style={styles.optionCheckText}>En adopcion</Text>
                                    {this.state.option === 1 ? <Icon name="md-checkmark" style={styles.iconCheck} color="#F5DA49" size={33} /> : null}
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View>
                            <TouchableWithoutFeedback onPress={() => this.selectOption(2)}>
                                <View style={[styles.checkboxItem, this.state.option === 2 ? styles.activeCheck : null]}>
                                    <Text style={styles.optionCheckText}>Encontrado</Text>
                                    {this.state.option === 2 ? <Icon name="md-checkmark" style={styles.iconCheck} color="#F5DA49" size={33} /> : null}
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View>
                            <TouchableWithoutFeedback onPress={() => this.selectOption(3)}>
                                <View style={[styles.checkboxItem, this.state.option === 3 ? styles.activeCheck : null]}>
                                    <Text style={styles.optionCheckText}>Perdido</Text>
                                    {this.state.option === 3 ? <Icon name="md-checkmark" style={styles.iconCheck} color="#F5DA49" size={33} /> : null}
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    containerNewPost: {
        backgroundColor: "#E8E8E8"
    },
    titleColor: {
        color: "#979797",
        paddingVertical: 20,
        marginLeft: 20,
        fontSize: 18
    },
    checkboxItem: {
        backgroundColor: "#fff",
        padding: 20,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#979797",
        position: "relative"
    },
    firstItem: {
        borderTopWidth: 1,
        borderColor: "#979797"
    },
    optionCheckText: {
        fontSize: 20,
        color: "black"
    },
    iconCheck: {
        position: "absolute",
        right: 10,
        top: 13
    },
    activeCheck: {
        backgroundColor: "#f6f5f6"
    },
    textArea: {
        backgroundColor: "#fff",
        height: 150,
        justifyContent: "flex-start",
        paddingHorizontal: 20
    }
})