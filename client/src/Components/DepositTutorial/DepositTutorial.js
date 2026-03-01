import React from "react";
import "./DepositTutorial.css";
import depositVideo from "./Cli.mp4"; // ✅ import video

const DepositTutorial = () => {
  return (
    <div className="deposit-wrapper">
      <div className="deposit-card">
        <div className="deposit-header">
          <span className="deposit-icon">💰</span>
          <h2>How to Make Deposit</h2>
        </div>

        <p className="deposit-subtext">
          Watch the video below to learn how to fund your mining account quickly and safely.
        </p>

        <div className="video-container">
          <video controls className="deposit-video">
            <source src={depositVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="deposit-footer">
          ⚡ Fast • Secure • Mobile Money & Bank Payments Accepted
        </div>
      </div>
    </div>
  );
};

export default DepositTutorial;