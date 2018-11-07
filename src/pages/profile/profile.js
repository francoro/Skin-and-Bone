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
      isLoaded: false
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
      this.setState({isLoaded: true})
      return;
    })
  }

  logIn() {
    //TODO: facebook login api
    //is_login(true)
  }


  render() {
    return (
      <SideMenu menu={<Menu navigator={navigator} />}
        isOpen={this.props.openMenu}
        menuPosition="right"
      >
        <View>
          <View style={styles.topHeader}>
            <View style={styles.imageProfile}>
            
              { this.state.isLoaded ?
                this.props.isLogged ?
                <View>
                  <Image style={styles.userImg} style={{ width: 100, height: 100 }} source={{ uri: this.state.user.picture }} />
                  <Text style={styles.subheaderText}>{this.state.user.countPost} públicaciones, {this.state.user.countLikes} me gusta y {this.state.user.countComments} comentarios</Text>
                </View>
                :
                <View>
                  <Image style={styles.userImg} style={{ width: 100, height: 100 }} source={require("../../assets/no-user.jpg")} />
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
  },
  subheaderText: {
    color: "#fff"
  }
});