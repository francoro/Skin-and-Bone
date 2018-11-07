export default (state = false, action) => {
    switch(action.type) {
        case 'is_logged':
            return action.payload
        default:
            return state
    }
}