import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../actions/authActions';
import { clearCurrentLibrary } from '../actions/libraryActions';

// import Player from './Player';
import Search from './Search';

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

  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentLibrary();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;

    const guestLinks = (
      <div className="nav-login">
        <Link to="/login">Login </Link>
        -
        <Link to="/register"> Sign Up</Link>
      </div>

    );

    const authLinks = (
      <div className="nav-login">
        {user.name} -
        <a href="#" onClick={this.onLogoutClick.bind(this)}> Logout</a>
      </div>

    );

    return(
      <div className="menu">
        <div className="menu-logo">
          <i className="fab fa-fort-awesome-alt"></i>
        </div>

        <div className="menu-title">
          <Link to="/">PODCAST.LE</Link>
        </div>
          {isAuthenticated ? authLinks : guestLinks }
      </div>


    );
  };
};

Menu.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
});


export default connect(mapStateToProps, { logoutUser, clearCurrentLibrary })(Menu);
