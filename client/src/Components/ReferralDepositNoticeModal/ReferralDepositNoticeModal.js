import React from "react";
import "./ReferralDepositNoticeModal.css";

class ReferralDepositNoticeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: 35
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    if (this.props.show && !prevProps.show) {
      this.setState({ countdown: 30 });
      this.startTimer();
    } else if (!this.props.show && prevProps.show) {
      this.clearTimer();
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      this.setState((prevState) => {
        const newCountdown = prevState.countdown - 1;
        if (newCountdown <= 0) {
          this.clearTimer();
          if (this.props.onClose) {
            this.props.onClose();
          }
          return { countdown: 0 };
        }
        return { countdown: newCountdown };
      });
    }, 500);
  }

  clearTimer = () => {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const { show, onClose, referralLink = "https://capgainco.com/?ref=YOUR_USERNAME" } = this.props;
    if (!show) return null;

    return (
      <div className="rdnOverlay" onClick={onClose}>
        <div className="rdnCard pop" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="rdnTop">
            <div className="rdnIcon">💼</div>

            <div className="rdnHeadText">
              <h3 className="rdnTitle">Accessing Higher Deposit Plans</h3>
              <p className="rdnSub">
                Grow the community • Unlock higher plans
              </p>
            </div>

            <span className="rdnPill">📲 CapGainCo</span>
          </div>

          {/* Body */}
          <div className="rdnBody">
            <div className="rdnNotice">
              <div className="rdnNoticeIcon">⚠️</div>
              <div className="rdnNoticeText">
                <div className="rdnNoticeTitle">Important Notice</div>
                <div className="rdnNoticeDesc">
                  Before you can deposit <strong>50 GHC or more</strong>, you must complete
                  the required number of referrals using your referral link.
                </div>
              </div>
            </div>

            <div className="rdnTextBlock">
              <p>
                At <strong>CapGainCo</strong>, we reward members who actively help grow our community.
              </p>

              <p className="rdnEmphasis">
                👉 You must complete the required referrals before you can invest{" "}
                <strong>50 GHC and above</strong>.
              </p>
            </div>

            <div className="rdnDepositRule">
              <div className="rdnDepositRuleTop">
                <span className="rdnDot">⚠️</span>
                <span className="rdnDepositRuleTitle">Important Deposit Notice</span>
              </div>

              <p className="rdnDepositRuleText">
                On <strong>capgainco.com</strong>, only <strong>50 GHC</strong> is required for activation
                of this plan.
              </p>

              <p className="rdnDepositRuleText">
                👉 If you send more than <strong>50 GHC</strong>, the extra amount will be sent back to
                your account.
              </p>
            </div>

            <div className="rdnSteps">
              <h4 className="rdnStepsTitle">✅ What You Need To Do</h4>

              <div className="rdnStep">
                <span className="rdnStepIcon">1️⃣</span>
                <span>Share your referral link with friends and family</span>
              </div>

              <div className="rdnStep">
                <span className="rdnStepIcon">2️⃣</span>
                <span>Let them register on <strong>capgainco.com</strong> through your link</span>
              </div>

              <div className="rdnStep">
                <span className="rdnStepIcon">3️⃣</span>
                <span>Complete the required number of referrals</span>
              </div>

              <div className="rdnStep">
                <span className="rdnStepIcon">4️⃣</span>
                <span>
                  Once done, you will be allowed to deposit <strong>50 GHC and above</strong>
                </span>
              </div>
            </div>

            {/* Referral Link box */}
            <div className="rdnLinkBox">
              <div className="rdnLinkTop">
                <span className="rdnLinkIcon">🔗</span>
                <span className="rdnLinkTitle">Your Referral Link</span>
              </div>

              <div className="rdnLinkRow">
                <span className="rdnLinkText">{referralLink}</span>
                <button
                  className="rdnCopyBtn"
                  onClick={() => {
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(referralLink);
                    }
                  }}
                >
                  📋 Copy
                </button>
              </div>

              <div className="rdnHint">
                Tip: Send this link on WhatsApp, SMS, or share to friends.
              </div>
            </div>

            {/* Footer button */}
            <div className="rdnFooter">
              <button className="rdnCloseBtn" onClick={onClose}>
                Okay, I Understand continue deposit ✅
              </button>
              <div className="rdnCountdown">
                Auto-closing in {this.state.countdown}s
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReferralDepositNoticeModal;
