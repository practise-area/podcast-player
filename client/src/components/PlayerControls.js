import React, { Component } from 'react';
import '../styles/PlayerControls.css';

class PlayerControls extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentTime: 0,
    };
  }

  componentDidMount() {

  }

  componentWillUmount() {

  }

  render() {
    return(
      <div className="player-controls" id="tester">
        <div className="currently-playing-title">
          {this.props.currentEpisode.title}
        </div>

      <div className="seek-bar">
        {this.props.formatTime(this.props.currentTime)}
        <input
          type="range"
          className="seek-bar"
          value={(this.props.currentTime / this.props.currentEpisodeDuration) || 0 }
          max="1"
          min="0"
          step="0.01"
          onChange={this.props.handleTimeChange}
        />
        {this.props.formatTime(this.props.currentEpisodeDuration)}
      </div>

        <div className="buttons">
          <i className="fas fa-angle-double-left skip-back" onClick={this.props.handleSkipBackwards15Seconds}></i>
          <button className="play-pause" onClick={ () => this.props.handleEpisodeClick(this.props.currentEpisode) } >
            <i className={this.props.isPlaying ? "fas fa-pause pause-button" : "fas fa-play play-button"}></i>
          </button>
          <i className="fas fa-angle-double-right skip-forward" onClick={this.props.handleSkipForward15Seconds}></i>
        </div>



        <div className="volume-bar">
          <i className="fas fa-volume-down"></i>
          <input
            type="range"
            className="volume-bar"
            value={this.props.volume}
            max="1"
            min="0"
            step="0.01"
            onChange={this.props.handleVolumeChange}></input>
          <i className="fas fa-volume-up"></i>
        </div>



      </div>


    );

  };
};


export default PlayerControls;
