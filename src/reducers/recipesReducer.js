export default (state = {
    loading: false,
    recipes: null
}, action) => {
    console.log("RecipeReducer:", action.type, action.payload)
    switch(action.type) {
        case 'LOADING_RECIPES': 
            return {...state, loading: true}

        case 'FETCH_RECIPES':
            return {loading: false, recipes: action.payload}

        case 'RESET_RECIPES':
            return {loading: false, recipes: null}

        default:
            return state
    }
}