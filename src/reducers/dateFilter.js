export default (state = 0, action) => {
    switch(action.type) {
        case 'selected_filter':
            return action.payload
        default:
            return state
    }
}