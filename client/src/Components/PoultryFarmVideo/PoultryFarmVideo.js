import React, { Component } from "react";
import "./PoultryFarmVideo.css";

class PoultryFarmVideo extends Component {
  render() {
    return (
      <div className="poultry-container">
        <h2 className="poultry-heading">🐔 Some of Our Poultry Farming Methods</h2>

        <p className="poultry-description">
          This short video showcases some of the poultry farming techniques we use at Capital Gain Management Co. — including broilers, layers, ducks, and guinea fowl operations.
        </p>

        <div className="video-wrapper">
          <video
            autoPlay
            loop
            muted
            playsInline
            width="100%"
            preload="metadata"
            className="poultry-video"
          >
            <source
              src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/capgainco%2FcapagainPoultryFarm.mp4?alt=media&token=b7350adb-2dcf-4a3e-adac-99bb868c5385"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    );
  }
}

export default PoultryFarmVideo;
