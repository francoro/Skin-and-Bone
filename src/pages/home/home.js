import React, { Component } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableHighlight, ScrollView } from 'react-native';
import PostsList from '../../postsList';
import TabBarFilters from '../../tabBarFilters';
import { connect } from 'react-redux';
import { fetchData } from '../../actions';
import { emptyData} from '../../actions';
class Home extends Component {
  constructor() {
    super();
    this.state = {
      position: 0,
      isData: true
    };
  }

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

    ///search/${type}/${filter}/${dateFilter}/${position}
    this.props.fetchData(tabId, 0, 0, 0);
  }

  componentWillReceiveProps(newProps) {
    //set state with position  0 !!!!!!!!!!!!!!!!!!
     
    if (newProps.tabId !== this.props.tabId) {

      this.setState({position: 0});

      this.props.emptyData();
      //ver duplicated key

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

      ///search/${type}/${filter}/${dateFilter}/${position}
      this.props.fetchData(tabId, 0, 0, 0);

    }
  }

  handleLoadMore = () => {
    this.setState(
      {
        position: this.state.position + 10
      },
      () => {
        
        if(this.props.posts.data.total === this.props.posts.data.posts.length) {
          console.log(1)
          return
        }
        
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

        this.props.fetchData(tabId, 0, 0, this.state.position);
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
    //fix load more not loading when iam at the bottom, it executes at scroll
    return (
      
        <View>
          <TabBarFilters />
          <Text>asd{ String(this.state.selectedTab)} </Text>
          <View>
            <FlatList
              data={this.props.posts.data.posts}
              renderItem={({ item }) => (
                <PostsList post={item} />
              )}
              keyExtractor={item => item._id}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={50}
            />
          </View>
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
    fetchData: (type, filter, dateFilter, position) => dispatch(fetchData(type, filter, dateFilter, position)),
    emptyData: () => dispatch(emptyData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)


