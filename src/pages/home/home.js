import * as React from 'react';
import { Component } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import HomeView from '../../homeView.js';
import {selected_tab} from "../../actions";
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const FirstRoute = () => (
  <HomeView tab={0}/>
);
const SecondRoute = () => (
  <HomeView tab={1}/>
);

const ThirdRoute = () => (
  <HomeView tab={2}/>
);

const FourRoute = () => (
  <HomeView tab={3}/>
);


class Home extends Component {
  constructor() {
    super();
    this.state = {
      isData: true,
      index: 0,
      routes: [
        { key: 'first', title: 'Todos' },
        { key: 'second', title: 'Encontrados' },
        { key: 'third', title: 'Perdidos' },
        { key: 'four', title: 'Adopción' }
      ]
    };
  }


  _renderTabBar = props => (
    <TabBar
      {...props}
      scrollEnabled
      indicatorStyle={styles.indicator}
      style={styles.tabbar}
      tabStyle={styles.tab}
      labelStyle={styles.label}
    />
  );

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
    four: FourRoute
  })

  _handleIndexChange = index => {
    this.props.selected_tab(index);
    this.setState({
      index,
    });
  }



  render() {
    return (
        <TabView
          navigationState={this.state}
          renderTabBar={this._renderTabBar}
          renderScene={this._renderScene}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabbar: {
    backgroundColor: '#262628',
  },
  tab: {
    width: 150,
  },
  indicator: {
    backgroundColor: '#F5DA49',
  },
  label: {
    color: '#fff',
    fontWeight: '400',
  },
});


const mapDispatchToProps = dispatch => {
  return {
      selected_tab: (tabId) => dispatch(selected_tab(tabId))
  }
}

export default connect(null, mapDispatchToProps)(Home);

