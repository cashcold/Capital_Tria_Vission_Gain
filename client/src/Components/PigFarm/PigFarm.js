import React, { Component } from "react";
import "./PigFarm.css";

class PigFarm extends Component {
  render() {
    return (
     <div className="pigfarm-container">
        <h2 className="pigfarm-title">🐖 Pig Farming Project</h2>
        <p className="pigfarm-description">
          Discover how our pig farming operation is revolutionizing agriculture through modern practices,
          sustainability, and profitability.
        </p>
        <div className="pigfarm-video-wrapper">
          <video
            className="pigfarm-video"
            src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/capgainco%2FcapgaincoPigFarm.mp4?alt=media&token=2b62a083-7f36-41a8-bf33-8fdd4d50409d"
            autoPlay
            loop
            controls
            muted
            playsInline
          ></video>
        </div>
      </div>

    );
  }
}

export default PigFarm;
