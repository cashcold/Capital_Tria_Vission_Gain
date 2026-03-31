import React, { Component } from "react";
import "./DepositAndMiningPlanUpdate.css";

class DepositAndMiningPlanUpdate extends Component {
  render() {
    return (
      <div className="update-page">
        <div className="update-container">
          <div className="hero-box">
            <div className="badge-row">
              <span className="badge badge-gold">Mining Platform Update</span>
              <span className="badge badge-red">Effective April 5th</span>
            </div>

            <h1 className="main-title">
              Mining Plans Have Changed
              <span className="title-highlight">
                because minimum deposit is now 10 GHC
              </span>
            </h1>

            <p className="main-text">
              Dear users, at first our minimum deposit was{" "}
              <strong>50 GHC</strong>. Because we have now reduced the minimum
              deposit to <strong className="green-text">10 GHC</strong>, the
              mining plan ranges have also changed.
            </p>

            <p className="main-text">
              This change will take effect on <strong>April 5th</strong>. Anyone
              who is mining on that date will be affected by the new mining plan
              arrangement.
            </p>
          </div>

          <div className="plans-section">
            <div className="plans-column">
              <h2 className="section-title old-title">Previous Mining Plans</h2>
              <p className="section-text">
                At first minimum deposit was <strong>50 GHC</strong>, and these
                were the mining plans.
              </p>

              <div className="plan-card old-card">
                <h3>PLAN I</h3>
                <p><strong>Range:</strong> 50 - 599 GHC</p>
                <p><strong>Profit:</strong> 10%</p>
                <p><strong>Mining Days:</strong> 24HRS</p>
              </div>

              <div className="plan-card old-card">
                <h3>PLAN II</h3>
                <p><strong>Range:</strong> 600 - 799 GHC</p>
                <p><strong>Profit:</strong> 15%</p>
                <p><strong>Mining Days:</strong> 3DAYS</p>
              </div>

              <div className="plan-card old-card">
                <h3>PLAN III</h3>
                <p><strong>Range:</strong> 800 - 999 GHC</p>
                <p><strong>Profit:</strong> 20%</p>
                <p><strong>Mining Days:</strong> 5DAYS</p>
              </div>

              <div className="plan-card old-card">
                <h3>PLAN IV</h3>
                <p><strong>Range:</strong> 1000 - 1200 GHC</p>
                <p><strong>Profit:</strong> 25%</p>
                <p><strong>Mining Days:</strong> 7DAYS</p>
              </div>
            </div>

            <div className="arrow-box">
              <span>→</span>
            </div>

            <div className="plans-column">
              <h2 className="section-title new-title">Updated Mining Plans</h2>
              <p className="section-text">
                Now minimum deposit is{" "}
                <strong className="green-text">10 GHC</strong>, and these are
                the updated mining plans.
              </p>

              <div className="plan-card new-card">
                <h3>PLAN I</h3>
                <p><strong>Range:</strong> 10 - 299 GHC</p>
                <p><strong>Profit:</strong> 10%</p>
                <p><strong>Mining Days:</strong> 24HRS</p>
              </div>

              <div className="plan-card new-card">
                <h3>PLAN II</h3>
                <p><strong>Range:</strong> 300 - 599 GHC</p>
                <p><strong>Profit:</strong> 15%</p>
                <p><strong>Mining Days:</strong> 3DAYS</p>
              </div>

              <div className="plan-card new-card">
                <h3>PLAN III</h3>
                <p><strong>Range:</strong> 600 - 899 GHC</p>
                <p><strong>Profit:</strong> 20%</p>
                <p><strong>Mining Days:</strong> 5DAYS</p>
              </div>

              <div className="plan-card new-card">
                <h3>PLAN IV</h3>
                <p><strong>Range:</strong> 900 - 1200 GHC</p>
                <p><strong>Profit:</strong> 25%</p>
                <p><strong>Mining Days:</strong> 7DAYS</p>
              </div>
            </div>
          </div>

          <div className="announcement-box">
            <h2>Announcement Message</h2>
            <p>
              Dear valued users, we are pleased to inform you that our minimum
              deposit has been reduced from <strong>50 GHC</strong> to{" "}
              <strong className="green-text">10 GHC</strong>. Because of this,
              our mining plan ranges have also changed. This update will take
              effect on <strong>April 5th</strong>, and any user mining on that
              date will be affected.
              Thank you for your understanding and continued support as we strive to provide you with the best mining experience possible.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default DepositAndMiningPlanUpdate;