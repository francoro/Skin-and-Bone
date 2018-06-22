import * as React from 'react';
import { Component } from 'react';
import { View, Image, FlatList, ListView, Text } from 'react-native';
import { connect } from 'react-redux';
import { fetchData } from './actions';
import { emptyData } from './actions';

var data = [
    {
        "id": 1,
        "profile_picture": {
            "href": "https://www.kimballstock.com/pix/DOG/01/DOG_01_RK0410_01_P.JPG"
        }
    },
    {
        "id": 2,
        "profile_picture": {
            "href": "https://www.kimballstock.com/pix/DOG/01/DOG_01_RK0410_01_P.JPG"
        }
    },
    {
        "id": 3,
        "profile_picture": {
            "href": "https://www.kimballstock.com/pix/DOG/01/DOG_01_RK0410_01_P.JPG"
        }
    },
    {
        "id": 4,
        "profile_picture": {
            "href": "https://www.kimballstock.com/pix/DOG/01/DOG_01_RK0410_01_P.JPG"
        }
    },
    {
        "id": 5,
        "profile_picture": {
            "href": "https://www.kimballstock.com/pix/DOG/01/DOG_01_RK0410_01_P.JPG"
        }
    },
    {
        "id": 6,
        "profile_picture": {
            "href": "https://www.kimballstock.com/pix/DOG/01/DOG_01_RK0410_01_P.JPG"
        }
    }

];

class PostsList extends Component {
    constructor() {
        super();
        this._data = [];
        this.state = {
            position: 0,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        }
        
    }

    componentDidMount() {
        this.setState({
            dataSource: this.getDataSource(data)
        });
    }

    componentWillMount() {


        if (this.props.tab === this.props.tabId) {
            this.props.emptyData();
            ///search/${type}/${filter}/${dateFilter}/${position}
            this.props.fetchData(this.props.tabId, 0, this.props.dateFilter, 0);
        }
    }

    componentWillReceiveProps(newProps) {

        if (newProps.dateFilter !== this.props.dateFilter || newProps.tabId !== this.props.tabId && this.props.tab === newProps.tabId) {
            this.setState({ position: 0 });

            this.props.emptyData();

            this.props.fetchData(newProps.tabId, 0, newProps.dateFilter, 0);
        }
    }

    handleLoadMore = () => {
        this.setState(
            {
                position: this.state.position + 10
            },
            () => {
                if (this.props.posts.data.total === this.props.posts.data.posts.length) {
                    console.log(1)
                    return
                }
                console.log(this.state.position, this.state.position)
                this.props.fetchData(this.props.tabId, 0, this.props.dateFilter, this.state.position);
            }
        );
    };

    renderRow(item) {
        return (
            <View>
                <Text>{item.id} </Text>
                <Image style={{width: 80, height: 80}} source={{uri: item.profile_picture.href}}/>
            </View>
        );
    }

    onEndReached() {
        alert(1)
        //called multiple times
        /* this.setState({
            dataSource: this.getDataSource(data)
        }); */
    }

    getDataSource(users) {
        this._data = this._data.concat(users);
        return this.state.dataSource.cloneWithRows(this._data);
    }


    render() {
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    onEndReached={this.onEndReached}
                />

            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.dataReducer,
        tabId: state.tabId,
        dateFilter: state.dateFilter
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: (type, filter, dateFilter, position) => dispatch(fetchData(type, filter, dateFilter, position)),
        emptyData: () => dispatch(emptyData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)

