import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, View, Image } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from '../home/Menu';
import { connect } from 'react-redux';

const { width } = Dimensions.get('window');

class Profile extends Component {

  constructor() {
    super();
    this.state = {
      user: null
    }
  }

  componentWillMount() {
    storage.load({
      key: "user",
    }).then(data => {
      this.setState({ user: data })
    }).catch(err => {
      // leave user null
      return;
    })
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
            {this.state.user ? 
              <Image style={styles.userImg} style={{width: 100, height: 100}} source={{ uri: this.state.user.picture }} />
            : <Image style={styles.userImg} style={{width: 100, height: 100}} source={require("../../assets/no-user.jpg")} />
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
    openMenu: state.openMenu
  }
}

export default connect(mapStateToProps, null)(Profile)

const styles = StyleSheet.create({
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
  }
});