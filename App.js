import React, { Component } from 'react';
import { Text } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';

import Login from './src/pages/login/login';
import Home from './src/pages/home/home';
import Profile from './src/pages/profile/profile';

export default class App extends Component {
  render() {
    return (
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
            tabBarStyle={{ backgroundColor: 'red' }}
            tabBarPosition={'bottom'}
          >
            {/* Tab and it's scenes */}
            <Scene key="tabhome" title="Inicio">
              <Scene
                key="home"
                component={Home}
                title="Homee"
              />
            </Scene>

            {/* Tab and it's scenes */}
            <Scene key="tabprofile" title="Perfil">
              <Scene
                key="profile"
                component={Profile}
                title="Perfill"
              />
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}
