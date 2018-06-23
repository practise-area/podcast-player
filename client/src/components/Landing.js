import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';


import '../styles/Landing.css';

class Landing extends Component {

  render() {
    return (
      <div>
        <i className="fab fa-fort-awesome-alt landing-logo"></i>

        <h1>Welcome to PodCast.le!</h1>
        <h3>The totally free, web-based, podcast player.</h3>

        <h4>
          With PodCast.le you can come here whenever and get your podcast fix through any browser on any device,
          no need for fancy, schmancy apps, just come on in and use the search bar to get started. Create an
          account to store all your favorites in one easy place, so you can have them right at your
          fingertips.
        </h4>


        <Link to="/register"><Button size='big' color="orange">Sign up for PodCast.le</Button></Link>

        <h4>Already have an account? Awesome, welcome back.</h4>
        <Link to="/login"><Button size='large' color="olive">Login</Button></Link>



      </div>
    );
  }

}

export default Landing;
