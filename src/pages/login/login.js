import React, { Component } from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
export default class Login extends Component {
  
componentWillMount() {
  var storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true,
  })
  global.storage = storage;
  Actions.tabhome()
}
render() {
  return (
    <Text onPress={() => Actions.tabhome()}>GO to tabs</Text>
  );
}
}