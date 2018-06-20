import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addToLibrary, getCurrentLibrary } from '../actions/libraryActions';



import _ from 'lodash';
import SearchBar from './SearchBar';
import '../styles/Search.css';

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchResults: [],
      searchTerm: ''
    };

  }


  onAddToLibrary(e, title, author, feed, image) {
    // e.preventDefault();
    const podcastData = {
      title: title,
      author: author,
      feed: feed,
      image: image
    }
    this.props.addToLibrary(podcastData, this.props.history)
  }

  fetchItunesData(search_term) {
    fetch(`https://itunes.apple.com/search?term=${search_term}&entity=podcast`)
    .then(results => {
      return results.json();
    }).then(data => {
      console.log(data);
      let podcasts = data.results.map((podcast) => {
        return(
          <div key={podcast.collectionId}>
            <li className="search-results">
              <img className="search-result-image" alt="Add to Player" onClick={ () => this.props.fetchDataFromRssFeed(podcast.feedUrl)} src={podcast.artworkUrl100} />
              <p className="search-result-title">{podcast.collectionName}</p>
              <p className="search-result-author">{podcast.artistName}</p>
              <p className="add-to-library"
                onClick={ (e) => this.onAddToLibrary(e, podcast.collectionName, podcast.artistName, podcast.feedUrl, podcast.artworkUrl100)}>
                <i className="fas fa-plus-circle"></i> Add to Library</p>
            </li>
          </div>
        )
      })
      this.setState({ searchResults: podcasts });
    })
  }


  render() {
    const fetchItunesData = _.debounce((search_term) => { this.fetchItunesData(search_term) }, 350);

    return(
      <div className="search-results-container">
        <SearchBar onSearchTermChange={fetchItunesData} />
        {this.state.searchResults}
      </div>
    );
  }
}


Search.propTypes = {
  library: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  library: state.library,
  errors: state.errors
})

export default connect(mapStateToProps, { addToLibrary, getCurrentLibrary })(withRouter(Search));
