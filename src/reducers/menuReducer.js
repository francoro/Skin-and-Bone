export default (state = false, action) => {
    switch(action.type) {
        case 'open_menu':
            return action.payload
        default:
            return state
    }
}