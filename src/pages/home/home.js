import * as React from 'react';
import { Component } from 'react';
import { View, Text, Image, Dimensions, FlatList, ListView, ActivityIndicator, TouchableHighlight, StyleSheet } from 'react-native';
import TabBarFilters from '../../tabBarFilters';
import { connect } from 'react-redux';
import { fetchData } from '../../actions';
import { emptyData } from '../../actions';
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

class Home extends Component {
  constructor() {
    super();
    this.state = {
      position: 0,
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

  render() {
    return (

      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
          third: ThirdRoute,
          four: FourRoute,
          five: FiveRoute
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
      />
    )
  }
}

const mapStateToProps = state => {
  return {
    posts: state.dataReducer,
    tabId: state.tabId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchData: (type, filter, dateFilter, position) => dispatch(fetchData(type, filter, dateFilter, position)),
    emptyData: () => dispatch(emptyData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


