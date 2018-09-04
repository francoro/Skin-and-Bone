import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
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
            <View style={styles.containerNewPost}>
                <View style={styles.containerType}>
                    <Text style={styles.titleColor}>TIPO DE PUBLICACION</Text>
                    <View style={styles.checkboxContainer}>
                        <View style={styles.checkboxItem}>
                            <TouchableWithoutFeedback onPress={() => this.selectOption(1)}>
                                <View>
                                    <Text style={styles.optionCheckText}>En adopcion</Text>
                                    {this.state.option === 1 ? <Icon name="md-checkmark" color="#F5DA49" size={30} /> : null}
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.checkboxItem}>
                            <TouchableWithoutFeedback style={styles.checkboxItem} onPress={() => this.selectOption(2)}>
                                <View>
                                    <Text style={styles.optionCheckText}>Encontrado</Text>
                                    {this.state.option === 2 ? <Icon name="md-checkmark" color="#F5DA49" size={30} /> : null}
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        <View style={styles.checkboxItem}>
                            <TouchableWithoutFeedback style={styles.checkboxItem} onPress={() => this.selectOption(3)}>
                                <View>
                                    <Text style={styles.optionCheckText}>Perdido</Text>
                                    {this.state.option === 3 ? <Icon name="md-checkmark" color="#F5DA49" size={30} /> : null}
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerNewPost: {
        backgroundColor: "#E8E8E8"
    },
    titleColor: {
        color: "#979797"
    },
    checkboxItem: {
        backgroundColor: "#fff",
        padding: 20,
        flexDirection: "row"
    },
    optionCheckText: {
        fontWeight: "600",
        fontSize: 20
    }
})