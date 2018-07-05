import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import Components
import FeedItem from './FeedItem';
import PlayerControls from './PlayerControls';
import Search from './Search';
import Library from './Library';
import Landing from './Landing';
import WelcomeBack from './WelcomeBack';
import Spinner from './common/Spinner';

import '../styles/Player.css';

// Instantiate RSS-Parser to convert RSS feeds into JSON.
import 'rss-parser/dist/rss-parser.min.js';
// const RSSParser = require('rss-parser');

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      feedData: [],
      allEpisodes: [],
      currentEpisode: '',
      isPlaying: false,
      volume: 80,
      currentTime: 0,
      currentEpisodeDuration: 0,
      currentEpisodeDescription: '',
      currentPage: 1
    };
    this.audioElement = document.createElement('audio');
    this.rssParser = new RSSParser();

  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
    this.interval = setInterval(() => this.setState({ currentTime: this.audioElement.currentTime }), 1000);
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
    clearInterval(this.interval);
  }

  setEpisode(episode) {
    this.audioElement.src = episode.enclosure.url;
    this.setState({ currentEpisode: episode });
  }

  handleEpisodeClick(episode) {
    const isSameEpisode = this.state.currentEpisode === episode;
    if (this.state.isPlaying && isSameEpisode) {
      this.pause();
    } else {
      if (!isSameEpisode) {
        this.changeCurrentEpisode(episode);
        this.setEpisode(episode);
      }
      this.play();
    }
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume;
    this.setState({ volume: newVolume });
  }

  changeCurrentEpisode(episode) {
    this.setState({
      currentEpisode: episode,
      currentEpisodeDuration: episode.enclosure.length,
      currentEpisodeDescription: episode.contentSnippet
    });
  }

  handleSkipForward15Seconds(e) {
    const newTime = this.audioElement.currentTime + 15;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleSkipBackwards15Seconds(e) {
    const newTime = this.audioElement.currentTime - 15;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  fetchDataFromRssFeed(url) {
    this.setState({ isLoading: true });
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    (async () => {
      let feed = await this.rssParser.parseURL(proxyurl + url);

      this.setState({
        feedData: feed,
        allEpisodes: feed.items,
        currentEpisode: feed.items[0],
        currentEpisodeDuration: feed.items[0].enclosure.length,
        currentEpisodeDescription: feed.items[0].contentSnippet
      });
      this.setState({ isLoading: false });
      this.audioElement.src = this.state.currentEpisode.enclosure.url;
    })();
  }

  formatTime(time) {
    if (!time) { return; }
    // Cleanse time input depending on in seconds or full format
    if (time.length >= 7) {
      if (time[1] === '0') {
        return time.slice(3);
      } else if (time[0] === '0') {
        return time.slice(1);
      }
    } else {

      if (isNaN(time)) { return "-:--" }
      let hours = Math.floor(time / 3600);
      let minutes = Math.floor((time - hours * 3600) / 60);
      let seconds = Math.floor(time % 60);

      if (seconds < 10) {
        seconds = '0' + seconds
      }

      if (hours > 0) {
        if (minutes < 10) {
          minutes = '0' + minutes
        }
        return hours + ':' + minutes + ':' + seconds;
      } else {
        return minutes + ':' + seconds;
      }
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    const allEpisodes = this.state.allEpisodes.map((podcast) => {
      return <FeedItem
                key={podcast.guid}
                podcast={podcast}
                handleEpisodeClick={ () => this.handleEpisodeClick(podcast) }
                isPlaying={this.state.isPlaying}
                currentEpisode={this.state.currentEpisode === podcast}
                changeCurrentEpisode={ () => this.changeCurrentEpisode(podcast) }
                formatTime={ (time) => this.formatTime(time) }
              />
    });

    let emptyPlayer = ''
    if (!this.state.currentEpisode) {
      emptyPlayer = (
        <div className="player-top-section">
          <div className="empty-player">
            <i className="fas fa-question question-mark"></i>
            <div className="podcast-title empty-player">What do you want to listen to today?</div>
            <small>(Use the search bar to get started...)</small>
          </div>
        </div>
      );
    } else {
      emptyPlayer = (
        <div className="player-top-section">
          <div className="podcast-info">
            <div className="podcast-image">
              <img alt="Podcast Logo" src={this.state.feedData.image.url} />
            </div>
              <div className="podcast-title">{this.state.feedData.title} </div>
              <div className="podcast-author">{this.state.feedData.author}</div>
          </div>
        </div>
      );
    }

    // Logic to decide whether to show a first time landing page, or a signed in welcome back
    let WelcomeBackOrLanding = ''
    if (!this.state.currentEpisode && !isAuthenticated) {
      WelcomeBackOrLanding = (
          <Landing />
      );
    } else if (!this.state.currentEpisode && isAuthenticated) {
      WelcomeBackOrLanding = (
          <WelcomeBack />
      );
    }

    return (
      <div className="main">

        <section className="search-section">
          <Search fetchDataFromRssFeed={ (url) => this.fetchDataFromRssFeed(url) }/>
        </section>

        <section className="library-section">
          {
            this.props.auth.isAuthenticated ?
            <Library
              fetchDataFromRssFeed={ (url) => this.fetchDataFromRssFeed(url) }
            /> : null
          }
        </section>

        {/*Whether to show landing or welcome back message*/}
        { !this.state.currentEpisode ?
          <div className="landing-container">
            {WelcomeBackOrLanding}
          </div> : null
        }

        <div className="player-container">
          <section className="player">
            { this.state.isLoading ? <Spinner /> : emptyPlayer }

            <div className="player-controls-section">
              <PlayerControls
                isPlaying={this.state.isPlaying}
                currentEpisode={this.state.currentEpisode}
                volume={this.audioElement.volume}
                handleEpisodeClick={ () => this.handleEpisodeClick(this.state.currentEpisode) }
                currentTime={this.audioElement.currentTime}
                currentEpisodeDuration={this.audioElement.duration}
                handleTimeChange={ (e) => this.handleTimeChange(e) }
                handleVolumeChange={ (e) => this.handleVolumeChange(e) }
                handleSkipForward15Seconds={ (e) => this.handleSkipForward15Seconds(e) }
                handleSkipBackwards15Seconds={ (e) => this.handleSkipBackwards15Seconds(e) }
                formatTime={ (time) => this.formatTime(time) }
              />
            </div>

            <div className="player-bottom-section">
              <div className="current-episode">
                <div className="current-episode-description">{this.state.currentEpisodeDescription}</div>
              </div>
            </div>
          </section>
        </div>

        <div className="feed-container">
          <section className="feed-section">
            {allEpisodes}
          </section>
        </div>
      </div>
    );
  }
}

Player.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {})(Player);
