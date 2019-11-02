export const uploadingFavorite = recipes => {
    return {
        type: 'UPLOADING_FAVORITE',
        payload: recipes
    }
}


export const loadingUserInfo = (currentUserId) => {
    return (dispatch) => {
        return fetch(`http://localhost:3001/api/v1/users/${currentUserId}` ,{
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(resp => resp.json())
        .then(userData => {console.log("userData", userData)
        dispatch(uploadingFavorite(userData.recipes))
        //  userData.recipes.map(recipe => {   
        //     if (recipe.length !== 0) {         
        //         console.log("reivew in User action", recipe)
        //         dispatch(uploadingRecipe(recipe))
        //     } else {
                
        //     }
        // })
        })

    }
}
