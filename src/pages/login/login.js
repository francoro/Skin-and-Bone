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
    //console.log("global", global.storage)
    //get user y guardar en localstorage POR AHORA HASTA TENER LOGIN DE FACEBOOK
    //let userId = "5ae6f3d29447830004ea5144";
    //API.getUser(userId).then((user) => {
      //console.log("user", user)
      /*storage.save({
        key: "user",
        data: null,
        expires: null
    }); */
      storage.remove({
        key: 'user'
      });

    //})
  }

  render() {
    return (
      <Text onPress={() => Actions.tabhome()}>GO to tabs</Text>
    );
  }
}