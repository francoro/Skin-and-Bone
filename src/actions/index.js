import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from "../constants"
import getDataApi from '../api';
export const selected_tab = (tabId) => {
    return {
        type: 'selected_tab',
        payload: tabId
    }
}

export const getData = (isLoadMore = null) => {
    return {
        type: 'FETCHING_DATA',
        isLoadMore
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

export const emptyDataStore = () => {
    return {
        type: 'EMPTY_DATA'
    }
}

export const fetchData = (type, filter, dateFilter, position) => {
    return (dispatch, getState) => {
        const state = getState();
        if (state.dataReducer.data.length === 0) {
            dispatch(getData())
        } else {
            dispatch(getData(1))
        }
        getDataApi(type, filter, dateFilter, position)
            .then(([response, json]) => {
                console.log("JSON", json)

                if (state.dataReducer.data.length === 0) {
                    dispatch(getDataSuccess(json))
                } else {
                    dispatch(getDataSuccess(json, state.dataReducer.data))
                }


            })
            .catch((err) => console.log(err))
    }
}

export const emptyData = () => {
    return (dispatch) => {
        dispatch(emptyDataStore())
    }
}