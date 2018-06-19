import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Router, Scene, Reducer } from 'react-native-router-flux';

import Login from './src/pages/login/login';
import Home from './src/pages/home/home';
import Profile from './src/pages/profile/profile';

import Icon from 'react-native-vector-icons/Ionicons';

import { Provider } from 'react-redux';
import configureStore from './src/configureStore';
import ButtonsHome from './src/buttonsHome';

let store = configureStore();

export default class App extends Component {

  render() {

    const TabIcon = props => {
      var color = props.focused ? 'red' : 'black';
      return (
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
          <Icon style={{ color: color }} name={props.iconName} size={18} />
          <Text style={{ color: color, fontSize: 12 }}>{props.title}</Text>
        </View>
      );
    }

    return (
      <Provider store={store}>
        <Router>
          <Scene key="root" hideNavBar>
            {/* Tab Container */}
            <Scene
              key="login"
              component={Login}
              initial
            >

            </Scene>
            <Scene
              key="tabbar"
              tabs={true}
              tabBarStyle={{ backgroundColor: 'gray' }}
              tabBarPosition={'bottom'}
            >

              <Scene key="tabhome" renderRightButton={<ButtonsHome/>} title="Inicio" icon={TabIcon} iconName="md-home">
                <Scene
                  key="home"
                  component={Home}
                  title="Homee"
                />
              </Scene>


              <Scene key="tabprofile" title="Perfil" icon={TabIcon} iconName="md-person">
                <Scene
                  key="profile"
                  component={Profile}
                  title="Perfill"
                />
              </Scene>
            </Scene>
          </Scene>
        </Router>
      </Provider >
    );
  }
}
