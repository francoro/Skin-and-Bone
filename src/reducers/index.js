import {combineReducers} from 'redux';
import tabBarReducer from './tabBarReducer'
import dataReducer from './dataReducer';
import dateFilter from './dateFilter';

export default combineReducers({
    tabId: tabBarReducer,
    dateFilter: dateFilter,
    dataReducer
})