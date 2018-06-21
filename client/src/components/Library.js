import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentLibrary, deletePodcast, clearErrors } from '../actions/libraryActions';
import Spinner from './common/Spinner';

import '../styles/Library.css';

class Library extends Component {
  constructor(props) {
    super(props)

    this.state = {
      library: [],
      loggedIn: false,
      errors: {}
    };
    this.interval = setInterval(() => this.setState({ errors: {} }), 5000);
  }

  componentDidMount() {
    this.props.getCurrentLibrary();
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onDeleteClick(id) {
    this.props.deletePodcast(id);
  }

  render() {
    const { user } = this.props.auth;
    const { library, loading } = this.props.library;

    let authorizedLibrary;

    if (library === null || loading) {
      authorizedLibrary = <Spinner />
    } else {
      if(Object.keys(library).length > 0) {
        authorizedLibrary = (
          <div>
            <h4>My Library</h4>
            <div className="errors">
              {this.state.errors ? this.state.errors.podcast : null}
            </div>
            {
              library.podcasts.map((podcast) => {
                return(
                  <div key={podcast._id}>
                    <li className="search-results">
                      <img className="search-result-image" alt="Add to Player" onClick={ () => this.props.fetchDataFromRssFeed(podcast.feed)} src={podcast.image} />
                      <p className="search-result-title">{podcast.title}</p>
                      <p className="search-result-author">{podcast.author}</p>
                        <p className="delete-from-library"
                          onClick={this.onDeleteClick.bind(this, podcast._id)}>
                          <i className="far fa-trash-alt"></i> Delete from Library</p>
                    </li>
                  </div>
                )
              })
            }
          </div>
        )
      } else {
        authorizedLibrary = (
          <div>
            Thanks for signing up! Use the search bar to search for your favorite podcasts, and select 'Add To Library' to see them pop up right here!
          </div>
        );
      }
    }

    let guestLibrary = (
      <div className="sign-up">
        Sign up for an account today to save all your favorite podcasts right here.
      </div>

    );

    return(
      <div className="library">
        {this.props.auth.isAuthenticated ? authorizedLibrary : guestLibrary}
      </div>
    );
  }
}

Library.propTypes = {
  library: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  getCurrentLibrary: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  deletePodcast: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  library: state.library,
  errors: state.errors
});

export default connect(mapStateToProps, { getCurrentLibrary, deletePodcast, clearErrors })(Library);
