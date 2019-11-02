export default (state = {
    recipes: []
}, action) => {
    console.log("userReducer", action.payload)
    switch(action.type) {
        case 'UPLOADING_FAVORITE':
            return {...state, recipes: action.payload}

        default:
            return state
    }
}