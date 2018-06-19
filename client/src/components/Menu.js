import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Player from './Player';
// import Search from './Search';

import '../styles/Menu.css';

class Menu extends Component {
  constructor(props) {
    super(props)

    this.state = {

    };
  }

  componentDidMount() {

  }

  componentWillUmount() {
  }

  render() {
    return(
      <div className="menu">
        <div className="menu-logo">
          <i className="fab fa-fort-awesome-alt"></i>
        </div>

        <div className="menu-title">
          <Link to="/">Podcast Player</Link>
        </div>

        <div className="nav-login">
          <Link to="/login">Log In </Link>
          -
          <Link to="/register"> Sign Up</Link>

        </div>

      </div>


    );
  };
};


export default Menu;


//
// <div className="menu">
//   <div className="menu-title">
//       Podcast Player
//   </div>
//
//   <div className="player-menu">
//     <i className="fas fa-headphones menu-item-icon"></i>
//     <Link to="/player" component={Player}><h2 className="player-menu menu-item">Player</h2></Link>
//   </div>
//
//   <div className="search-menu">
//     <i className="fas fa-search menu-item-icon"></i>
//     <Link to="/" component={Search}><h2 className="search-menu menu-item">Search</h2></Link>
//   </div>
//
//   <div className="library-menu">
//     <i className="fas fa-list menu-item-icon"></i>
//     <h2 className="library-menu menu-item">Library</h2>
//   </div>
// </div>
//
