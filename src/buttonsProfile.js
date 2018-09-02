import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as actions from "./actions";
import { connect } from 'react-redux';


class ButtonsProfile extends Component {

    toggleMenu() {
        console.log("entro")
        let isMenuOpen = this.props.openMenu ? false : true;
        this.props.open_menu(isMenuOpen);
    }

    render() {
        return (
            <View style={styles.containerIcons}>
                <TouchableHighlight onPress={this.toggleMenu.bind(this)}>
                    <Icon name="md-notifications" style={styles.iconFilter} size={18} />
                </TouchableHighlight>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    containerIcons: {
        flex: 1,
        flexDirection: "row"
    },
    iconFilter: {
        color: "#FFF",
        fontSize: 22,
        marginRight: 15
    }
});

const mapStateToProps = state => {
    return {
        openMenu: state.openMenu
    }
}

export default connect(mapStateToProps, actions)(ButtonsProfile);