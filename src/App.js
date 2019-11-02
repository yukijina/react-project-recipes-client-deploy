import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Home from './components/Home.js';
import NavBar from './components/NavBar.js';
import Login from './components/Login.js';
import Logout from './components/Logout.js';
import Signup from './components/Signup.js';
import RandomRecipesContainer from './containers/RandomRecipesContainer.js';
import { getCurrentUser } from './actions/currentUsers.js'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Recipe from './components/Recipe.js';
import UserContainer from './containers/UserContainer.js';
import ProtectedRoute from './containers/ProtectedRoute.js'


class App extends Component {
  componentDidMount(){
    this.props.getCurrentUser()
  }

  render() {
   
    return (
      <Router>
        {this.props.loggedin ? <NavBar loggedin= {this.props.loggedin} /> : <Home />}

        <div className="App">
          <Switch>
              <ProtectedRoute exact path='/logout' component={Logout}/>
              <ProtectedRoute exact path='/recipes' component={RandomRecipesContainer}/>
              <ProtectedRoute exact path='/recipes/:id' component={Recipe} />
              <ProtectedRoute exact path='/myaccount' component={UserContainer} />
   
              <Route exact path='/' render={() => <Home loggedin={this.props.loggedin} />}/>
              <Route exact path='/login' component={Login} />
              <Route exact path='/signup' component={Signup} />         
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  const status = state.currentUsersReducer === null || state.currentUsersReducer.error ? false : true
  return {
    recipes: state.recipesReducer.recipes,
    currentUser: state.currentUsersReducer,
    loggedin: status
  }
}

export default connect(mapStateToProps,{ getCurrentUser })(App);
