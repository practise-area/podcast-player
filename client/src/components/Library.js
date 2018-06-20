import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentLibrary } from '../actions/libraryActions';
import Spinner from './common/Spinner';

import '../styles/Library.css';

class Library extends Component {
  constructor(props) {
    super(props)

    this.state = {
      library: [],
      loggedIn: false,
    };



  }

  componentDidMount() {
    this.props.getCurrentLibrary();
  }

  componentWillReceiveProps(nextProps) {

  }

  deleteFromLibrary() {

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
            {
              library.podcasts.map((podcast) => {
                return(
                  <div key={podcast._id}>
                    <li className="search-results">
                      <img className="search-result-image" alt="Add to Player" onClick={ () => this.props.fetchDataFromRssFeed(podcast.feed)} src={podcast.image} />
                      <p className="search-result-title">{podcast.title}</p>
                      <p className="search-result-author">{podcast.author}</p>
                        <p className="delete-from-library"
                          onClick={ (e) => this.deleteFromLibrary(e, podcast.collectionName, podcast.artistName, podcast.feedUrl, podcast.artworkUrl100)}>
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
  errors: PropTypes.object.isRequired
}



const mapStateToProps = (state) => ({
  auth: state.auth,
  library: state.library,
  errors: state.errors

});


export default connect(mapStateToProps, { getCurrentLibrary })(Library);
