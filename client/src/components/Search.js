import _ from 'lodash';
import React, { Component } from 'react';
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

  fetchItunesData(search_term) {
    fetch(`https://itunes.apple.com/search?term=${search_term}&entity=podcast`)
    .then(results => {
      return results.json();
    }).then(data => {
      console.log(data);
      let podcasts = data.results.map((podcast) => {
        return(
          <div key={podcast.collectionId} onClick={ () => this.props.fetchDataFromRssFeed(podcast.feedUrl)}>
            <li className="search-results">
              <img className="search-result-image" alt="Add to Player" onClick={ () => this.props.fetchDataFromRssFeed(podcast.feedUrl)} src={podcast.artworkUrl100} />
              <p className="search-result-title">{podcast.collectionName}</p>
              <p className="search-result-author">{podcast.artistName}</p>
              <p className="add-to-library"><i class="fas fa-plus-circle"></i> Add to Library</p>
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

export default Search;

// <input type="search" onChange={ (e) => this.handleSearchInput(e.target.value) }/>
// <button type="submit" onSubmit={ () => this.fetchItunesData(this.state.searchTerm)}></button>
