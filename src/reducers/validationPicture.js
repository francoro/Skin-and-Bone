export default (state = false, action) => {
    switch(action.type) {
        case 'validation_picture':
            return action.payload
        default:
            return state
    }
}