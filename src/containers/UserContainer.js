import React, { Component } from 'react';
import { connect } from 'react-redux';
import { recipeShow } from '../actions/recipeActions';
import User from '../components/User.js';
import { loadingUserInfo } from '../actions/userActions.js'

class UserContainer extends Component {
 
    componentDidMount(){
        this.props.loadingUserInfo(this.props.currentUser.id)
    }

    render() {
        return (
            <User user={this.props.currentUser} recipes={this.props.favoriteRecipes} recipeShow={this.props.recipeShow} history={this.props.history} />
        )
    }
}

const mapStateToProps = state => {
    return {
        currentUser: state.currentUsersReducer,
        //favoriteRecipes: state.currentUsersReducer.recipes,
        favoriteRecipes: state.userReducer.recipes
    }
}

export default connect(mapStateToProps, { recipeShow, loadingUserInfo })(UserContainer);