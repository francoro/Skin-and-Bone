import {combineReducers} from 'redux';
import postsReducer from './postsReducer'
import tabBarReducer from './tabBarReducer'
import dataReducer from './dataReducer'

export default combineReducers({
    posts: postsReducer,
    tabId: tabBarReducer,
    dataReducer
})