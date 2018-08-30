import React from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  Text,
} from 'react-native';

import { Component } from 'react';
import { connect } from 'react-redux';
import * as API from '../../api';

const window = Dimensions.get('window');

class Menu extends Component {
  constructor() {
    super();
    this.state = {
      notificationsData: []
    }
  }

  componentWillMount() {
    storage.load({
      key: "user",
    }).then(data => {
      let userId = data.id;

      API.getNotifications(userId).then(res => {
        this.setState({ notificationsData: res[1] });
      })
        .catch((err) => console.log("Fetch notifications catch", err))
    }).catch(err => {
      console.log("no user guardado sidebar")
      //PONER CARTEL TE DEBES LOGIAR PARA RECIBIR NOTIFICACIONES
      return;
    })
  }

  loadNotification() {
    return this.state.notificationsData.map((data, i) => {
      let typeMessage;
      switch (data.type) {
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
      <View style={this.props.openMenu ? styles.menu : styles.hideMenu}>
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
  hideMenu: {
    display: "none"
  },
  menu: {
    display: "flex",
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

const mapStateToProps = state => {
  return {
    openMenu: state.openMenu
  }
}

export default connect(mapStateToProps, null)(Menu);
