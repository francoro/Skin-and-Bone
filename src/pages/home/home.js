import React, { Component } from 'react';
import { View, Text, FlatList, ListView, ActivityIndicator, TouchableHighlight, StyleSheet } from 'react-native';
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
     
    if (newProps.tabId !== this.props.tabId) {

      this.setState({position: 0});

      this.props.emptyData();

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

      /* <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View> */
    

  render() { 
    return (
      
        <View>
          {/* <TabBarFilters />
          <View>
          {this.props.posts.isFetching && !this.props.posts.isFetchingLoadMore ? <Text> Loading initial... </Text> : <Text>Load initial</Text>} 
          </View>
          <View>
            {this.props.posts.isFetchingLoadMore  ? <Text> Loading more.. </Text> : null}
          </View> */}
          {/* <View style={styles.navBar}>
            <Text style={styles.leftContainer}>#30 RESULTADOS</Text>
            <Text style={styles.rightContainer}>Mas recientes</Text>
          </View> */}
          <View>
            <FlatList
              data={this.props.posts.data.posts}
              renderItem={({ item }) => (
                <PostsList post={item} />
              )}
              keyExtractor={item => item._id}
              onEndReached={this.handleLoadMore}
              onEndReachedThreshold={0.5}
              
            />
          </View>
        </View>
      
    )
  }
}

const styles = StyleSheet.create({
  navBar: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  rightContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})

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


