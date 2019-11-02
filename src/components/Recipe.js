import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clickLike, displayReview, loadingFavorite } from '../actions/recipeActions.js';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Fab from '@material-ui/core/Fab';
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocalDiningIcon from '@material-ui/icons/LocalDining';
import NatureIcon from '@material-ui/icons/Nature';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import OutdoorGrillIcon from '@material-ui/icons/OutdoorGrill';
import EmojiNatureIcon from '@material-ui/icons/EmojiNature';
import MoodIcon from '@material-ui/icons/Mood';
import CreateIcon from '@material-ui/icons/Create';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';


class Recipe extends Component {

    state = {
        review: ""
    }

    componentDidMount() {
        this.props.loadingFavorite(this.props.recipe.recipeId)
    }

    //Like button
    handleClick = (recipe, userId) => {
        console.log("like btn:", recipe, userId)
        this.props.clickLike(recipe, userId, this.state.review)
    }

    handleInputChange = (event) => {
        // this.props.updateReviewForm({...this.props.review, [event.target.name]: [event.target.value]})
        this.setState({
            review: event.target.value
        })
    }

    handleSubmit = (event, recipe, userId) => {
        event.preventDefault()
        console.log("review submit", recipe, userId, this.state.review, this.props.history)
        this.props.clickLike(recipe, userId, this.state.review, this.props.history)
        this.props.displayReview(this.state.review)
        this.setState({
            review: ""
        })
    }

    render() {
        
        const ingredients = this.props.recipe.ingredients.map(ing => {
            return (
                <ul key={ing.name}>
                    <li key={ing.name}>{ing.original}: <span>{ing.amount} {ing.unit}</span></li>
                    </ul>
                    )
            }
        )
    

    return(
            <div className="Recipe">
                <GridList cellHeight={400} cols={1} style={{marginBottom: "3%"}}>
                <GridListTile>
                <img src={this.props.recipe.image}></img>
                <GridListTileBar title={this.props.recipe.title} titlePosition="top"
              actionIcon={
                <IconButton>
                  <StarBorderIcon style={{color: "#FCF3F3"}} />
                </IconButton>
              }
              actionPosition="left">
                  </GridListTileBar>
                  </GridListTile> 
                </GridList>  

                <IconButton onClick={() => this.handleClick(this.props.recipe, this.props.userId, this.state.review)} style={{color: "#e91e63"}}><Fab style={{backgroundColor: "#f8bbd0", color: "#e91e63"}}><FavoriteBorderIcon /></Fab><span style={{fontSize: "1.2rem"}}>&nbsp;Love:&nbsp;{this.props.favorite}</span></IconButton>

                <div>
                    <p><IconButton><ScheduleIcon /></IconButton>
                    Read in Minutes: {this.props.recipe.readyInMinutes}</p>
                    <p><IconButton><LocalDiningIcon /></IconButton>
                    Servings: {this.props.recipe.servings}</p>
                    <p><IconButton><NatureIcon /></IconButton>
                    Vegetarian: {this.props.recipe.vegetarian ? "Yes" : "No" }</p>
                    <p><IconButton><NatureIcon /></IconButton>
                    Vegan: {this.props.recipe.vegan ? "Yes" : "No" }</p>
                    <p><IconButton><DoneOutlineIcon /></IconButton>
                    Gluten Free: {this.props.recipe.glutenfree ? "Yes" : "No" }</p>
                    <p><IconButton><DoneOutlineIcon /></IconButton>
                    Dairy Free: {this.props.recipe.dairyfree ? "Yes" : "No"}</p>
                    <p><IconButton><OutdoorGrillIcon /></IconButton>
                    Ketogenic: {this.props.recipe.ketogenic ? "Yes" : "No" }</p>
                    <p><IconButton><EmojiNatureIcon /></IconButton>
                    Whole30: {this.props.recipe.whole30 ? "Yes" : "No" }</p>
                    
                    <h3>Instructions:</h3>
                    <p>{this.props.recipe.instructions}</p>
                    
                    <h3>Ingredients:</h3>
                    <ul>{ingredients}</ul>
                </div>

                <h3>Recommended reviews:</h3>
                {this.props.reviews.length === 0 ? <p>Write a first review!</p> : this.props.reviews.map(review => <p><IconButton><MoodIcon /></IconButton>{review.review} by {review.username}</p>)}

                <h5 style={{marginTop: "1%"}}><IconButton><EmojiEmotionsIcon /></IconButton>{this.props.review ? `${this.props.currentUser}: ${this.props.review}` : null}</h5>

                <form onSubmit={(event) => this.handleSubmit(event, this.props.recipe, this.props.userId)}>
                    <TextField type="text" name="review" value={this.state.review} onChange={this.handleInputChange} label="Your Review"
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <CreateIcon />
                        </InputAdornment>
                         ),
                      }}/>
                    <Button type="submit" size="small" style={{color: "#e91e63"}} variant="outlined">Add Review</Button>
                </form>

            <button onClick={this.props.history.goBack}style={{margin: "3% 0"}}><KeyboardBackspaceIcon /><span style={{fontSize: "1rem"}}>Back</span></button>  

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        recipe: state.recipeReducer.recipe,
        userId: state.currentUsersReducer.id,
        favorite: state.recipeReducer.favorite,
        reviews: state.recipeReducer.reviews,
        review: state.recipeReducer.review,
        currentUser: state.currentUsersReducer.username
    }
}

export default connect(mapStateToProps, { clickLike, displayReview, loadingFavorite })(Recipe);