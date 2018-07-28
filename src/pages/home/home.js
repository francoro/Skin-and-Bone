import * as React from 'react';
import { Component } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import HomeView from '../../homeView.js';
import * as actions from "../../actions";
import { connect } from 'react-redux';
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';

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

const FiveRoute = () => (
  <HomeView tab={4}/>
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
        { key: 'four', title: 'Adopción' },
        { key: 'five', title: 'Seguidos' },
      ]
    };
  }

  componentWillMount() {
    console.log(1)
    this.props.open_menu(false);
    console.log(2)
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

  _handleIndexChange = index => {
    this.props.selected_tab(index);
    this.setState({
      index,
    });
  }



  render() {
    return (
      <SideMenu menu={<Menu navigator={navigator} />}
        isOpen={this.props.openMenu}
        menuPosition="right"
      >
        <TabView
          navigationState={this.state}
          renderTabBar={this._renderTabBar}
          renderScene={this._renderScene}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
      </SideMenu>
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

const mapStateToProps = state => {
  return {
    openMenu: state.openMenu
  }
}

export default connect(mapStateToProps, actions)(Home);

