import React, { Component } from "react";
import "./BoostPackageDetails.css";
import boostPoster from "./boostPoster.png";
import jwt_decode from 'jwt-decode';

class BoostPackageDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "",
      loading: false,
      showConfirm: false,
      showPaymentInfo: false,
      user_Name: "Setsope",
    };
  }

  componentDidMount() {
    try {
      const token = sessionStorage.getItem('x-access-token');
      if (token) {
        const decoded = jwt_decode(token);
        this.setState({
          user_id: decoded.user_id,
          user_Name: decoded.user_Name,
        });
      }
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  }

  handleChange = (e) => {
    this.setState({
      amount: e.target.value,
    });
  };

  openConfirmation = () => {
    const amount = Number(this.state.amount);

    if (!amount) {
      alert("Please enter investment amount");
      return;
    }

    if (amount < 1300 || amount > 2500) {
      alert("Amount must be between 1300 GHC and 2500 GHC");
      return;
    }

    this.setState({
      showConfirm: true,
    });
  };

  closeConfirmation = () => {
    this.setState({
      showConfirm: false,
      showPaymentInfo: false,
    });
  };

  // SHOW PAYMENT INFO
  showPaymentMethod = () => {
    this.setState({
      showPaymentInfo: true,
    });
  };

  submitPackage = async () => {

    this.setState({
      loading: true,
    });

    try {

      const response = await fetch(
        "/users/boost-package",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            user_id: this.state.user_id,
            user_Name: this.state.user_Name,
            amount: this.state.amount,
            packageName: "14-Day Boost Package",
            profit: "30%",
            duration: "14 Days",
            status: "active"
          }),
        }
      );

      const data = await response.json();

      alert(
        data.message ||
        "Package activated successfully"
      );

      this.setState({
        loading: false,
        showConfirm: false,
        showPaymentInfo: false,
      });

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

      this.setState({
        loading: false,
      });
    }
  };

  render() {

    return (

      <div className="detailsWrapper">

        <div className="detailsCard">

          <img
            src={boostPoster}
            alt="Boost Package"
            className="detailsImage"
          />

          <div className="detailsContent">

            <h1>🚀 14-DAY BOOST PACKAGE</h1>

            <div className="detailsGrid">

              <div className="detailsBox">
                <span>📈 Profit</span>
                <h2>30%</h2>
              </div>

              <div className="detailsBox">
                <span>⏳ Duration</span>
                <h2>14 Days</h2>
              </div>

            </div>

            <div className="detailsGrid">

              <div className="detailsBox">
                <span>💰 Minimum</span>
                <h2>1300 GHC</h2>
              </div>

              <div className="detailsBox">
                <span>🏦 Maximum</span>
                <h2>2500 GHC</h2>
              </div>

            </div>

            <div className="feeBox">
              ✅ Reduced Withdrawal Service Fee — ONLY 20%
            </div>

            <input
              type="number"
              placeholder="Enter investment amount"
              className="amountInput"
              value={this.state.amount}
              onChange={this.handleChange}
            />

            <button
              className="submitBtn"
              onClick={this.openConfirmation}
            >
              SUBMIT PACKAGE
            </button>

          </div>
        </div>

        {/* CONFIRMATION POPUP */}

        {this.state.showConfirm && (

          <div className="confirmOverlay">

            <div className="confirmBox">

              <h2>Confirm Package</h2>

              <p>
                You are about to activate the
                <strong> 14-Day Boost Package </strong>
              </p>

              <p>
                Investment Amount:
                <strong>
                  {" "}
                  {this.state.amount} GHC
                </strong>
              </p>

              <p>
                Expected Profit:
                <strong>
                  {" "}
                  {(this.state.amount * 0.3).toFixed(2)} GHC
                </strong>
              </p>

              {/* SHOW PAYMENT INFO AFTER CONFIRM */}

              {!this.state.showPaymentInfo ? (

                <div className="confirmButtons">

                  <button
                    className="cancelBtn"
                    onClick={this.closeConfirmation}
                  >
                    Cancel
                  </button>

                  <button
                    className="confirmBtn"
                    onClick={this.showPaymentMethod}
                  >
                    Confirm
                  </button>

                </div>

              ) : (

                <div className="confirmBtnInfo">

                  <p>
                    🆔 Kindly use your User Name

                    <span>
                      {" "}
                      {this.state.user_Name} 
                    </span>

                     as the
                    <strong>
                      {" "}
                      Reference ID / Description
                    </strong>

                    when making the payment.
                  </p>

                  <p>
                    💰 Please send exactly

                    <span className="outAmount1">
                      {" "}
                      {this.state.amount}
                    </span>

                    GHC for package activation.
                  </p>

                  {/* BANK PAYMENT */}
{/* 
                  <div className="bankPaymentBox">

                    <h3>
                      🏦 BANK PAYMENT
                    </h3>

                    <p className="saveFeeText">
                      ✅ Save 2% service fee when
                      you make payment with Bank Transfer
                    </p>

                    <p>
                      🏦 <strong>Bank Name:</strong> GCB
                    </p>

                    <p>
                      💳 <strong>Account Number:</strong>

                      <span className="wallertNumber">
                        1091440001179
                      </span>
                    </p>

                    <p>
                      👤 <strong>Name on Account:</strong>
                      BTC SHARK TRADE
                    </p>

                  </div> */}

                  {/* MOMO PAYMENT */}

                  <div className="momoPaymentBox">

                    <h3>
                      📱 MOBILE MONEY PAYMENT
                    </h3>

                    <p>
                      📱
                      <strong>
                        {" "}
                        Primary Payment
                        (AirtelTigo MoMo)
                      </strong>

                      <br />

                      🔵
                      <span className="wallertNumber">
                        0268253787
                      </span>

                      <br />

                      👤 Account Name:
                      <strong> Ainoo Frank</strong>
                    </p>

                    <p>
                      📱
                      <strong>
                        {" "}
                        Alternative Payment
                        (Vodafone MoMo)
                      </strong>

                      <br />

                      🔴
                      <span className="wallertNumber">
                        0203808479
                      </span>

                      <br />

                      👤 Account Name:
                      <strong> Ainoo Frank</strong>
                    </p>

                  </div>

                  <button
                    className="finalSubmitBtn"
                    onClick={this.submitPackage}
                  >
                    {this.state.loading
                      ? "Processing..."
                      : "I HAVE MADE PAYMENT"}
                  </button>

                </div>

              )}

            </div>
          </div>

        )}

      </div>
    );
  }
}

export default BoostPackageDetails;