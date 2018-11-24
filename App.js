import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Router, Scene, Reducer } from 'react-native-router-flux';

import Login from './src/pages/login/login';
import Home from './src/pages/home/home';
import Profile from './src/pages/profile/profile';
import NewPost from './src/pages/new-post/newPost';
import Detail from './src/pages/detail/detail';

import Icon from 'react-native-vector-icons/Ionicons';

import { Provider } from 'react-redux';
import configureStore from './src/configureStore';
import ButtonsHome from './src/buttonsHome';
import ButtonsProfile from './src/buttonsProfile';
import ButtonsNewPost from './src/buttonsNewPost';
import { Actions } from 'react-native-router-flux';

let store = configureStore();

export default class App extends Component {

  render() {

    const TabIcon = props => {
      var color = props.focused ? '#FFF' : '#B9B9B9';
      return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
          <Icon style={{ color: color }} name={props.iconName} size={25} />
        </View>
      );
    }

    return (
      <Provider store={store}>
        <Router navigationBarStyle={{ backgroundColor: '#262628' }} titleStyle={{ color: "#FFF" }}>
          <Scene key="root" hideNavBar>
            <Scene
              key="login"
              component={Login}
              initial
              hideNavBar
            />

            <Scene
              key="newPost"
              component={NewPost}
              hideNavBar={false}
              renderRightButton={<ButtonsNewPost/>}
              navBarButtonColor='#fff'
            />



            <Scene
              key="detail"
              component={Detail}
              hideNavBar={false}
              navBarButtonColor='#fff'
              renderBackButton={() => { }}
            />


            <Scene
              key="tabbar"
              tabs={true}
              tabBarStyle={{ backgroundColor: '#262628' }}
              tabBarPosition={'bottom'}
              showLabel={false}
              hideNavBar
            >

              <Scene key="tabhome" component={Home} renderRightButton={<ButtonsHome />} title="Piel y Hueso" icon={TabIcon} iconName="md-home" />
              <Scene key="tabprofile" component={Profile} renderRightButton={<ButtonsProfile />} title="Piel y Hueso" icon={TabIcon} iconName="md-person" />
            </Scene>
          </Scene>
        </Router>
      </Provider >
    );
  }
}
