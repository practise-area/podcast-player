import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentLibrary, deletePodcast, clearErrors } from '../actions/libraryActions';
import Spinner from './common/Spinner';
import DeleteFromLibrary from './DeleteFromLibrary';

import '../styles/Library.css';
import { Dropdown, Button } from 'semantic-ui-react';

class Library extends Component {
  constructor(props) {
    super(props)

    this.state = {
      library: [],
      loggedIn: false,
      errors: {},
      selectedPodcastId: '',
      selectedPodcastFeed: ''
    };
    this.onChange = this.onChange.bind(this);
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

  onDeleteClick(e, id) {
    e.preventDefault();
    this.props.deletePodcast(id);
    this.setState({ selectedPodcastFeed: null })
  }

  onChange(e, data) {
    e.preventDefault();
    this.setState({ selectedPodcastFeed: data.value })
    this.props.fetchDataFromRssFeed(data.value);
  }

  render() {
    const { user } = this.props.auth;
    const { library, loading } = this.props.library;


    let authorizedLibrary;

    if (library === null || loading) {
      authorizedLibrary = <Spinner />
    } else {

      let newArray = []
      let forValues = library.podcasts.map((pod) => {
        let newPod = {
          _id: pod._id,
          image: pod.image,
          value: pod.feed,
          text: pod.title
        }
        newArray.push(newPod)
      })

      if(Object.keys(library).length > 0) {
        authorizedLibrary = (
          <div>
            <Dropdown placeholder='Select one of your favorites...' fluid search selection options={newArray} onChange={this.onChange} />

            <div className="errors">
              {this.state.errors ? this.state.errors.podcast : null}
            </div>
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
      <div className="library-container">
        <div className="library">
          {this.props.auth.isAuthenticated ? authorizedLibrary : guestLibrary}
        </div>
          {this.state.selectedPodcastFeed ?
            <div className="delete-button">
              <DeleteFromLibrary
                selectedPodcastFeed={this.state.selectedPodcastFeed}
              />
            </div>
           : null
          }
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
