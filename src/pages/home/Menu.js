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
  "type": 1,
  "created": "2018-05-07T20:47:15-03:00",
  "readed": 0
},
{
  "_id": "3",
  "pictureSender": "https://www.ienglishstatus.com/wp-content/uploads/2018/04/Anonymous-Whatsapp-profile-picture.jpg",
  "nameSender": "Franco Coronel",
  "userId": "5ae6f3d29447830004ea5144",
  "type": 1,
  "created": "2018-05-07T20:47:15-03:00",
  "readed": 0
}]
// hacer en el .map fijarse por type y poner el mesaje q correspone a cada type fijarse en pyh
export default class Menu extends Component {

  loadNotification() {
    return (
      notificationsData.map((data, i) => {
        <View style={styles.notificationItem} key={i}>
          <Image style={styles.userImg} source={{ uri: data.pictureSender }} />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{data.nameSender}</Text>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
          </View>
        </View>
      })
    )
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
    flex: 1,
    flexDirection: "row",
    borderBottomColor: '#F2F2F2',
    borderBottomWidth: 1,
  },
  userImg: {
    borderRadius: 50,
    width: 55,
    height: 55,
    marginLeft: 10,
    marginTop: 10
  },
  infoContainer: {
    flex: 1,
    flexDirection: "column",
    marginTop: 15
  },
  name: {
    fontWeight: "600"
  }
});
