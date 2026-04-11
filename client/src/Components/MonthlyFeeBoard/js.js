import React, { Component } from "react";
import "./InvestorNoticeModal.css";

class InvestorNoticeModal extends Component {
  state = {
    show: true,
  };

  closeModal = () => {
    this.setState({ show: false });
  };

  render() {
    if (!this.state.show) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-card">

          <button className="close-btn" onClick={this.closeModal}>
            ✕
          </button>

          <div className="modal-badge">Investor Update</div>

          <h2 className="modal-title">
            Mining Service Fee Waiver Notice
          </h2>

          <p className="modal-text">
            Dear Valued Investors,
          </p>

          <p className="modal-text">
            We are pleased to inform you that the mining service fee for the
            period of <strong>April 1st to April 9th</strong> has been canceled
            as a gesture of appreciation for your patience and understanding
            during the mining plan update.
          </p>

          <p className="modal-text">
            We thank you sincerely for your support and empowerment. Your trust
            means a great deal to us, and we want you to know that we always
            think of your interests as well.
          </p>

          <p className="modal-text">
            Because of your continued loyalty and understanding, we remain
            committed to making thoughtful decisions that benefit our investor
            community.
          </p>

          <p className="modal-signoff">
            With appreciation,<br />Management
          </p>

        </div>
      </div>
    );
  }
}

export default InvestorNoticeModal;