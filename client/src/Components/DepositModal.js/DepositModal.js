import React from "react";
import "./DepositModal.css";

class DepositModal extends React.Component {
  state = {
    visible: true
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  render() {
    if (!this.state.visible) return null;

    return (
      <div className="dnOverlay">
        <div className="depositNotice pop">

          <div className="dnTop">
            <div className="dnIcon">💾</div>

            <div className="dnText">
              <h3 className="dnTitle">Deposit Saved Successfully</h3>
              <p className="dnSub">
                Your deposit has been received and stored in our database.
              </p>
            </div>

            <span className="dnPill">⏳ Processing</span>
          </div>

          <div className="dnBody">
            <p className="dnInfo">
              ⏱️ Please wait <strong>5–10 minutes</strong> for network verification.
              Mining updates will reflect automatically once confirmed.
            </p>

            <div className="dnSteps">
              <div className="dnStep">
                <span className="dnDot">💰</span>
                <span>Deposit received and logged</span>
              </div>

              <div className="dnStep">
                <span className="dnDot">🔄</span>
                <span>Verification in progress</span>
              </div>

              <div className="dnStep">
                <span className="dnDot">📊</span>
                <span>Mining updates will show on your dashboard</span>
              </div>
            </div>

            <div className="dnBar">
              <span className="dnBarFill"></span>
            </div>

            <p className="dnHint">
              ❗ If it does not update after <strong>10 minutes</strong>,
              please contact support with your Reference ID.
            </p>

            {/* Bottom Close Button */}
            <div className="dnCloseBottomWrap">
              <button className="dnCloseBottom" onClick={this.closeModal}>
                Continue to Dashboard
              </button>
            </div>

          </div>

        </div>
      </div>
    );
  }
}

export default DepositModal;
