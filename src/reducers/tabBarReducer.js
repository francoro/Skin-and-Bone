export default (state = 0, action) => {
    switch(action.type) {
        case 'selected_tab':
            return action.payload
        default:
            return state
    }
}