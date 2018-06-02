import {combineReducers} from 'redux';
import tabBarReducer from './tabBarReducer'
import dataReducer from './dataReducer';

export default combineReducers({
    tabId: tabBarReducer,
    dataReducer
})