import React, { Component } from 'react';
import { connect } from 'react-redux';
import { searchRecipes } from '../actions/recipesActions.js';
import { recipeShow, resetFavoriteAndReview } from '../actions/recipeActions.js';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


class Recipes extends Component {

    state = {
        query: "",
        diet: ""
    }

    componentDidMount(){
        this.props.resetFavoriteAndReview()
    }

    handleInputChange = event => {
        // searchQuery({...this.props.query, [event.target.name]: event.target.value})
        this.setState({
            query: event.target.value
        })
    }

    handleSelectChange = event => {
        this.setState({
            ...this.state, diet: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        this.props.searchRecipes(this.state)
    }

    // Render individual recipe in Recipe Show
    handleClick = (apiId, history) => {
        console.log("now in click", apiId, history)
        this.props.recipeShow(apiId, history)
    }

    render() {
        
        //console.log(this.props.recipes)
        return(
            <div className="Recipes">
                <h1 style={{color: "#555"}}>Today's choice</h1>
                
                <form onSubmit={this.handleSubmit} style={{margin: "6% auto"}}>
                    Search : 
                    <TextField type="text" name="query" value={this.state.query} placeholder="e.g.burger" onChange={this.handleInputChange} style={{marginLeft: "10px", marginRight: "10px"}} />
                
                    Diet:
                    <Select value={this.state.diet} onChange={this.handleSelectChange}>
                        <MenuItem>Select</MenuItem>
                        <MenuItem value="all">All</MenuItem>
                        <MenuItem value="glutenfree">Gluten Free</MenuItem>
                        <MenuItem value="ketgenic">Ketogenic</MenuItem>
                        <MenuItem value="vegetarian">Vegetarian</MenuItem>
                        <MenuItem value="vegn">Vegan</MenuItem>
                        <MenuItem value="paleo">Paleo</MenuItem>
                        <MenuItem value="whole30">Whole 30</MenuItem>
                    </Select>
                    
                    <input type="submit" value="Search" className="btn btn-full" style={{marginLeft: "15px"}}></input>
                </form>

                <GridList cols={2}>
                    {this.props.recipes!== null ? this.props.recipes.map(recipe => <GridListTile key={recipe.recipeId}><img src={recipe.image}></img><GridListTileBar title={recipe.title}  actionIcon={
                        <IconButton onClick={() => this.handleClick(recipe.recipeId, this.props.hisotry)}>
                        <MoreHorizIcon style={{color: "#FCF3F3"}}  />
                        </IconButton>
              }></GridListTileBar></GridListTile>) : <p>No recipes found. Please try with another keyword.</p>}     
                </GridList>
            </div>
        )
    }
}


export default connect(null, { searchRecipes, recipeShow, resetFavoriteAndReview })(Recipes);