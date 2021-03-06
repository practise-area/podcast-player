import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentLibrary, deletePodcast, clearErrors } from '../actions/libraryActions';
import Spinner from './common/Spinner';
import isEmpty from '../utils/is-empty';

import '../styles/Library.css';
import { Dropdown, Button } from 'semantic-ui-react';

class Library extends Component {
  constructor(props) {
    super(props);

    this.state = {
      library: [],
      loggedIn: false,
      errors: {},
      selectedPodcastId: '',
      selectedPodcastFeed: ''
    };
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getCurrentLibrary();
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onDeleteClick(e, id) {
    e.preventDefault();
    this.props.deletePodcast(id);
    this.setState({ selectedPodcastFeed: null });
  }

  onChange(e, data) {
    e.preventDefault();
    this.setState({ selectedPodcastFeed: data.value });
    this.props.fetchDataFromRssFeed(data.value);
  }

  render() {
    const { library } = this.props.library;

    let authorizedLibrary;

    if (library === null) {
      authorizedLibrary = <Spinner />
    } else {
      if (isEmpty(library)) {
        authorizedLibrary = (
          <div>
            <Dropdown placeholder='Select one of your favorites...' fluid search selection options={[]} onChange={this.onChange} />
          </div>
        )
      } else {

      // Semantic UI Drop down only accepts keys as 'value', 'image' and 'text', so this takes existing
      // keys and re-maps them to fit those values
      let arrayToChangeKeys = [];
      library.podcasts.forEach((pod) => {
        let newPodcastKeys = {
          _id: pod._id,
          image: pod.image,
          value: pod.feed,
          text: pod.title
        };
        arrayToChangeKeys.push(newPodcastKeys);
      });

      if(Object.keys(library).length > 0) {
        authorizedLibrary = (
          <div>
            <Dropdown placeholder='Select one of your favorites...' fluid search selection options={arrayToChangeKeys} onChange={this.onChange} />
          </div>
        );
      }
    }
  }

    return (
      <div className="library-container">
        <div className="library">
          {this.props.auth.isAuthenticated ? authorizedLibrary : null}
          <div className="errors">
            {this.state.errors ? this.state.errors.podcast : null}
          </div>
        </div>
          {this.state.selectedPodcastFeed ?
            <div className="delete-button">
                <Button color="orange" onClick={(e) => this.onDeleteClick(e, this.state.selectedPodcastFeed)}>Unsubscribe</Button>
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
