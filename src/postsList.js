import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {fetchData} from './actions';

class PostsList extends Component {

    componentWillMount() {
        this.props.fetchData();
    }

    getTvShows() {
        
        const {dataTvMaze} = this.props;
        return dataTVShow = dataTvMaze.data.map((tv, key) => {
            return <Text key={key}>{tv.show.name}</Text>
        })
    }

    render() {
        // see bookmark chrome canary update component
        return (
            <View>
                
                <Text>{this.props.tabId}</Text>
                {this.props.dataTvMaze.isFetching && <Text> Loading </Text>}
                {
                    this.props.dataTvMaze.data.length ?
                        this.getTvShows()
                    : null
                }
            </View>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        dataTvMaze: state.dataReducer,
        tabId: state.tabId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchData: () => dispatch(fetchData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsList)