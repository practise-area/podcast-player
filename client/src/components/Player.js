import React, { Component } from 'react';
import FeedItem from './FeedItem';
import PlayerControls from './PlayerControls';
import Search from './Search';
import Library from './Library';


import '../styles/Player.css';


class Player extends Component {
  constructor(props) {
    super(props)

    this.state = {
      feedData: [],
      allEpisodes: [],
      currentEpisode: '',
      isPlaying: false,
      volume: 80,
      currentTime: 0,
      currentEpisodeDuration: 0,
      currentEpisodeDescription: ''
    };
    this.fetchDataFromRssFeed('http://rss.acast.com/eggchasers');
    this.audioElement = document.createElement('audio');
  }

  componentDidMount() {

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
    this.audioElement.src = episode.enclosure.link
    this.setState({ currentEpisode: episode });
  }

  handleEpisodeClick(episode) {
    const isSameEpisode = this.state.currentEpisode === episode;
    if (this.state.isPlaying && isSameEpisode) {
      this.pause();
    } else {
      if (!isSameEpisode) {
        this.changeCurrentEpisode(episode)
        this.setEpisode(episode)
      }
      this.play();
    }
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime
    this.setState({ currentTime: newTime })
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.volume = newVolume
    this.setState({ volume: newVolume })
  };

  changeCurrentEpisode(episode) {
    this.setState({
      currentEpisode: episode,
      currentEpisodeDuration: episode.enclosure.duration,
      currentEpisodeDescription: episode.description
      // currentEpisodeDescription: episode.description.slice(0, 400) + '...'

    });
  }

  handleSkipForward15Seconds(e) {
    const newTime = this.audioElement.currentTime + 15
    this.audioElement.currentTime = newTime
    this.setState({ currentTime: newTime })
  }

  handleSkipBackwards15Seconds(e) {
    const newTime = this.audioElement.currentTime - 15
    this.audioElement.currentTime = newTime
    this.setState({ currentTime: newTime })
  }

  fetchDataFromRssFeed(url) {
    var request = new XMLHttpRequest();
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        var myObj = JSON.parse(request.responseText);
          this.setState({
            feedData: myObj.feed,
            allEpisodes: myObj.items,
            currentEpisode: myObj.items[0],
            currentEpisodeDuration: myObj.items[0].enclosure.duration,
            currentEpisodeDescription: myObj.items[0].description
          });
          this.audioElement.src = this.state.currentEpisode.enclosure.link;
      }
    }

    // https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.feedburner.com%2Fspipodcast
    // https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.gimletmedia.com%2Fthehabitat
    // https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Frss.acast.com%2Feggchasers
    // https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.soundcloud.com%2Fusers%2Fsoundcloud%3Ausers%3A109532020%2Fsounds.rss
    request.open("GET", `https://api.rss2json.com/v1/api.json?rss_url=${url}`, true);
    request.send();
  }

  formatTime(time) {
    if (isNaN(time)) { return "-:--" }
    let hours = Math.floor(time / 3600)
    let minutes = Math.floor((time - hours * 3600) / 60)
    let seconds = Math.floor(time % 60)

    if (seconds < 10) {
      seconds = '0' + seconds
    }

    if (hours > 0) {
      if (minutes < 10) {
        minutes = '0' + minutes
      }
      return hours + ':' + minutes + ':' + seconds
    } else {
      return minutes + ':' + seconds
    }
  }

  render() {
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

    return(
      <div className="main">

        <section className="search-section">
          <Search fetchDataFromRssFeed={ (url) => this.fetchDataFromRssFeed(url) }/>
        </section>

        <section className="player">
          <div className="player-top-section">
            <div className="podcast-info">
              <div className="podcast-image">
                <img alt="Podcast Logo" src={this.state.feedData.image} />
              </div>
                <div className="podcast-title">{this.state.feedData.title} </div>
                <div className="podcast-author">{this.state.feedData.author}</div>
            </div>

            <div className="current-episode">
              <div className="current-episode-description">{this.state.currentEpisodeDescription}</div>
            </div>
          </div>

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

        <div className="feed-section">
            {allEpisodes}
          </div>
        </section>

        <section className="library-section">
          <Library />
        </section>


      </div>
    );
  };
};


export default Player;
