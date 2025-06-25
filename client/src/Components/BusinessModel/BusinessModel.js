// BusinessModel.js
import React, { Component } from 'react';
import './BusinessModel.css'; // link to the CSS file

class BusinessModel extends Component {
  render() {
    return (
      <div className="business-model-container">
        <h1 className="title">Bitcoin Cloud Mining Business Model</h1>
        <h2 className="company-name">Capital Gain Management Co.</h2>

        <section className="section">
          <h3>🔷 Introduction</h3>
          <p>
            Capital Gain Management Co. is a next-generation crypto cloud mining company designed to help anyone earn passive income daily by investing in mining power without the cost, noise, or complexity of physical mining equipment.
          </p>
          <p>Capital Gain Management Co. is an international Bitcoin cloud mining and diversified farm investment company. We combine secure, high-performance cryptocurrency mining with real-world agricultural ventures to provide stable daily profits for all investors.

          Our agricultural projects include fish farming, poultry (chickens, ducks, guinea fowl), goat farming, snail farming, rabbit farming, pig farming, sheep and cattle farming, bee keeping for honey production, and a variety of crops such as vegetables (peppers, tomatoes, okra), plantain, maize, cassava, and mushrooms.
            By blending technology with practical agriculture, we ensure multiple streams of revenue and reduce risk for our community. This means you can earn daily — with trust, transparency, and real-world sustainability behind every payout.</p>
        </section>

        <section className="section">
          <h3>⚙️ How Our Bitcoin Cloud Mining System Works</h3>
          <ul>
            <li><strong>Mining Infrastructure:</strong> High-performance mining hardware hosted in energy-efficient data centers, mining BTC and more.</li>
            <li><strong>User Hashrate Allocation:</strong> Users buy GH/s or TH/s, and profits are distributed based on their Plan.</li>
            <li><strong>Real-Time Mining:</strong> 24/7 mining, automated tracking based on network difficulty and coin prices.</li>
            <li><strong>Profit Distribution:</strong> Daily payouts are made in full according to the selected mining plan.</li>

          </ul>
        </section>

        <section className="section">
          <h3>💰 Example of Daily User Earnings</h3>
          <div className="table-responsive">
            <table className="earnings-table">
              <thead>
                <tr>
                  <th>Mining Plan</th>
                  <th>Hashrate</th>
                  <th>Profit Earnings</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>24HRS DAILY </td>
                  <td>14.5 TH/s</td>
                  <td>10%</td>
                </tr>
                <tr>
                  <td>3 DAYS</td>
                  <td>1.6W/MH</td>
                  <td>15%</td>
                </tr>
                <tr>
                  <td>5 DAYS</td>
                  <td> 65TH/s</td>
                  <td>20%</td>
                </tr>
                <tr>
                  <td>7 DAYS</td>
                  <td> 110 TH/s</td>
                  <td>25%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="section">
          <h3>🧩 Platform Features</h3>
          <ul>
            <li>✅ Secure Dashboard</li>
            <li>📈 Live Mining Stats</li>
            <li>🛡 Secure Wallet Withdrawals</li>
            <li>🤝 Referral Income Program</li>
            <li>🔔 Daily Payouts Instant</li>
          </ul>
        </section>

        <section className="section">
          <h3>📈 Future Developments</h3>
          <ul>
            <li>🌍 Mobile App for easy tracking</li>
            <li>🪙 Token-based reward boosting</li>
            <li>🎁 NFT-based mining plans</li>
            <li>🤖 AI-optimized profitability</li>
          </ul>
        </section>

        <section className="section">
          <h3>🔚 Conclusion</h3>
          <p>
            Capital Gain Management Co. gives everyone—from beginners to pros—an easy and secure way to profit from crypto mining. Join us today and watch your digital capital grow!
          </p>
        </section>
      </div>
    );
  }
}

export default BusinessModel;
