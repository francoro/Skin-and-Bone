import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableWithoutFeedback, TextInput, ScrollView, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
//var ImagePicker = require('react-native-image-picker');
import ImagePicker from 'react-native-image-crop-picker';
const { width } = Dimensions.get('window');
const options = {
    title: 'Sube una imagen',
    cancelButtonTitle: 'Cancelar',
    takePhotoButtonTitle: 'Tomar foto',
    chooseFromLibraryButtonTitle: 'Abrir la galeria'
};
class NewPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: 3,
            uploadPicture: null
        }
        window.type = 3;
        window.image = null;
    }

    selectOption(option) {
        window.type = option;
        this.setState({ option: option })
    }

    openGallery() {
        ImagePicker.openPicker({
            width: 600,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            uploadPictureVar = 'data:image/jpeg;base64,' + image.data;
            window.picture = uploadPictureVar;
            this.setState({ uploadPicture: uploadPictureVar });
        });
    }

    takePicture() {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            includeBase64: true
        }).then(image => {
            uploadPictureVar = 'data:image/jpeg;base64,' + image.data;
            window.picture = uploadPictureVar;
            this.setState({ uploadPicture: uploadPictureVar });
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps='handled' style={styles.containerNewPost}>
                    {this.props.validationBody ? <Text> El campo body es requerido </Text> : null}
                    <Text style={styles.titleColor}>DESCRIPCION</Text>
                    <TextInput
                        style={styles.textArea}
                        multiline={true}
                        onChangeText={(text) => window.description = text}
                        textAlignVertical="top"
                        underlineColorAndroid="transparent"
                    />
                    <View style={styles.containerType}>
                        <Text style={styles.titleColor}>TIPO DE PUBLICACION</Text>
                        <View style={styles.checkboxContainer}>
                            <View>
                                <TouchableWithoutFeedback onPress={() => this.selectOption(3)}>
                                    <View style={[styles.checkboxItem, styles.firstItem, this.state.option === 3 ? styles.activeCheck : null]}>
                                        <Text style={styles.optionCheckText}>En adopcion</Text>
                                        {this.state.option === 3 ? <Icon name="md-checkmark" style={styles.iconCheck} color="#F5DA49" size={30} /> : null}
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback onPress={() => this.selectOption(1)}>
                                    <View style={[styles.checkboxItem, this.state.option === 1 ? styles.activeCheck : null]}>
                                        <Text style={styles.optionCheckText}>Encontrado</Text>
                                        {this.state.option === 1 ? <Icon name="md-checkmark" style={styles.iconCheck} color="#F5DA49" size={30} /> : null}
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View>
                                <TouchableWithoutFeedback onPress={() => this.selectOption(2)}>
                                    <View style={[styles.checkboxItem, this.state.option === 2 ? styles.activeCheck : null]}>
                                        <Text style={styles.optionCheckText}>Perdido</Text>
                                        {this.state.option === 2 ? <Icon name="md-checkmark" style={styles.iconCheck} color="#F5DA49" size={30} /> : null}
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>

                    </View>
                    <View style={styles.imageContainer}>
                        {this.state.uploadPicture ?
                            <Image
                                style={styles.imagePost}
                                source={{ uri: this.state.uploadPicture }}
                            />
                            : null}
                    </View>
                    <View style={styles.footer}>
                        <View style={styles.buttonFooter}>
                            <Icon name="md-camera" style={styles.iconImage} color="#979797" size={33} />
                            <Text onPress={this.takePicture.bind(this)} style={styles.textFooter}>TOMAR FOTO </Text>
                        </View>
                        <View style={styles.buttonFooter}>
                            <Icon name="md-image" style={styles.iconImage} color="#979797" size={33} />
                            <Text onPress={this.openGallery.bind(this)} style={styles.textFooter}>ABRIR GALERIA </Text>
                        </View>
                    </View>
                </ScrollView>

            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        validationBody: state.validationBody
    }
}

export default connect(mapStateToProps, null)(NewPost)

const styles = StyleSheet.create({
    containerNewPost: {
        backgroundColor: "#E8E8E8"
    },
    titleColor: {
        color: "#979797",
        paddingVertical: 20,
        marginLeft: 20,
        fontSize: 16
    },
    checkboxItem: {
        backgroundColor: "#fff",
        padding: 10,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#f2f2f2",
        position: "relative"
    },
    firstItem: {
        borderTopWidth: 1,
        borderColor: "#f2f2f2"
    },
    optionCheckText: {
        fontSize: 16,
        color: "black"
    },
    iconCheck: {
        position: "absolute",
        right: 10,
        top: 10
    },
    activeCheck: {
        backgroundColor: "#f6f5f6"
    },
    textArea: {
        backgroundColor: "#fff",
        height: 150,
        justifyContent: "flex-start",
        paddingHorizontal: 20
    },
    footer: {
        backgroundColor: "#fff",
        flexDirection: "row",
        paddingVertical: 15,
        paddingHorizontal: 20
    },
    buttonFooter: {
        width: width / 2,
        flexDirection: "row"
    },
    textFooter: {
        fontWeight: "600",
        marginLeft: 15,
        position: "relative",
        top: 7
    },
    imageContainer: {
        width: 200,
        height: 250,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imagePost: {
        height: 200,
        width: 300,
        marginLeft: 20
    }
})