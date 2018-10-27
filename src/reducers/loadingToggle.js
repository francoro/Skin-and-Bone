export default (state = false, action) => {
    switch(action.type) {
        case 'loading_toggle':
            return action.payload
        default:
            return state
    }
}