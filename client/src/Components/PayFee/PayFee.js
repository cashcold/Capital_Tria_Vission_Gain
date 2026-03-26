import React, { Component } from "react";
import "./PayFee.css";
import axios from "axios";

class PayFee extends Component {
  constructor(props) {
    super(props);

    const storedData = JSON.parse(
      sessionStorage.getItem("payFeeData")
    ) || {};

    this.state = {
      user: storedData.user || {},
      username: storedData.username || "",
      bitcoin: storedData.bitcoin || "",
      unpaidRecords: storedData.unpaidRecords || [],
      totalFees: storedData.totalFees || 0
    };
  }

  handleConfirmPayment = async () => {
  try {
    const Amount_to_send = Number(this.state.totalFees);

    const payload = {
      user_id: this.state.user?._id, // optional
      username: this.state.username,
      totalFees: Amount_to_send,
      paymentMethod: "MoMo", // or "USDT" (you can make dynamic later)
      status: "pending",
      date: new Date()
    };

    // ✅ Send to backend
    await axios.post("/users/pay-fee", payload);

    // ✅ Clear session
    sessionStorage.removeItem("payFeeData");

    alert("Payment submitted successfully!");

    window.location = "/dashboard";

  } catch (error) {
    console.error(error);
    alert("Something went wrong. Try again.");
  }
};

  render() {
    const Amount_to_send = Number(this.state.totalFees);
    const RATE = 12; // 1 USDT = 15 GHC (you can change this anytime)
    const usdtAmount = Amount_to_send / RATE;

    return (
      <div className="pay-fee-wrapper">
        <div className="pay-fee-card">

          <h2>💰 Mining Service Fee Payment</h2>

          {/* ================= MOBILE MONEY FIRST ================= */}
          <div className="confirmBtnInfo">

            <h3>📱 Mobile Money Payment</h3>

            <p>
              🆔 Kindly use your User Name
              <span> {this.state.username} </span>
               as the <strong>Reference ID / Description</strong>.
            </p>

            <p>
              💰 Please send exactly
              <span className="outAmount1">
                {" "} {Amount_to_send.toLocaleString()} GHC
              </span>
               via Mobile Money.
            </p>
{/* 
            <p>
              📱 <strong>Primary Payment (AirtelTigo MoMo)</strong><br />
              🔵 <span className="walletNumber">0268253787</span><br />
              👤 Account Name: <strong>Ainoo Frank</strong>
            </p> */}

            <p>
              📱 <strong>Primary Payment (Vodafone MoMo)</strong><br />
              🔴 <span className="walletNumber">0204967725</span><br />
              👤 Account Name: <strong>Ainoo Frank</strong>
            </p>
{/* 
            <p className="note">
              👉 Please try AirtelTigo first.
              If it fails, use Vodafone.
            </p> */}

            <h4>
              ⏳ Order Status:
              <span className="status"> Waiting for payment</span>
            </h4>

            <button
            className="confirm-btn"
            onClick={this.handleConfirmPayment}
          >
            I Have Made Payment
          </button>

          </div>

          <hr />

          {/* ================= BITCOIN BELOW ================= */}
          <div className="btc-section">

            <h3>₿ Cryptocurrency Payment</h3>

            <p>Please Send only USDT (TRC20). Do not send other networks:</p>
            <p>
            💲 Send exactly:
                <span className="outAmount1">
                    {" "} {usdtAmount.toFixed(2)} USDT
                </span>
            </p>

            <div className="btc-box">
              TMmpdCUFH9xJ5efivRdyAw8MBVGqdsJmpX
            </div>
            <p>Address</p>

          </div>

          <button
            className="confirm-btn"
            onClick={this.handleConfirmPayment}
          >
            I Have Made Payment
          </button>

        </div>
      </div>
    );
  }
}

export default PayFee;