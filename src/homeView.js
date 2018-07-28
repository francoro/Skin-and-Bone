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
    console.log("this.props.tab",this.props.tab)
    console.log("this.props.tabId",this.props.tabId)
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
