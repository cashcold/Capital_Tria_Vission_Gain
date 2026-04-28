import React, { Component } from "react";
import "./MiningFeePopup.css";
import miningFeeImage from "./MiningImage.png";

class MiningFeePopup extends Component {
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
      <div className="mining-popup-overlay">
        <div className="mining-popup-card">
          <button className="mining-close-btn" onClick={this.closePopup}>
            ×
          </button>

          <div className="mining-popup-image-box">
            <img
              src={miningFeeImage}
              alt="Mining Infrastructure Fee Notice"
              className="mining-popup-image"
            />
          </div>

          <div className="mining-popup-content">
            <h2>📢 Important Notice – Mining Infrastructure Fee</h2>

            <p>Dear Valued Investors,</p>

            <p>
              Just as every company has a closing date for wages and operational
              costs, <strong>Capgainco.com</strong> also maintains a schedule for
              its mining infrastructure fees.
            </p>

            <div className="mining-date-box">
              📅 <strong>Closing Date:</strong> 27th April
            </div>

            <div className="mining-warning-box">
              <h3>⚠️ Important:</h3>
              <p>
                If the infrastructure mining fee is not paid by the due date, it
                will be <strong>automatically deducted from your mining profits</strong>.
              </p>
            </div>

            <p>
              💡 To avoid any deductions, we kindly encourage all investors to
              <strong> make payment before the deadline</strong>.
            </p>

            <p>
              🙏 Thank you for your cooperation and continued support.
            </p>

            <p className="mining-footer-text">
              💚 <strong>Capgainco.com – Grow Together. Succeed Together.</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default MiningFeePopup;