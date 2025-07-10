import React, { Component } from "react";
import "./MaizeFarm.css";

class MaizeFarm extends Component {
  render() {
    return (
      <div className="maize-container">
        <h2 className="maize-title">🌽 Maize Farming at Capital Gain Management Co.</h2>

        <video
          className="maize-video"
          src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/capgainco%2FcapgaincoMaizeFram.mp4?alt=media&token=f34125f6-3820-47c8-a200-b4e5f7b90a40"
          autoPlay
          muted
          loop
          playsInline
        />

        <p className="maize-description">
          This short video showcases some of the maize farming methods used at Capital Gain Management Co. —
          from planting to harvest. Maize is a staple food and profitable crop across many regions worldwide.
        </p>
      </div>
    );
  }
}

export default MaizeFarm;
