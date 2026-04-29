import React, { Component } from "react";
import "./ReferralBonusPopup.css";
import referralBonusImage from "./7037.png";

class ReferralBonusPopup extends Component {
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
    if (!this.state.showPopup) return null;

    return (
      <div className="referralOverlay">
        <div className="referralPopup">
          <button className="referralClose" onClick={this.closePopup}>
            ×
          </button>

          <img
            src={referralBonusImage}
            alt="Referral Bonus Update"
            className="referralImage"
          />

          <div className="referralContent">
            <h2>🎁 Exciting Referral Bonus Update!</h2>

            <p>
              Dear Valued Investors, starting from{" "}
              <strong>1st May 2026</strong>, every time your referral makes
              their first deposit, you will receive{" "}
              <strong>10% referral cashout instantly</strong>.
            </p>

            <div className="referralBox">
              <p>💰 Referral deposits GHC 50 → You earn GHC 5</p>
              <p>💰 Referral deposits GHC 100 → You earn GHC 10</p>
              <p>💰 Referral deposits GHC 500 → You earn GHC 50</p>
              <p>💰 Referral deposits GHC 1000 → You earn GHC 100</p>
            </div>

            <p>
              🚀 The more people you refer, the more you earn. Start inviting
              your friends and grow your earnings with Capgainco.com.
            </p>

           
          </div>
        </div>
      </div>
    );
  }
}

export default ReferralBonusPopup;