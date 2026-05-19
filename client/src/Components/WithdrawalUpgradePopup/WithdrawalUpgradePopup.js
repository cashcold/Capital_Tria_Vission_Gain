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
  ⚙️ BTC SHARK TRADE & CapGainCo are committed to giving you more flexibility and faster investments!
</p>

<p>
  📌 You can now buy **two packages at the same time** to maximize your growth and returns.
</p>

<h3>💰 PAYMENT OPTIONS AVAILABLE</h3>

<p>
  💵 <strong>Mobile Money (MoMo)</strong> — MTN, Vodafone, AirtelTigo, G-Money. Fast, secure, and convenient.
</p>

<p>
  🏦 <strong>Bank Transfer</strong> — Safe, reliable, and trusted for all Ghanaian banks.
</p>

<p>
  💱 <strong>USDT Payment</strong> — Pay using Tether (USDT) for crypto-savvy investors.  
  Quick and borderless.
</p>

<p>
  🔒 Your funds remain secure at all times. We do not hold anyone’s money in pending status.
</p>

<p>
  💬 For assistance with any payment option, please contact our administration team.
</p>

<strong>
  CAPGAINCO.COM <br />
  BTC SHARK TRADE — Registered Company in Ghana 🇬🇭 <br />
  Grow Together. Succeed Together.
</strong>
          </div>
        </div>
      </div>
    );
  }
}

export default WithdrawalUpgradePopup;