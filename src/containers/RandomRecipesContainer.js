import React, { Component } from 'react';
import { connect } from 'react-redux';
import Recipes from '../components/Recipes.js';
import { fetchRecipes } from '../actions/recipesActions.js';


class RandomRecipesContainer extends Component {
    componentDidMount(){
        this.props.fetchRecipes()
    }

    render() {
        return (
            <div>
                <Recipes recipes={this.props.recipes} hisotry={this.props.history} />          
            </div>
        )
    }
}


export default connect((state)=>({recipes: state.recipesReducer.recipes}), { fetchRecipes })(RandomRecipesContainer)