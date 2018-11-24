import {combineReducers} from 'redux';
import tabBarReducer from './tabBarReducer'
import dataReducer from './dataReducer';
import dateFilter from './dateFilter';
import filter from './filter';
import menuReducer from './menuReducer';
import validationBody from './validationBody';
import validationPicture from './validationPicture';
import loadingToggle from './loadingToggle';
import isLogged from './isLogged'
import reloadNewPost from './reloadNewPost'

export default combineReducers({
    tabId: tabBarReducer,
    dateFilter,
    filter,
    dataReducer,
    openMenu: menuReducer,
    validationBody: validationBody,
    validationPicture: validationPicture,
    loadingToggle,
    isLogged,
    reloadNewPost
})