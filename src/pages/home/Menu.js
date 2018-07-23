import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

import { Component } from 'react';

const window = Dimensions.get('window');

const notificationsData = [{
  "_id": "1",
  "pictureSender": "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg",
  "nameSender": "Franco Desarrollador",
  "userId": "5ae6f3d29447830004ea5144",
  "type": 1,
  "created": "2018-05-07T20:47:15-03:00",
  "readed": 0
},
{
  "_id": "2",
  "pictureSender": "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg",
  "nameSender": "Franco Nicolas",
  "userId": "5ae6f3d29447830004ea5144",
  "type": 2,
  "created": "2018-05-07T20:47:15-03:00",
  "readed": 0
},
{
  "_id": "3",
  "pictureSender": "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg",
  "nameSender": "Franco Coronel",
  "userId": "5ae6f3d29447830004ea5144",
  "type": 3,
  "created": "2018-05-07T20:47:15-03:00",
  "readed": 0
}]
// hacer en el .map fijarse por type y poner el mesaje q correspone a cada type fijarse en pyh
export default class Menu extends Component {

  loadNotification() {

     return notificationsData.map((data, i) => {
      let typeMessage; 
      switch(data.type){
        case 1: 
          typeMessage = " te ha empezado a seguir.";
          break;
        case 2:
          typeMessage = " ha comentado tu publicación.";
          break;
        case 3: 
          typeMessage = " ha respondido a tu comentario.";
       }
      return (
        <View style={styles.notificationItem} key={data._id}>
          <Image style={styles.userImg} source={{ uri: data.pictureSender }} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{data.nameSender}</Text>
            <Text style={styles.description}>{typeMessage}</Text>
          </View>
        </View>
      )
    })
  }

  render() {
    return (
      <View style={styles.menu}>
        <View style={styles.topHeader}>
          <Text style={styles.title}>Notificaciones</Text>
        </View>
        <View>
          {this.loadNotification()}
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#FFF',
    elevation: 5
  },
  topHeader: {
    borderBottomColor: '#F5DA49',
    borderBottomWidth: 4,
    padding: 20
  },
  title: {
    fontWeight: "600"
  },
  notificationsContainer: {

  },
  notificationItem: {
    flexDirection: "row",
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  userImg: {
    borderRadius: 50,
    width: 55,
    height: 55,
    marginLeft: 5,
    marginTop: 10,
    marginRight: 0
  },
  infoContainer: {
    marginTop: 15,
    marginLeft: 10,
    flex: 1,
    flexDirection: "column"
  },
  name: {
    fontWeight: "600"
  },
  description: {
    position: "relative",
    right: 3
  }
});
