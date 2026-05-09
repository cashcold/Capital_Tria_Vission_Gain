import React, { Component } from "react";
import "./MiningUpdatePopup.css";
import miningUpdateImage from "./miningUpdateImage.png";

class MiningUpdatePopup extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showPopup: true,
    };
  }

  closePopup = () => {
    this.setState({
      showPopup: false,
    });
  };

  render() {

    if (!this.state.showPopup) {
      return null;
    }

    return (

      <div className="miningOverlay">

        <div className="miningPopup">

          <button
            className="miningCloseBtn"
            onClick={this.closePopup}
          >
            ×
          </button>

          {/* IMAGE */}

          <img
            src={miningUpdateImage}
            alt="Mining System Update"
            className="miningImage"
          />

          {/* CONTENT */}

          <div className="miningContent">

            <h1>
              📢 IMPORTANT MINING SYSTEM UPDATE
            </h1>

            <p>
              ⚙️ We are currently upgrading and improving our
              Blockchain Mining System to provide a more
              stable and reliable experience for all users.
            </p>

            <p>
              📌 During this update period, some mining
              activations may fail temporarily, while others
              may still go through successfully.
            </p>

            <p>
              🔧 Our technical team is working hard to fix and
              optimize the blockchain mining activation process
              as quickly as possible.
            </p>

            <div className="miningInfoBox">

              <p>
                ✅ Your account remains safe
              </p>

              <p>
                ✅ Your funds remain secure
              </p>

              <p>
                ✅ Failed mining activations will be handled appropriately
              </p>

            </div>

            <p className="thankYouText">
              🙏 We sincerely appreciate your patience,
              trust, and continued support during this
              upgrade process.
            </p>

            <div className="companyText">
              CAPGAINCO.COM <br />
              Grow Together. Succeed Together.
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default MiningUpdatePopup;