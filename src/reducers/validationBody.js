export default (state = false, action) => {
    switch(action.type) {
        case 'validation_body':
            return action.payload
        default:
            return state
    }
}