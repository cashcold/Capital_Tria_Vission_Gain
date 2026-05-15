import React, { Component } from "react";
import "./MiningUpdatePopup.css";
import miningUpdateImage from "./miningUpdateImage.png";

class MiningUpdatePopup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showPopup: true,
    };
  }

  closePopup = () => {
    this.setState({
      showPopup: false,
    });
  };

  render() {

    if (!this.state.showPopup) {
      return null;
    }

    return (

      <div className="miningOverlay">

        <div className="miningPopup">

          <button
            className="miningCloseBtn"
            onClick={this.closePopup}
          >
            ×
          </button>

          {/* IMAGE */}

          <img
            src={miningUpdateImage}
            alt="Mining System Update"
            className="miningImage"
          />

          {/* CONTENT */}

          <div className="miningContent">

          <h1>
            🚀 WE ARE FULLY BACK!
          </h1>

          <p>
            ✅ Maintenance Successfully Completed
          </p>

          <p>
            ⚙️ Our platform systems have been successfully
            optimized and upgraded to provide a faster,
            smoother, and more reliable experience for all users.
          </p>

          <p>
            ⛏️ Blockchain mining activation is now working
            successfully and mining operations are active again.
          </p>

          <p>
            🚀 Investors can now continue activating mining
            packages and growing their investments with confidence.
          </p>

          <div className="miningInfoBox">

            <p>
              ✅ Mining Activation Working Successfully
            </p>

            <p>
              ✅ Faster & More Stable Platform
            </p>

            <p>
              ✅ Improved User Experience
            </p>

            <p>
              ✅ Secure & Transparent Operations
            </p>

          </div>

          <p className="thankYouText">
            💚 Thank you for your patience,
            trust, and continued support
            throughout the maintenance period.
          </p>

          <div className="companyText">
            CAPGAINCO.COM <br />
            Grow Together. Succeed Together.
          </div>

        </div>
        </div>
      </div>
    );
  }
}

export default MiningUpdatePopup;