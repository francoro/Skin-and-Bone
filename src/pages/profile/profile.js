import React, { Component } from 'react';
import { Text, StyleSheet, Dimensions, TouchableHighlight, View, Image, ActivityIndicator, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from '../home/Menu';
import { connect } from 'react-redux';
import * as API from '../../api/index';
import { is_logged } from "../../actions";
import { facebookLogin } from '../../api/facebookLogin';
import PostItem from '../../postItem';
import Icon from 'react-native-vector-icons/Ionicons';
const { width, height } = Dimensions.get('window');

export default class Profile extends Component {

  constructor() {
    super();
    this.state = {
      user: null,
      isLoaded: false,
      isLoadedMyPosts: false,
      tabSelected: 1,
      myPosts: [],
      favoritesPosts: [],
      isOpen: false
    }
    this.removePost = this.removePost.bind(this);
    this.logIn = this.logIn.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  logOut() {
    storage.remove({
      key: 'user'
    });
    this.setState({ myPosts: [], user: null })
  }

  componentWillMount() {
    this.getDataUser();
  }

  getDataUser() {
    storage.load({
      key: "user",
    }).then(userLocal => {
      console.log("entro get dta user")
      //Para tener la ultima informacion en los contadores
      API.getUser(userLocal._id).then((data) => {
        this.setState({ user: data[1], isLoaded: true })
      })
      API.getPostsByUser(userLocal._id).then((data) => {
        this.setState({ myPosts: data, isLoadedMyPosts: true })
      })
    }).catch(err => {
      // leave user null
      console.log("err", err)
      this.setState({ isLoaded: true, isLoadedMyPosts: true })
      return;
    })
  }

  logIn() {
    facebookLogin().then((data) => {
      this.setState({ isLoaded: false, isLoadedMyPosts: false })
      this.getDataUser();
    })
  }

  changeTab(value) {
    switch (value) {
      case 1:
        this.setState({ tabSelected: 1 })
        break;
      case 2:
        this.setState({ tabSelected: 2 })
        storage.load({
          key: "favorites",
        }).then(favs => {
          console.log("favss", favs)
          if (favs && favs.length) {
            this.setState({ favoritesPosts: favs });
          } else {
            this.setState({ favoritesPosts: null });
          }
        }).catch(err => {
          this.setState({ favoritesPosts: null });
          return;
        })
        break;
    }
  }

  removedFav() {
    storage.load({
      key: "favorites",
    }).then(favs => {
      if (favs && favs.length) {
        console.log(favs)
        this.setState({ favoritesPosts: favs });
      } else {
        this.setState({ favoritesPosts: null });
      }
    }).catch(err => {
      this.setState({ favoritesPosts: null });
      return;
    })
  }

  removePost(itemId, userId) {
    let cloneState = Object.assign({}, this.state);
    let newArray = cloneState.myPosts.filter((item, index) => item._id !== itemId);
    API.removePost(itemId, userId).then((result) => {
      this.setState({ myPosts: newArray })
    }).catch((err) => {
      console.log("err removing", err)
    })

  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }


  render() {
    let arrayCounters = [];
    if (this.state.isLoaded && this.state.user) {
      if (this.state.user.countPost > 0)
        arrayCounters.push(this.state.user.countPost + " públicaciones");

      if (this.state.user.countLikes > 0)
        arrayCounters.push(this.state.user.countLikes + " me gusta");

      if (this.state.user.countComments > 0)
        arrayCounters.push(this.state.user.countComments + " comentarios");

      arrayCounters = arrayCounters.join(",");

    }


    return (
      
      <SideMenu menuPosition="right" menu={<Menu isOpen={this.state.isOpen} isLogged={this.state.user} />} isOpen={this.state.isOpen} onChange={isOpen => this.updateMenuState(isOpen)}>
        <ScrollView>
        <View>
          <View style={styles.header}>
            <View style={styles.containerIcons}>
              <TouchableHighlight onPress={this.toggle}>
                <Icon name="md-notifications" style={styles.iconFilter} size={18} />
              </TouchableHighlight>
              <TouchableHighlight onPress={this.logOut.bind(this)}>
                <Icon name="md-log-out" style={styles.iconFilter} size={18} />
              </TouchableHighlight>
            </View>
          </View>
          
            <View>
              <View style={styles.topHeader}>
                <View style={styles.imageProfile}>

                  {this.state.isLoaded ?
                    this.state.user ?
                      <View>
                        <View style={styles.imgContainer} style={{ alignItems: "center", marginBottom: 20 }}>
                          <Image style={styles.userImg} style={{ width: 100, height: 100, borderRadius: 50 }} source={{ uri: "data:image/png;base64," + this.state.user.picture }} />
                        </View>
                        <Text style={styles.name}>{this.state.user.name}</Text>
                        <Text style={styles.subheaderText}>{arrayCounters}</Text>
                      </View>
                      :
                      <View>
                        <View style={styles.imgContainer} style={{ alignItems: "center", marginBottom: 20 }}>
                          <Image style={styles.userImg} style={{ width: 100, height: 100, borderRadius: 50 }} source={require("../../assets/no-user.jpg")} />
                        </View>
                        <TouchableOpacity onPress={this.logIn}>
                          <Text style={styles.subheaderText}>Iniciar sesión</Text>
                        </TouchableOpacity>
                      </View>
                    : null}

                  {!this.state.isLoaded &&
                    <View style={styles.loading}>
                      <ActivityIndicator size="large" color="#F5DA49" />
                    </View>
                  }
                </View>
              </View>
              <View style={styles.tabsContainer}>
                <TouchableOpacity onPress={() => this.changeTab(1)} style={[styles.tab, this.state.tabSelected === 1 && styles.tabSelected]}>
                  <Text style={styles.tabText}>PÚBLICACIONES</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.changeTab(2)} style={[styles.tab, this.state.tabSelected === 2 && styles.tabSelected]}>
                  <Text style={styles.tabText}>FAVORITOS</Text>
                </TouchableOpacity>
              </View>

              <View>
                {!this.state.isLoadedMyPosts &&
                  <View style={styles.loadingPosts}>
                    <ActivityIndicator size="large" color="#F5DA49" />
                  </View>
                }

                {this.state.isLoadedMyPosts && this.state.tabSelected === 1 && !!this.state.myPosts.length &&
                  <FlatList
                    data={this.state.myPosts}
                    renderItem={({ item, separators }) => (
                      <PostItem key={item._id} item={item} isTabMyPosts={true} removePost={(itemId, userId) => this.removePost(itemId, userId)} />

                    )}
                    keyExtractor={item => item._id}
                    onEndReachedThreshold={0.5}
                  />
                }

                {this.state.isLoadedMyPosts && this.state.myPosts.length === 0 && this.state.tabSelected === 1 &&
                  <View style={styles.noPosts}>
                    <Icon name="md-alert" size={40} />
                    <Text style={styles.textNoPosts}> {!this.state.user ? "Necesitas iniciar sesión" : "No tienes públicaciones"}</Text>
                  </View>
                }

                {this.state.isLoadedMyPosts && this.state.tabSelected === 2 && this.state.favoritesPosts &&
                  <FlatList
                    data={this.state.favoritesPosts}
                    renderItem={({ item, separators }) => (
                      <PostItem key={item._id} item={item} isTabFavorites={true} removedFav={this.removedFav.bind(this)} />

                    )}
                    keyExtractor={item => item._id}
                    onEndReachedThreshold={0.5}
                  />
                }

                {this.state.isLoadedMyPosts && !this.state.favoritesPosts && this.state.tabSelected === 2 &&
                  <View style={styles.noPosts}>
                    <Icon name="md-alert" size={40} />
                    <Text style={styles.textNoPosts}> No tienes favoritos</Text>
                  </View>
                }
              </View>
            </View>
        </View>
      </ScrollView>

      </SideMenu>

    );
  }
}


const styles = StyleSheet.create({
  header: {
    height: 50,
    backgroundColor: "#000"
  },
  containerIcons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center"
  },
  iconFilter: {
    color: "#FFF",
    fontSize: 22,
    marginRight: 15
  },
  noPosts: {
    alignItems: 'center',
    position: "relative",
    marginTop: 50
  },
  textNoPosts: {
    marginTop: 20,
    fontSize: 20
  },
  name: {
    fontSize: 18,
    color: "#FFF",
    marginBottom: 5
  },
  tabText: {
    color: "#262628",
    fontSize: 20
  },
  tabsContainer: {
    width: width,
    flexDirection: "row",
    marginBottom: 10
  },
  tab: {
    width: width / 2,
    backgroundColor: "#FFF",
    alignItems: "center",
    paddingVertical: 15
  },
  tabSelected: {
    borderBottomColor: '#F5DA49',
    borderBottomWidth: 4
  },
  loadingPosts: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.5,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  topHeader: {
    backgroundColor: "#262628",
    width: width,
    height: 200
  },
  imageProfile: {
    justifyContent: "center",
    alignItems: "center",
    height: 200
  },
  userImg: {
    borderRadius: 50,
    alignItems: "center"
  },
  subheaderText: {
    color: "#fff"
  },
  imgContainer: {

  }
});