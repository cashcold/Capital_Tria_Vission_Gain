import React, { Component } from "react";
import "./InvestorFeePopup.css";

class InvestorFeePopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    };
  }

  handleClose = () => {
    this.setState({ isOpen: false });
  };

  render() {
    if (!this.state.isOpen) return null;

    return (
      <div className="investor-popup-overlay">
        <div className="investor-popup-card">
          <button
            className="investor-popup-close"
            onClick={this.handleClose}
            aria-label="Close notification"
          >
            ×
          </button>

          <div className="investor-popup-glow" />

          <div className="investor-popup-badge">Investor Notice</div>

          <h2>Service Fee Update</h2>

          <p className="investor-popup-lead">
            Dear Investor, please be informed that this service fee will officially take effect starting next month (May), and will be deducted from every withdrawal made on your investment account.
          </p>

          <p className="investor-popup-text">
            This fee supports secure transaction processing, platform maintenance,
            and continued improvement of our investor services.
          </p>

          <div className="investor-popup-examples">
            <p className="investor-popup-quote">
              "Example of service fee deduction (31.4%):"
            </p>
            <ul>
              <li>Withdrawal profit ₵10 → Fee 31.4% → You receive ₵6.86</li>
              <li>Withdrawal profit ₵50 → Fee 31.4% → You receive ₵34.30</li>
              <li>Withdrawal profit ₵80 → Fee 31.4% → You receive ₵54.88</li>
              <li>Withdrawal profit ₵300 → Fee 31.4% → You receive ₵205.80</li>
            </ul>
          </div>

          <div className="investor-popup-info">
            <span>Applies to:</span>
            <strong>All investor withdrawals</strong>
          </div>

          <button className="investor-popup-action" onClick={this.handleClose}>
            I Understand
          </button>
        </div>
      </div>
    );
  }
}

export default InvestorFeePopup;