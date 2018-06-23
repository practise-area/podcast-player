import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentLibrary, deletePodcast, clearErrors } from '../actions/libraryActions';
import Spinner from './common/Spinner';

import '../styles/Library.css';
import { Dropdown, Button } from 'semantic-ui-react';

class Library extends Component {
  constructor(props) {
    super(props)

    this.state = {

    };
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }




  onDeleteClick(e, feed) {
    e.preventDefault();
    this.props.deletePodcast(feed);
  }

  render() {
    return(
      <div>
        <Button color="orange" onClick={(e) => this.onDeleteClick(e, this.props.selectedPodcastFeed)}>Unsubscribe</Button>
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
