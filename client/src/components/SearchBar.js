import React, { Component } from 'react';
import '../styles/SearchBar.css';

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchTerm: ''
    }
  }

  onInputChange(term) {
    this.setState({ searchTerm: term })
    this.props.onSearchTermChange(term);
  }

  render() {
    return(
      <div className="search-bar">
        <input className="search-input" type="search" placeholder="Start typing to search for a podcast..."
                         onChange={ (e) => this.onInputChange(e.target.value) } />
      </div>
    )
  }
};


export default SearchBar;
