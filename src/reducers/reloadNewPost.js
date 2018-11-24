export default (state = false, action) => {
    switch(action.type) {
        case 'reload_new_post':
            return action.payload
        default:
            return state
    }
}