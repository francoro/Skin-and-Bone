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


export const reload_new_post = (reloadPost) => {
    return {
        type: 'reload_new_post',
        payload: reloadPost
    }
}

export const validation_body = (validationBody) => {
    return {
        type: 'validation_body',
        payload: validationBody
    }
}

export const validation_picture = (validationPicture) => {
    return {
        type: 'validation_picture',
        payload: validationPicture
    }
}

export const loading_toggle = (loadingToggle) => {
    return {
        type: 'loading_toggle',
        payload: loadingToggle
    }
}

export const open_menu = (menuOpen) => {
    return {
        type: 'open_menu',
        payload: menuOpen
    }
}

export const is_logged = (isLogged) => {
    return {
        type: 'is_logged',
        payload: isLogged
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
        return new Promise((resolve, reject) => {
            const state = getState();
            //console.log("STATE ACTION INDEx", state)
            //console.log("!!!!!!state.dataReducer.data!!!!",state.dataReducer.data)
            dispatch(getData())
            API.getPosts(type, filter, dateFilter, position)
                .then(res => {
                    console.log("RES", res[1])
                    if (res !== false) {
                        
                        if (state.dataReducer.data.length === 0) {
                            dispatch(getDataSuccess(res[1]))
                            resolve(res[1])
                            
                        } else {
                            
                           dispatch(getDataSuccess(res[1], state.dataReducer.data))
                           let arrayDataConcat = { posts: state.dataReducer.data.posts.concat(res[1].posts), total: state.dataReducer.data.total};
                           resolve(arrayDataConcat);
                        }

                    }

                })
                .catch((err) => console.log("Fetch posts catch", err))
       })
    }

}

export const emptyData = () => {
    return (dispatch) => {
        dispatch(emptyDataStore())
    }
}