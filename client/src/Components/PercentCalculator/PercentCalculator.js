import React, { Component } from "react";
import "./PercentCalculator.css";

class PercentCalculator extends Component {

  constructor(props) {
    super(props);

    this.state = {
      amount: "",
    };
  }

  handleChange = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  render() {

    const amount = Number(this.state.amount);

    // 31.4% fee
    const fee = amount * 0.314;

    // Investor receives after deduction
    const investorReceive = amount - fee;

    return (

      <div className="percentWrapper">

        <div className="percentCard">

          <h1>
            31.4% Withdrawal Calculator
          </h1>

          <input
            type="number"
            placeholder="Enter Amount"
            value={this.state.amount}
            onChange={this.handleChange}
            className="amountInput"
          />

          {amount > 0 && (

            <div className="resultBox">

              <div className="resultItem">
                <span>Entered Amount</span>
                <h2>{amount.toFixed(2)} GHC</h2>
              </div>

              <div className="resultItem">
                <span>31.4% Service Fee</span>
                <h2>{fee.toFixed(2)} GHC</h2>
              </div>

              <div className="resultItem success">
                <span>Investor Will Receive</span>
                <h2>
                  {investorReceive.toFixed(2)} GHC
                </h2>
              </div>

            </div>

          )}

        </div>
      </div>
    );
  }
}

export default PercentCalculator;