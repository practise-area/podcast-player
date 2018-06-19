import React, { Component } from 'react';
import moment from 'moment';
import '../styles/FeedItem.css';

class FeedItem extends Component {
  constructor(props) {
    super(props)

    this.state = {};
  }

  render() {
    let playOrPause = ''
    // (this.props.currentEpisode === this.props.podcast)

  if (this.props.currentEpisode) {
    if (this.props.isPlaying) {
      playOrPause = <i className="fas fa-pause item-pause"></i>
    } else {
      playOrPause = <i className="fas fa-play item-play"></i>
    }
  } else {
    playOrPause = <i className="fas fa-play item-play"></i>
  }



    return (
      <div className="feed-item">
        <div className="feed-item-play" onClick={ () => this.props.handleEpisodeClick(this.props.podcast) }>
          {playOrPause}
        </div>
        <li className="feed-item-list" onClick={ () => this.props.handleEpisodeClick(this.props.podcast) }>
          <div className="feed-item-title" >
            {this.props.podcast.title}
          </div>
          <div className="feed-item-info">
            <small>{this.props.formatTime(this.props.podcast.enclosure.duration)} - - </small>
            <small>{moment(this.props.podcast.pubDate).format("MMM Do YY")}</small>
          </div>

        </li>
      </div>
    )
  }
}

export default FeedItem;
