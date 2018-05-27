import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';
import * as actions from "./actions";
import {connect} from 'react-redux';

class TabBarFilters extends Component {
    render() {
        return (
            <View>
                <TouchableHighlight onPress={() => this.props.selected_tab('TAB_1')}>
                    <Text style={[this.props.tabsId === "TAB_1" && styles.tabSelected ]}>Todos</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.selected_tab('TAB_2')}>
                    <Text style={[this.props.tabsId === "TAB_2" && styles.tabSelected ]}>Encontrados</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.selected_tab('TAB_3')}>
                    <Text style={[this.props.tabsId === "TAB_3" && styles.tabSelected ]}>Perdidos</Text>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => this.props.selected_tab('TAB_4')}>
                    <Text style={[this.props.tabsId === "TAB_4" && styles.tabSelected ]}>En adopcion</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    tabSelected: {
        color: "red"
    }
}) 

const mapStateToProps = state => {
    return {tabsId: state.tabId}
}

export default connect(mapStateToProps, actions)(TabBarFilters);