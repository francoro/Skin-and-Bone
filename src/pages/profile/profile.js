import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, View, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from '../home/Menu';
import { connect } from 'react-redux';
import * as API from '../../api/index';

const { width } = Dimensions.get('window');

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      isLoaded: false,
      tabSelected: 1
    }
  }

  componentWillMount() {
    this.isLoaded = false;
    storage.load({
      key: "user",
    }).then(userLocal => {
      //Para tener la ultima informacion en los contadores
      API.getUser(userLocal._id).then((data) => {
        this.setState({ user: data[1], isLoaded: true })
      })
    }).catch(err => {
      // leave user null
      this.setState({ isLoaded: true })
      return;
    })
  }

  logIn() {
    //TODO: facebook login api
    //is_login(true)
  }

  changeTab(value) {
    switch (value) {
      case 1:
        this.setState({ tabSelected: 1 })
        //buscar llamada get posts by userId, si no tienes posts mostrar cartel no hay, pero si no esta logeado, un debes logiarte
        break;
      case 2:
        this.setState({ tabSelected: 2 })
        //get favorites local storage y poner en this.state.posts y armar flatlist usando el mismo state.posts para los 2
        // agregar un loading a los tabs,
        // mostrar cartel no tienes favoritos
        break;
    }
  }


  render() {
    let arrayCounters = [];
    if (this.state.isLoaded && this.props.isLogged) {
      if (this.state.user.countPost > 0)
        arrayCounters.push(this.state.user.countPost + " públicaciones");

      if (this.state.user.countLikes > 0)
        arrayCounters.push(this.state.user.countLikes + " me gusta");

      if (this.state.user.countComments > 0)
        arrayCounters.push(this.state.user.countComments + " comentarios");

      arrayCounters = arrayCounters.join(",");

    }



    return (
      <SideMenu menu={<Menu navigator={navigator} />}
        isOpen={this.props.openMenu}
        menuPosition="right"
      >
        <View>
          <View style={styles.topHeader}>
            <View style={styles.imageProfile}>

              {this.state.isLoaded ?
                this.props.isLogged ?
                  <View>
                    <View style={styles.imgContainer} style={{ alignItems: "center", marginBottom: 20 }}>
                      <Image style={styles.userImg} style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: this.state.user.picture }} />
                    </View>
                    <Text style={styles.name}>{this.state.user.name}</Text>
                    <Text style={styles.subheaderText}>{arrayCounters}</Text>
                  </View>
                  :
                  <View>
                    <View style={styles.imgContainer} style={{ alignItems: "center", marginBottom: 20 }}>
                      <Image style={styles.userImg} style={{ width: 100, height: 100, borderRadius: 50 }} source={require("../../assets/no-user.jpg")} />
                    </View>
                    <TouchableOpacity onPress={this.logIn}>
                      <Text style={styles.subheaderText}>Iniciar sesión</Text>
                    </TouchableOpacity>
                  </View>
                : null}

              {!this.state.isLoaded &&
                <View style={styles.loading}>
                  <ActivityIndicator size="large" color="#F5DA49" />
                </View>
              }
            </View>
          </View>
          <View style={styles.tabsContainer}>
            <TouchableOpacity onPress={() => this.changeTab(1)} style={[styles.tab, this.state.tabSelected === 1 && styles.tabSelected]}>
              <Text style={styles.tabText}>PÚBLICACIONES</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.changeTab(2)} style={[styles.tab, this.state.tabSelected === 2 && styles.tabSelected]}>
              <Text style={styles.tabText}>FAVORITOS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SideMenu>
    );
  }
}

const mapStateToProps = state => {
  return {
    openMenu: state.openMenu,
    isLogged: state.isLogged
  }
}

export default connect(mapStateToProps, null)(Profile)

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 5
  },
  tabText: {
    color: "#262628",
    fontSize: 20
  },
  tabsContainer: {
    width: width,
    flexDirection: "row"
  },
  tab: {
    width: width / 2,
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingVertical: 15
  },
  tabSelected: {
    borderBottomColor: '#F5DA49',
    borderBottomWidth: 4
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topHeader: {
    backgroundColor: "#262628",
    width: width,
    height: 200
  },
  imageProfile: {
    justifyContent: "center",
    alignItems: "center",
    height: 200
  },
  userImg: {
    borderRadius: 50,
    alignItems: "center"
  },
  subheaderText: {
    color: "#fff"
  },
  imgContainer: {

  }
});