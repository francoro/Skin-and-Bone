import { FETCHING_DATA, FETCHING_DATA_SUCCESS, FETCHING_DATA_FAILURE, EMPTY_DATA } from '../constants';

const initialState = {
    data: [],
    isFetching: false,
    error: false,
}

export default dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case EMPTY_DATA:
            return {
                ...state,
                data: []
            }
        case FETCHING_DATA:
            return {
                ...state,
                data: [],
                isFetching: true
            }
        case FETCHING_DATA_SUCCESS:
            if (action.initialData === null) {
                return {
                    ...state,
                    data: action.newData,
                    isFetching: false
                }
            } else {
                let concatResult = {};
                concatResult.total = action.newData.total;
                concatResult.posts = action.initialData.posts.concat(action.newData.posts);
                return {
                    ...state,
                    data: concatResult,
                    isFetching: false
                }
            }

        case FETCHING_DATA_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
}