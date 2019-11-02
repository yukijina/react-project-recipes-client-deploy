import React from 'react';
import { Link } from 'react-router-dom';

const Home = (props) => {

const renderBtn = props.loggedin ? <div><button><Link to="/logout" className="btn btn-full">Log Out</Link></button></div> : <div><button><Link to="/login" className="btn btn-full">Log In</Link></button><button><Link to="/signup" className="btn btn-ghost">Sign Up</Link></button></div>

    return (
        <div className="Home">
            <h1>I COOK</h1>
            <h3>Organize your recipe from 360k Recipes</h3>
                {renderBtn}
         </div>
   
    )
}

export default Home;
