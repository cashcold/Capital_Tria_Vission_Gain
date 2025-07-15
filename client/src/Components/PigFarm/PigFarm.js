import React, { Component } from "react";
import "./PigFarm.css";

class PigFarm extends Component {
  render() {
    return (
      <div className="farm-container">
        <h2 className="farm-title">🐖 Pig Farming Project</h2>
        <p className="farm-description">
          This video gives you a sneak peek into our modern pig farming system
          at Capital Gain Management Co. — clean, scalable, and ready to meet
          the global demand for pork across West Africa, Asia, and the Middle East.
        </p>
        <div className="video-wrapper">
          <video
            className="farm-video"
            src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/capgainco%2FcapgaincoPigFarm.mp4?alt=media&token=2b62a083-7f36-41a8-bf33-8fdd4d50409d"
            controls
            autoPlay
            muted
            loop
            playsInline
          ></video>
        </div>

        
      </div>
    );
  }
}

export default PigFarm;
