import * as React from 'react';
import { Component } from 'react';
import { View } from 'react-native';
import PostsList from './postsList';
import { connect } from 'react-redux';
class HomeView extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    // para q no haga llamada de traer los datos en postlist 4 veces 1 vez por cada tab error request in progress
    if(this.props.tab === this.props.tabId) {
      return <PostsList />
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => {
  return {
    tabId: state.tabId
  }
}

export default connect(mapStateToProps, null)(HomeView);
