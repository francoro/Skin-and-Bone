import React, { Component } from 'react';
import { Text } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from '../home/Menu';
export default class Home extends Component {
  render() {
    return (
      <SideMenu menu={<Menu navigator={navigator} />}
        isOpen={this.props.openMenu}
        menuPosition="right"
      >
        <Text>Profile</Text>
      </SideMenu>
    );
  }
}