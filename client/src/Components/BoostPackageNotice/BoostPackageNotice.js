import React, { Component } from "react";
import "./BoostPackageNotice.css";
import boostPoster from "./boostPoster.png";

class BoostPackageNotice extends Component {
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

  handleBuyNow = () => {
    // redirect page
    window.location.href = "/dashboard-boost-package";
  };

  render() {

    const { popup } = this.props;

    // hide popup only in popup mode
    if (popup && !this.state.showPopup) {
      return null;
    }

    return (
      <div
        className={
          popup
            ? "boostOverlay"
            : "dashboardBoostWrapper"
        }
      >

        <div className="boostCard">

          {/* close button only popup */}
          {popup && (
            <button
              className="closeBtn"
              onClick={this.closePopup}
            >
              ×
            </button>
          )}

          <img
            src={boostPoster}
            alt="Boost Package"
            className="boostImage"
          />

          <div className="boostContent">

            <h1>🚀 14-DAY BOOST PACKAGE</h1>

            <div className="packageGrid">

              <div className="packageBox">
                <span>📈 Profit</span>
                <h2>30%</h2>
              </div>

              <div className="packageBox">
                <span>⏳ Duration</span>
                <h2>14 Days</h2>
              </div>

            </div>

            <div className="packageGrid">

              <div className="packageBox">
                <span>💰 Minimum</span>
                <h2>1300 GHC</h2>
              </div>

              <div className="packageBox">
                <span>🏦 Maximum</span>
                <h2>2500 GHC</h2>
              </div>

            </div>

            <div className="serviceFee">
              ✅ Reduced Withdrawal Service Fee — ONLY 20%
            </div>

            <p className="description">
              Unlike our regular plans with a 31.4%
              withdrawal service fee, this special
              package comes with a LOWER 20% service
              fee to help you keep more of your earnings.
            </p>

            <div className="benefits">

              <div className="benefit">
                📈 Fast Growth
              </div>

              <div className="benefit">
                💰 Better Returns
              </div>

              <div className="benefit">
                ⚡ Faster Cycles
              </div>

            </div>

            <button
              className="buyBtn"
              onClick={this.handleBuyNow}
            >
              VIEW PACKAGE
            </button>

            <div className="footerText">
              CAPGAINCO.COM <br />
              Grow Together. Succeed Together.
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default BoostPackageNotice;