import React, { Component } from 'react';
import { Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import * as API from '../../api';
export default class Login extends Component {

  //hacer llamda newUser
  // guardar en localstorage user
  //despues en postList traer de localstorage
  componentWillMount() {
    var storage = new Storage({
      size: 1000,
      storageBackend: AsyncStorage,
      defaultExpires: null,
      enableCache: true,
    })
    global.storage = storage;
    //get user y guardar en localstorage POR AHORA HASTA TENER LOGIN DE FACEBOOK
    let userId = "5ae312c8b8df4100041a14c6";
    API.getUser(userId).then((user) => {
      storage.save({
        key: "user",
        data: user,
        expires: null
      });
      Actions.tabhome()
    })

    //CHECKEAR SI ESTA EN LOCALSTORAGE DIRIGUIR A TABHOME DE UNA
    
  }
  render() {
    return (
      <Text onPress={() => Actions.tabhome()}>GO to tabs</Text>
    );
  }
}