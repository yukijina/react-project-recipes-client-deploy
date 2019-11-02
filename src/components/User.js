import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';


class User extends Component {

    handleClick = (event) => {
        this.props.recipeShow(event.target.dataset.apiid, this.props.history)
    }

    
    render() {
        const user = this.props.user
        const recipes = this.props.recipes
        
        let favoriteText;
            if(recipes.length !== 0){
                favoriteText = 
                    recipes.map(recipe => <ListItem alignItems="flex-start"><ListItemAvatar><Avatar src={recipe.image} /></ListItemAvatar><ListItemText primary={`${recipe.title.substring(0,25)}...`} /><a href="#" onClick={this.handleClick} data-apiid={recipe.api_id}>More</a><Divider variant="inset" component="li" /></ListItem>)
                 
            } else {
                favoriteText = <p>You don't have any favorite recipes yet.</p>
           }
        

        return (
            <div className="MyAccount">
                 {user ? <div><h1>Hello, {user.username}</h1><h2>Your Favorite Recipes:</h2></div> : null}
                <List>{favoriteText}</List>               
            </div>
        )
    }
}

export default User;