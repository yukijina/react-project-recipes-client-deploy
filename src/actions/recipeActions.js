import { resetRecipes } from './recipesActions.js'

export const sendingRecipeDetails = recipe => {
    const recipeData = {
        title: recipe.title, 
        recipeId: recipe.id,
        image: recipe.image.includes("http") ? recipe.image : `https://spoonacular.com/recipeImages/${recipe.image}`,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        vegetarian: recipe.vegetarian,
        vegan: recipe.vegan,
        glutenfree: recipe.glutenFree,
        dairyfree: recipe.dairyFree,
        ketogenic: recipe.ketogenic,
        whole30: recipe.whole30,
        instructions: recipe.instructions,
        ingredients: recipe.extendedIngredients
    }
    return {
        type: 'UPLOADING_RECIPE',
        payload: recipeData
    }
}

export const incrementFavorite = () => {
    return {
        type: 'INCREMENT_FAVORITE',
    }
}

export const resetRecipe = () => {
    return {
        type: 'RESET_RECIPE',
    }
}

export const settingFavorite = (numberOfLikes) => {
    return {
        type: 'LOADING_NUMBER_OF_LIKES',
        payload: numberOfLikes
    }
}

export const settingReviews = (reviewArray) => {
        return {
            type: 'LOADING_REVIEWS',
            payload: reviewArray
        }
    }

export const resetFavoriteAndReview = () => {
    return {
        type: 'RESET_FAVORITE_AND_REVIEWS',
    }
}

// Display single review a user just typed
export const displayReview = (review) => {
    console.log(review)
    return {
        type: 'DISPLAY_REVIEW',
        payload: review
    }
}

// Recipe Show (loading individual Recipe)
export const recipeShow = (apiId, history) => {
    const API_KEY = process.env.REACT_APP_APIKEY;
    console.log("fire on show", apiId)
    return (dispatch) => {
        return fetch(`https://api.spoonacular.com/recipes/${apiId}/information?apiKey=${API_KEY}`)
        .then(resp => resp.json())
        .then(recipe => {
            dispatch(sendingRecipeDetails(recipe))
            history.push(`/recipes/${recipe.id}`)
            //dispatch(resetRecipes())
         })
    }
}

//Click "like" button - post likes and review
export const clickLike = (recipe, userId, review) => {
    console.log("fire clickLike", recipe, userId, review)
    return (dispatch) => {
        const dataForRails = {
            title: recipe.title,
            image: recipe.image,
            api_id: recipe.recipeId,
            favorite: {like: true, review: review,user_id: userId}
        }
        return fetch(`http://localhost:3001/api/v1/recipes` ,{
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataForRails)
        })
        .then(resp => resp.json())
        .then(recipe => {
             dispatch(incrementFavorite()) 
         })
    }
}


//Loading total number of Likes if a recipe has favorites
export const loadingFavorite = (apiId) => {
    console.log("fire loading Favorite", apiId)
    return (dispatch) => {
        return fetch(`http://localhost:3001/api/v1/recipes` ,{
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(resp => resp.json())
        .then(recipes => { console.log(recipes)
            recipes.map(recipe => {   
                if (recipe.api_id === apiId) {      
                    const numberOfLikes = recipe.favorites.filter(fav => fav.like).length

                    let reviewArray = [];

                    recipe.favorites.forEach(fav => {
                        reviewArray.push({review: fav.review, username:fav.user_name})
                    }) 
                    
                    console.log("reviewArray", reviewArray)
                    dispatch(settingFavorite(numberOfLikes))
                    dispatch(settingReviews(reviewArray))
                } else {
                    console.log("there is no matching")
                }
            })
         })
    }
}

