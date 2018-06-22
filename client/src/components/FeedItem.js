import React, { Component } from 'react';
import moment from 'moment';
import '../styles/FeedItem.css';

class FeedItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false
    };
  }

  onMouseEnter() {
    this.setState({ hover: true });
  }

  onMouseLeave() {
    this.setState({ hover: false });
  }



  render() {
    let playOrPause = ''

    if(this.props.currentEpisode && this.props.isPlaying) {
      playOrPause = <i className="far fa-pause-circle item-pause"></i>
    } else if (this.state.hover && !this.props.currenEpisode) {
      playOrPause = <i className="far fa-play-circle item-play"></i>
    }

    return (
      <div className="feed-item" onMouseEnter={ () => this.onMouseEnter()} onMouseLeave={ () => this.onMouseLeave()}
        onClick={ () => this.props.handleEpisodeClick(this.props.podcast) }>
        <div className="feed-item-play" >
          {playOrPause}
        </div>
        <li className="feed-item-list">
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
