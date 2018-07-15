import * as React from 'react';
import { Component } from 'react';
import { View, Image, FlatList, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

export default class PostItem extends Component {
    render() {
        return (
            <View styles={styles.container}>
                <View styles={styles.userContainer}>
                    <View styles={styles.userImgContainer}>
                        <Image style={styles.userImg} source={{ uri: this.props.item.user.picture }} />
                    </View>
                    <View styles={styles.textContainer}>
                        <View styles={styles.nameContainer}>
                            <Text style={styles.name}>{this.props.item.user.name}</Text>
                        </View>
                        <View styles={styles.dateContainer}>
                            <Text style={styles.date}>{this.props.item.created}</Text>
                        </View>
                    </View>
                </View>

                <Image style={{ width: Dimensions.get('window').width, height: 400 }} source={{ uri: this.props.item.image }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        marginBottom: 20,
        paddingHorizontal: 20
    },
    userContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    userImgContainer: {
        marginLeft: 10
    },
    userImg: {
        borderRadius: 50,
        width: 40,
        height: 40
    },
    textContainer: {
        marginLeft: 5
    },
    nameContainer: {

    },
    dateContainer: {

    },
    name: {
        fontWeight: "600",
        color: "black"
    },
    date: {
        color: "#f2f2f2"
    }
})
