import React, { Component } from 'react';
import { Button, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {open_menu} from "./actions";
import { connect } from 'react-redux';
import ModalLogin from '../src/modalLogin';


class ButtonsProfile extends Component {
    constructor() {
        super();
        this.state = {
            user: null
        }
    }

    componentWillMount() {
        storage.load({
            key: "user",
        }).then(data => {
            this.setState({ user: data })
        }).catch(err => {
            // leave user null
            return;
        }) 
    }

    toggleMenu() {
        let isMenuOpen = this.props.openMenu ? false : true;
        this.props.open_menu(isMenuOpen);
    }

    logOut() {
        //TODO: Log out
        storage.remove({
            key: 'user'
        });
        this.setState({user: null})
    }

    render() {
        return (
            <View style={styles.containerIcons}>
                <TouchableHighlight onPress={this.toggleMenu.bind(this)}>
                    <Icon name="md-notifications" style={styles.iconFilter} size={18} />
                </TouchableHighlight>
                {this.state.user &&
                <TouchableHighlight onPress={this.logOut.bind(this)}>
                    <Icon name="md-log-out" style={styles.iconFilter} size={18} />
                </TouchableHighlight>
                }
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

const mapDispatchToProps = dispatch => {
    return {
        open_menu: (openMenu) => dispatch(open_menu(openMenu)),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonsProfile);