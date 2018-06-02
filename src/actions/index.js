import {FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE} from "../constants"
import getDataApi from '../api';
export const selected_tab = (tabId) => {
    return {
        type: 'selected_tab',
        payload: tabId
    }
}

export const getData = () => {
    return {
        type: 'FETCHING_DATA'
    }
}


export const getDataSuccess = (newData, initialData = null) => {
    return {
        type: 'FETCHING_DATA_SUCCESS',
        newData,
        initialData
    }
}

export const getDataFailure = () => {
    return {
        type: 'FETCHING_DATA_FAILURE'
    }
}

export const fetchData = (type, filter, dateFilter, position) => {
    return (dispatch, getState) => {
        const state = getState();
        //console.log("STATE INITIAL DATA",state)
        
        dispatch(getData())
        getDataApi(type, filter, dateFilter, position)
            .then(([response, json]) => {
                if(state.dataReducer.data.length === 0) {
                    dispatch(getDataSuccess(json))    
                } else {
                    dispatch(getDataSuccess(json,state.dataReducer.data))
                }
                
            
            })
            .catch((err) => console.log(err))
    }
}