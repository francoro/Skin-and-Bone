import React, { Component } from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
export default class Login extends Component {
  render() {
    return (
      <Text onPress={() => Actions.tabhome()}>GO to tabs</Text>
    );
  }
}