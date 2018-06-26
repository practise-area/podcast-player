import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { addToLibrary, getCurrentLibrary } from '../actions/libraryActions';
import { Search as SearchBar, Button } from 'semantic-ui-react';
import _ from 'lodash';

import '../styles/Search.css';

class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      results: [],
      value: '',
      isLoading: false
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.resultRenderer = this.resultRenderer.bind(this);
    this.handleResultSelect = this.handleResultSelect.bind(this);
  }

  componentWillMount() {
    this.resetComponent();
  }

  resetComponent() {
    this.setState({ isLoading: false, results: [], value: '' });
  }

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });
    this.fetchItunesData(value);
  }

  handleResultSelect(e, data) {
    e.preventDefault();
    this.props.fetchDataFromRssFeed(data.result.feed);
  }

  onAddToLibrary(e, title, author, feed, image) {
    const podcastData = {
      title: title,
      author: author,
      feed: feed,
      image: image
    }
    this.props.addToLibrary(podcastData, this.props.history);
  }

  fetchItunesData(value) {
    if (!value) {
      return this.setState({ isLoading: false });
    }
    fetch(`https://itunes.apple.com/search?term=${value}&entity=podcast`)
      .then(results => {
        return results.json();
      }).then(data => {
        let resultsArray = [];
        data.results.forEach((podcast) => {
          let newPodcast = {
            key: podcast.collectionId,
            title: podcast.collectionName,
            author: podcast.artistName,
            feed: podcast.feedUrl,
            image: podcast.artworkUrl100
          }
          resultsArray.push(newPodcast);
        });
        this.setState({ results: [] });
        this.setState({ results: resultsArray, isLoading: false });
      });
  }

  resultRenderer({ id, title, author, feed, image }) {
  return (
    <div className="search-item" id={id} key={id}>
      <li className="search-results" id={id} key={id}>
        <img className="search-result-image" alt="Add to Player" onClick={ () => this.props.fetchDataFromRssFeed(feed)} src={image} />
        <p className="search-result-title">{title}</p>
        <p className="search-result-author">{author}</p>

        <Button basic color="green" onClick={ () => this.props.fetchDataFromRssFeed(feed)}>
          <i className="fas fa-headphones"></i> Listen
        </Button>
        <Button basic color="orange" onClick={ (e) => this.onAddToLibrary(e, title, author, feed, image)}>
          <i className="fas fa-rss"></i> Subscribe
        </Button>
      </li>
    </div>
  );
}

  render() {
    const { isLoading, value, results } = this.state;

    return(
      <div className="search-results-container">
        <SearchBar
          loading={isLoading}
          resultRenderer={this.resultRenderer}
          onSearchChange={_.debounce(this.handleSearchChange, 400, { leading: true })}
          results={results}
          value={value}
          onResultSelect={this.handleResultSelect}
        />
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
