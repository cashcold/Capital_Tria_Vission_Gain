import React, { useState, useEffect } from "react";
import "./WithdrawNoticeModal.css";

const WithdrawNoticeModal = ({ user_Name, activetDeposit, bitcoin, date }) => {
  const [visible, setVisible] = useState(true);
  const [countdown, setCountdown] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          goDashboard();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const goDashboard = () => {
    setVisible(false);
    window.location = "/dashboard";
  };

  if (!visible) return null;

  // ✅ ring now matches 30 seconds
  const total = 30;
  const progress = (total - countdown) / total;
  const circumference = 2 * Math.PI * 44;
  const offset = circumference - progress * circumference;

  return (
    <div className="wnOverlay">
      <div className="wnCard pop">
        {/* HEADER */}
        <div className="wnTop">
          <div className="wnIcon">✅</div>
          <div className="wnText">
            <h3 className="wnTitle">Withdrawal Submitted</h3>
            <p className="wnSub">
              Payments are released instantly from our system.
            </p>
          </div>
          <span className="wnPill">📲 MoMo</span>
        </div>

        {/* BODY MESSAGE */}
        <div className="wnBody">
          <p>Hello <strong>{user_Name}</strong>,</p>

          <p>✅ <strong>Payment Sent Successfully</strong></p>
          <p>
            🎉 Congratulations! Your withdrawal amount of{" "}
            <strong>GHC {activetDeposit}.00</strong> has been successfully completed.
          </p>

          <p>
            📲 Funds have been sent to your <strong>Mobile Money (MoMo)</strong>{" "}
            number linked to your account: <strong>{bitcoin}</strong>.
          </p>

          <p>⏳ Please allow a short moment for the payment to reflect in your wallet.</p>

          <p><strong>🔹 Transaction Details:</strong></p>
          <ul>
            <li>💰 Amount: <strong>GHC {activetDeposit}.00</strong></li>
            <li>🗓 Date: <strong>{date}</strong></li>
            <li>🏦 MoMo Number: <strong>{bitcoin}</strong></li>
          </ul>

          <p>
            ✅ If you have any questions,{" "}
            <a
              href="mailto:support@capgainco.com"
              style={{ color: "red", textDecoration: "none" }}
            >
              <strong>contact support</strong>
            </a>.
          </p>

          <p>Best regards,</p>
          <p style={{ fontWeight: "bold" }}>💼 Capital Gain Payments Team</p>

          {/* PROGRESS RING */}
          <div className="wnFooter">
            <div className="wnRingWrap">
              <svg className="wnRing" width="96" height="96" viewBox="0 0 96 96">
                <circle className="wnRingBg" cx="48" cy="48" r="44" />
                <circle
                  className="wnRingFg"
                  cx="48"
                  cy="48"
                  r="44"
                  style={{
                    strokeDasharray: circumference,
                    strokeDashoffset: offset,
                  }}
                />
              </svg>

              <div className="wnRingText">
                <div className="wnRingNum">{countdown}s</div>
                <div className="wnRingSub">Redirecting</div>
              </div>
            </div>

            <button className="wnCloseBtn" onClick={goDashboard}>
              Okay, I Understand — Go to Dashboard
            </button>
            <div className="wnCountdown">
              Auto-redirecting in {countdown}s
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawNoticeModal;
