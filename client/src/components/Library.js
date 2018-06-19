import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentLibrary } from '../actions/libraryActions';

class Library extends Component {
  constructor(props) {
    super(props)

    this.state = {

    };
  }

  componentDidMount() {
    this.props.getCurrentLibrary();
  }

  render() {
    const { library } = this.props;
    console.log(library);

    return(
      <div>Library?
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
