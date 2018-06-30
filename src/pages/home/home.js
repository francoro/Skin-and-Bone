import * as React from 'react';
import { Component } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import  PostsList  from '../../postsList';
import * as actions from "../../actions";
import {connect} from 'react-redux';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const FirstRoute = () => (
  <View>
    <PostsList/>
  </View>
);

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

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
        { key: 'four', title: 'Adopción' },
        { key: 'five', title: 'Seguidos' },
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
    second: FirstRoute,
    third: FirstRoute,
    four: FirstRoute,
    five: FirstRoute
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

export default connect(null, actions)(Home);

