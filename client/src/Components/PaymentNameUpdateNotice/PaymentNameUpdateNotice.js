import React, { Component } from "react";
import "./PaymentNameUpdateNotice.css";

class PaymentNameUpdateNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: true,
    };
  }

  handleClose = () => {
    this.setState({ showPopup: false });
  };

  render() {
    const { showPopup } = this.state;

    if (!showPopup) return null;

    return (
      <div className="popup-overlay">
        <div className="popup-modal">
          <button className="close-btn" onClick={this.handleClose}>
            ×
          </button>

          <div className="container popup-container">
            <div className="left-section">
              <span className="badge">Important Payment Verification Notice</span>

              <h1 className="main-title">
                Update your full name to match your payment number details
              </h1>

              <p className="subtitle">
                To avoid payment delays, all investors must ensure that their
                full name is entered exactly as it appears on the payment number
                record.
              </p>

              <div className="info-grid">
                <div className="info-card">
                  <h3>Why this matters</h3>
                  <p>
                    Name mismatches may cause verification issues and can delay
                    payment processing.
                  </p>
                </div>

                <div className="info-card">
                  <h3>Effective immediately</h3>
                  <p>
                    This directive takes effect immediately under company
                    governing rules.
                  </p>
                </div>
              </div>
            </div>

            <div className="notice-card">
              <div className="card-header">
                <div>
                  <small>Compliance Update</small>
                  <h2>Action Required</h2>
                </div>
                <div className="urgent">Urgent</div>
              </div>

              <div className="detail-box">
                <h4>Instruction</h4>
                <p>
                  Please update your full name so it matches the name registered
                  on your payment number.
                </p>
              </div>

              <div className="detail-box">
                <h4>Consequence</h4>
                <p>
                  If your name does not match, your payment may be delayed until
                  it is corrected.
                </p>
              </div>

              <div className="detail-box">
                <h4>Authority</h4>
                <p>
                  This instruction is issued under the governing rules approved
                  by company authority.
                </p>
              </div>

              <div className="button-group">
                <button className="btn-primary btn-lg"><a href="/dashboard/edit">Update Full Name</a></button><br/>
                <button className="btn-secondary btn-lg" onClick={this.handleClose}>
                  Close
                </button>
              </div>

              <p className="footer-note">
                Please complete this update as soon as possible to prevent delays
                in payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentNameUpdateNotice;