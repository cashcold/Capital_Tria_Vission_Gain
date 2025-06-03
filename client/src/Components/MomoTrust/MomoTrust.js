import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity } from '@fortawesome/free-solid-svg-icons';
import "./MomoTrust.css";


class MomoTrust extends Component {

  render() {

    const banks = [
    "GCB Bank",
    "Ecobank Ghana",
    "Absa Bank Ghana",
    "Fidelity Bank Ghana",
    "Zenith Bank Ghana",
    "Stanbic Bank Ghana",
    "Societe Generale Ghana",
    "UBA Ghana",
    "First National Bank Ghana",
    "Agricultural Development Bank (ADB)",
    "Consolidated Bank Ghana (CBG)",
    "CalBank",
    "Prudential Bank Ghana",
    "... and all other regulated financial institutions",
  ];
    return (
      <div className="confetti-wrapper">
        <div className="floating-background">
          {[...Array(20)].map((_, i) => (
            <span className="float-circle" key={i}></span>
          ))}
        </div>

        <div className="momo-container">
          <h3>📢 Attention Ghanaian Investors!</h3>
          <h2 className="headline animate-slide-in">
            🇬🇭 100% TRUSTED & TRANSPARENT INVESTMENT FOR GHANAIANS
          </h2>

          <p className="intro animate-fade-in">
            💡 <strong>Invest with Peace of Mind – Using What You Know & Trust</strong>
          </p>

          <p className="highlight animate-slide-in">
            At Capital Gain, we believe investment should never feel risky or confusing. That’s why we proudly accept Ghana’s most trusted payment methods — <strong>Mobile Money (MoMo)</strong> and <strong>Bank Transfers from all major Ghanaian banks</strong>.
          </p>

          <div className="section animate-slide-up">
            <h3>📲 Why Ghanaians Choose MoMo & Bank Transfer</h3>
            <ul className="list">
              <li>✅ No need for a crypto wallet — start directly from your phone</li>
              <li>✅ Easy deposits and Withdrawals using familiar platforms: MoMo or your local bank</li>
              <li>✅ Instant confirmations via SMS or Email</li>
              <li>✅ Real-time BTC conversion rate shown clearly on your dashboard</li>
              <li>✅ Full transaction history — transparent and traceable</li>
              <li>✅ Hassle-free withdrawals back to MoMo or your bank</li>
            </ul>
          </div>

          <div className="section animate-slide-in">
            <h3>🏦 Banks We Support for Deposits & Withdrawals</h3>
            <p>Whether you bank online or walk into a branch, you're covered. We accept transfers from:</p>
                <ul className="list">
                {banks.map((bank, index) => (
                  <li key={index}>
                    <FontAwesomeIcon icon={faUniversity} className="mr-2 text-blue-500" />
                    {bank}
                  </li>
                ))}
    </ul>

          </div>
        <div className="floating-background">
          {[...Array(21)].map((_, i) => (
            <span className="float-circle" key={i}></span>
          ))}
        </div>
          <div className="section animate-fade-in">
            <h3>🔐 Built on Transparency, Backed by Godly Integrity</h3>
            <p>
              We are a faith-led platform with a mission to bless and empower every investor. Every MoMo or bank transaction is:
            </p>
            <ul className="list">
              <li>✅ Confirmed instantly — no delays, no confusion</li>
              <li>✅ Fully recorded on your dashboard</li>
              <li>✅ Paired with real BTC conversion — no guesswork</li>
              <li>✅ Withdrawable at any time — to MoMo, bank, or BTC wallet</li>
            </ul>
          </div>

          <div className="section contact-section animate-slide-up">
            <h3>📞 Need Help? Talk to Our Ghana Support Team ➡️ <strong>BTC SHARK TRADE</strong></h3>
            <p>We're not just online. We're here for you — personally and directly:</p>
            <ul className="contact-list">
              <li>📱 <strong>Support Lines:</strong></li>
              <li>• 020 380 8479</li>
              <li>• 026 825 3787</li>
              <li>💬 <strong>WhatsApp:</strong> <a href="https://wa.me/0203808479" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></li>
              <li>✉️ <strong>Email:</strong> <a href="mailto:btcsharktrade@gmail.com">btcsharktrade@gmail.com</a></li>
            </ul>
            <p className="closing-note">
              🙌 Join hundreds of trusted Ghanaians investing securely with what they already use — MoMo & their local bank.
            </p>
          </div>
          <div className="floating-background">
          {[...Array(22)].map((_, i) => (
            <span className="float-circle" key={i}></span>
          ))}
        </div>
          <section className="btc_shark_trade_cert">
            <div className="btc-footer-notice">
              <div className="btc-container">
                <p>
                  Investment Deposit and Withdrawals payment are made through Mobile Money and Bank Transfers to  company name in Ghana BTC SHARK TRADE: also Known as BITCOIN SHARK TRADE
                </p>
                <p className="btc-highlight">➡️ <strong>BTC SHARK TRADE</strong></p>
                <p>
                  <em>Registered under the Office of the Registrar of Companies, Republic of Ghana.</em>
                </p>
                <p className="btc-note">✅ Fast &nbsp; ✅ Safe &nbsp; ✅ Fully Verified</p>

                <div className="btc-certificate">
                  <p><strong>Business Certificate:</strong></p>
                  <img
                    src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2Fbtc_sbark_trade_cert.jpg?alt=media&token=57bbd3d2-81db-4242-8d02-8f8fd63226d1"
                    alt="BTC SHARK TRADE Certificate"
                  />
                </div>
                 <div className="floating-background">
                    {[...Array(23)].map((_, i) => (
                      <span className="float-circle" key={i}></span>
                    ))}
                  </div>
              </div>
            </div>
          </section>
        </div>
        <div className="floating-background">
          {[...Array(24)].map((_, i) => (
            <span className="float-circle" key={i}></span>
          ))}
        </div>
      </div>
    );
  }
}

export default MomoTrust;
