import * as React from 'react';
import { Component } from 'react';
import { View, Image, FlatList, Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

export default class PostItem extends Component {
    render() {
        let tagType;
        switch (this.props.item.type) {
            case 1:
                tagType = "Encontrados";
                break;
            case 2:
                tagType = "Perdidos";
                break;
            case 3:
                tagType = "Adopcion";
                break;
        }

        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Image style={styles.userImg} source={{ uri: this.props.item.user.picture }} />
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{this.props.item.user.name}</Text>
                        <Text style={styles.date}>{this.props.item.created}</Text>
                    </View>
                </View>

                <Text style={styles.body}>{this.props.item.body}</Text>
                <View style={styles.contentView}>
                    <Text style={{ borderColor: "#999", borderWidth: 2, borderRadius: 6, padding: 9}}>
                        <Text style={styles.tagName}>
                            {tagType}
                        </Text>
                    </Text>
                </View>
                <Image style={{ width: Dimensions.get('window').width, height: 400 }} source={{ uri: this.props.item.image }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        marginBottom: 20
    },
    topContainer: {
        flex: 1,
        flexDirection: "row"
    },
    infoContainer: {
        flex: 1,
        flexDirection: "column",
        marginTop: 20
    },
    userImg: {
        borderRadius: 50,
        width: 55,
        height: 55,
        marginLeft: 10,
        marginTop: 10
    },
    name: {
        marginLeft: 10,
        fontWeight: "600",
        color: "black"
    },
    date: {
        color: "#999",
        marginLeft: 10
    },
    body: {
        paddingVertical: 20,
        paddingHorizontal: 12
    },
    tagName: {
        color: "#999"
    },
    contentView: {
        paddingLeft: 10,
        flex: 1,
        flexDirection:'row',
        flexWrap:'wrap',
        marginBottom: 15
    }
})
