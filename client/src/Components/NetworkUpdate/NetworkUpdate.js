import React, { Component } from "react";
import "./NetworkUpdate.css";
import networkIssue from "./ChatGPT Image Apr 25, 2026, 04_24_15 AM.png";

class NetworkUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: true,
    };
  }

  closePopup = () => {
    this.setState({ showPopup: false });
  };

  render() {
    if (!this.state.showPopup) {
      return null;
    }

    return (
      <div className="popupOverlay">
        <div className="popupCard">
          <button className="closeButton" onClick={this.closePopup}>
            ×
          </button>

          {/* Add your image here */}
          <img
            src={networkIssue}
            alt="Network Update"
            className="popupImage"
          />

          <h2 className="popupHeader">🚨 Important Network Update 🚨</h2>

          <p className="popupText">Dear Valued Investors,</p>

          <p className="popupText">
            We are currently experiencing network issues affecting <b>deposits and withdrawals</b>.
          </p>

          <p className="popupText">
            🔧 Our technical team is actively working to resolve this issue as quickly as possible.
          </p>

          <p className="safeBox">
            🛡️ Your funds are safe and secure. There is no cause for concern.
          </p>

          <div className="popupSection">
            <h3>📌 What you can do:</h3>
            <ul>
              <li>⏳ Please be patient and avoid multiple transaction attempts</li>
              <li>🔔 Stay updated — we will notify you once services are restored</li>
              <li>📞 Contact support if you need assistance</li>
            </ul>
          </div>

          <div className="popupLinks">
            <p>
              🔗 <b>Platform:</b>{" "}
              <a href="https://capgainco.com" target="_blank" rel="noreferrer">
                https://capgainco.com
              </a>
            </p>

            <p>📱 <b>Support Lines:</b></p>
            <p>📞 0203808479</p>
            <p>📞 0268253787</p>
          </div>

          <p className="popupFooter">
            💚 Thank you for your patience and trust in Capgainco.com
          </p>

          <p className="popupFooterStrong">
            Together, we grow. Together, we succeed.
          </p>
        </div>
      </div>
    );
  }
}

export default NetworkUpdate;