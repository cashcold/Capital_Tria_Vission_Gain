import React, { Component } from "react";
import "./WithdrawalUpgradePopup.css";
import popupImage from "./paymentNoties.png";

class WithdrawalUpgradePopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: true,
    };
  }

  closePopup = () => {
    this.setState({
      isVisible: false,
    });
  };

  render() {
    if (!this.state.isVisible) {
      return null;
    }

    return (
      <div className="withdrawalOverlay">
        <div className="withdrawalContainer">

          <button
            className="withdrawalCloseBtn"
            onClick={this.closePopup}
          >
            ×
          </button>

          <img
            src={popupImage}
            alt="Withdrawal Upgrade Notice"
            className="withdrawalImage"
          />

          <div className="withdrawalContent">

            <h2>📢 IMPORTANT ANNOUNCEMENT</h2>

            <p>
              ⚙️ We are upgrading our payment system to serve you
              better and more reliably.
            </p>

            <p>
              📌 We wish to inform you that if your recent withdrawal
              was not successful, it may have been caused by a
              temporary issue with the MoMo API payment system.
            </p>

            <p>
              ✅ Kindly note that your withdrawal amount has been
              fully reversed and credited back to your account.
            </p>

            <p>
              🔒 Your funds remain safe and intact.
            </p>

            <p>
              🚫 We do not keep anyone’s money in pending.
              Your trust and security are our top priority.
            </p>

            <h3>🏦 CURRENT WITHDRAWAL METHOD</h3>

            <p>
              💳 GHANA BANK — Bank to Bank Transfer
            </p>

            <p>
              💬 Anyone who is ready for bank payment can kindly
              chat with the administration for assistance.
            </p>

            <p>
              🙏 Thank you for your patience and continued trust.
            </p>

            <strong>
              CAPGAINCO.COM <br />
              Grow Together. Succeed Together.
            </strong>

          </div>
        </div>
      </div>
    );
  }
}

export default WithdrawalUpgradePopup;