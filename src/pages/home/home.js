import * as React from 'react';
import { Component } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import  PostsList  from '../../postsList';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
  <View>
    <PostsList />
  </View>
);
const SecondRoute = () => (
  <View style={[{ backgroundColor: '#673ab7' }]} />
);

const ThirdRoute = () => (
  <View style={[{ backgroundColor: '#673ab7' }]} />
);

const FourRoute = () => (
  <View style={[{ backgroundColor: '#673ab7' }]} />
);

const FiveRoute = () => (
  <View style={[{ backgroundColor: '#673ab7' }]} />
);

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

 export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      isData: true,
      index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
        { key: 'third', title: 'Third' },
        { key: 'four', title: 'Four' },
        { key: 'five', title: 'Five' },
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
    four: FourRoute,
    five: FiveRoute
  })

  _handleIndexChange = index =>
  this.setState({
    index,
  });

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
    backgroundColor: '#3f51b5',
  },
  tab: {
    width: 120,
  },
  indicator: {
    backgroundColor: '#ffeb3b',
  },
  label: {
    color: '#fff',
    fontWeight: '400',
  },
});

