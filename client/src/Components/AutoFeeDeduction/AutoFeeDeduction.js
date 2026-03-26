import React, { Component } from "react";
import './AutoFeeDeduction.css'

class AutoFeeDeduction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
      loading: false,
    };
  }

  handleCheck = () => {
    this.setState((prevState) => ({
      checked: !prevState.checked,
    }));
  };

handleSubmit = () => {
  const { checked } = this.state;
  if (!checked) return;

  this.setState({ loading: true });

  // ✅ Store in session
  sessionStorage.setItem("IsAgreeDeduction", "true");

  setTimeout(() => {
    window.location.href = "/dashboard/deposit";
  }, 1000);
};

  render() {
    const { checked, loading } = this.state;
    const { unpaidAmount, months } = this.props;

    return (
      <div className="auto-fee-container">
        <div className="card">
          <h2>⚙ Service Fee Payment Option</h2>

          <p className="desc">
            You currently have <strong>{months || 0} month(s)</strong> of unpaid
            service fees totaling <strong>GHC{unpaidAmount || 0}</strong>.
            To keep your mining account active, you can choose to have these
            fees to be deducted from your available mining deposit balance..
          </p>

          <div className="info-box">
            <ul>
              <li>✔ Your account will remain active</li>
              <li>✔ Fees will be deducted from your mining deposit</li>
              <li>✔ No immediate payment required</li>
            </ul>
          </div>

          <div className="agreement">
            <label>
              <input
                type="checkbox"
                checked={checked}
                onChange={this.handleCheck}
              />
              <span>
                I agree to the Terms & Conditions and authorize the platform
                to deduct my outstanding service fees from my mining deposit.
              </span>
            </label>
          </div>

          <button
            className={`btn ${checked ? "active" : "disabled"}`}
            disabled={!checked || loading}
            onClick={this.handleSubmit}
          >
            {loading ? "Processing..." : "Agree & Continue"}
          </button>

          <p className="note">
            You can disable this option anytime from your account settings.
          </p>
        </div>
      </div>
    );
  }
}

export default AutoFeeDeduction;