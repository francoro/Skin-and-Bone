import {combineReducers} from 'redux';
import tabBarReducer from './tabBarReducer'
import dataReducer from './dataReducer';
import dateFilter from './dateFilter';
import filter from './filter';

export default combineReducers({
    tabId: tabBarReducer,
    dateFilter,
    filter,
    dataReducer
})