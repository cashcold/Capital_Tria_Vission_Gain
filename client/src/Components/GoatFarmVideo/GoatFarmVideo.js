import React, { Component } from "react";
import "./GoatFarmVideo.css";

class GoatFarmVideo extends Component {
  render() {
    return (
      <div className="goat-container">
        <h2 className="goat-heading">🐐 Our Goat Farming Techniques</h2>
        <p className="goat-description">
          This video highlights our local and hybrid goat farming methods used at Capital Gain Management Co. — designed for meat and breeding, serving markets across West Africa, Asia, and the Middle East.
        </p>

        <div className="video-wrapper">
          <video
            className="goat-video"
            src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/capgainco%2FcapgainGoatFarm.mp4?alt=media&token=8493d00c-dc5f-46ef-8b25-a89b6720fb72"
            controls
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
    );
  }
}

export default GoatFarmVideo;
