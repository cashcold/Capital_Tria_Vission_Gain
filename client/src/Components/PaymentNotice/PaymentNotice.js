import React from "react";
import "./PaymentNotice.css";

// 🔥 Import images
import momoImg from "../../images/mobile-money.jpg";
import usdtImg from "../ConnfirmDeposit/usdt.png";

const PaymentNotice = () => {
  return (
    <div className="payment-notice">
      <div className="notice-card">

        <h2 className="notice-title">
          🚀 Payment Update – Now Accepting USDT!
        </h2>

        <p className="notice-text">
          📱 Momo Payment and Bank Transfers are still available for all users in Ghana.
          You can easily invest using Mobile Money or Bank Transfer anytime.
        </p>

        {/* 🔥 Highlight */}
        <div className="highlight-box">
          💲 <strong>NEW:</strong> You can now invest using <b>USDT (TRC20)</b> for fast and secure global payments 🌍
        </div>

        {/* 🔥 FEATURES */}
        <div className="features">
          <div className="feature">⚡ Fast Transactions</div>
          <div className="feature">🔐 Secure Blockchain</div>
          <div className="feature">🌍 Global Access</div>
          <div className="feature">💸 Low Fees</div>
        </div>

        {/* 🔥 EXAMPLE */}
        <div className="example-box">
          📊 Example:
          <br />
          Deposit GHS 50 → Earn GHS 55 in 24hrs (10% profit)
        </div>

        {/* 🔥 PAYMENT METHODS WITH IMAGES */}
        <div className="methods">
          <h4>💳 Payment Methods</h4>

          <div className="method-item">
            <img src={momoImg} alt="MoMo" />
            <span>Mobile Money (MoMo)</span>
          </div>

          <div className="method-item">
            <img src={usdtImg} alt="USDT" />
            <span>USDT (TRC20)</span>
          </div>
           <div className="method-item">
            <span className="bank-icon">🏦</span>
            <span>Bank Transfer</span>
          </div>

          {/* <div className="method-item">
            <span className="bank-icon">🏦</span>
            <span>Bank Transfer</span>
          </div>

             <div className="method-item global">
          <span className="icon">🌐</span>
          <span>PayPal</span>
        </div>

        <div className="method-item global cashapp">
          <span className="icon">💵</span>
          <span>Cash App</span>
        </div>

        <div className="method-item global">
          <span className="icon">💼</span>
          <span>Skrill</span>
        </div>

        <div className="method-item global">
          <span className="icon">💎</span>
          <span>Perfect Money</span>
        </div> */}
{/* 
        <div className="method-item global">
          <span className="icon">🏧</span>
          <span>Payoneer</span>
        </div>

        <div className="method-item bank">
          <span className="icon">🌍</span>
          <span>Wise</span>
        </div>

        <div className="method-item bank">
          <span className="icon">🏦</span>
          <span>SWIFT Transfer</span>
        </div>
        <div className="method-item global">
          <span className="icon">💳</span>
            <span>Stripe</span>
          </div>

          <div className="method-item global">
            <span className="icon">📱</span>
            <span>Apple Pay</span>
          </div>

          <div className="method-item global">
            <span className="icon">🤖</span>
            <span>Google Pay</span>
          </div>

          <div className="method-item crypto">
            <span className="icon">🟡</span>
            <span>Binance Pay</span>
          </div>

          <div className="method-item local">
            <span className="icon">🌍</span>
            <span>Flutterwave</span>
          </div> */}

        <div className="method-item ">
          <span className="icon">💳</span>
          <span>Visa</span>
        </div>

        <div className="method-item ">
          <span className="icon">💳</span>
          <span>Mastercard</span>
        </div>
        </div>

        {/* 🔥 BUTTON */}
        <button className="start-btn">
          🚀 Start Mining  Now
        </button>

      </div>
    </div>
  );
};

export default PaymentNotice;