import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE } from "../constants"
import * as API from '../api';

export const selected_tab = (tabId) => {
    return {
        type: 'selected_tab',
        payload: tabId
    }
}

export const selected_date_filter = (dateFilterId) => {
    return {
        type: 'selected_date_filter',
        payload: dateFilterId
    }
}

export const selected_filter = (filterId) => {
    return {
        type: 'selected_filter',
        payload: filterId
    }
}

export const open_menu = (menuOpen) => {
    return {
        type: 'open_menu',
        payload: menuOpen
    }
}

export const getData = () => {
    return {
        type: FETCHING_DATA
    }
}


export const getDataSuccess = (newData, initialData = null) => {
    return {
        type: FETCHING_DATA_SUCCESS,
        newData,
        initialData
    }
}

export const getDataFailure = () => {
    return {
        type: FETCHING_DATA_FAILURE
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

        dispatch(getData())
        API.getPosts(type, filter, dateFilter, position)
            .then(res => {
                console.log("RES", res)
                if (res !== false) {
                    console.log("entro")
                    if (state.dataReducer.data.length === 0) {
                        dispatch(getDataSuccess(res[1]))
                    } else {
                        dispatch(getDataSuccess(res[1], state.dataReducer.data))
                    }

                }

            })
            .catch((err) => console.log("Fetch posts catch", err))
    }
}

export const emptyData = () => {
    return (dispatch) => {
        dispatch(emptyDataStore())
    }
}