import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableHighlight } from 'react-native';
import PostsList from '../../postsList';
import TabBarFilters from '../../tabBarFilters';
import { connect } from 'react-redux';
import { fetchData } from '../../actions';

class Home extends Component {

  componentWillMount() {

    //agregar hace 1 semana, 2sem 3sem , 1 mes
    let tabId = 0;

    switch (this.props.tabId) {
      case "TAB_1":
        tabId = 0;
        break;
      case "TAB_2":
        tabId = 1;
        break;
      case "TAB_3":
        tabId = 2;
        break;
      case "TAB_4":
        tabId = 3;
        break;
    }


    this.props.fetchData(tabId);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.tabId !== this.props.tabId) {

      switch (newProps.tabId) {
        case "TAB_1":
          tabId = 0;
          break;
        case "TAB_2":
          tabId = 1;
          break;
        case "TAB_3":
          tabId = 2;
          break;
        case "TAB_4":
          tabId = 3;
          break;
      }
  
  
      this.props.fetchData(tabId);

    }
  }

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        //request more data
      }
    );
  };


  /* renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  }; */

  render() {
    // agregar Flat list component
    return (
      <View>
        <TabBarFilters />
        <PostsList posts={this.props.posts} />
      </View>
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
    fetchData: (val) => dispatch(fetchData(val))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


