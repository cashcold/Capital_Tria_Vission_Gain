import React, { Component } from "react";
import "./WhatsAppChannelPopup.css";

class WhatsAppChannelPopup extends Component {
  timer = null;

  state = {
    open: false,
    dontShowAgain: false,
  };

  componentDidMount() {
    const dismissed = sessionStorage.getItem("wa_popup_dismissed");
    if (dismissed === "1") return;

    this.timer = setTimeout(() => {
      this.setState({ open: true }, () => {
        document.body.style.overflow = "hidden";
      });
    }, 15000);
  }

  componentWillUnmount() {
    if (this.timer) clearTimeout(this.timer);
    document.body.style.overflow = "";
  }

  closePopup = () => {
    const { dontShowAgain } = this.state;

    if (dontShowAgain) {
      sessionStorage.setItem("wa_popup_dismissed", "1");
    }

    this.setState({ open: false }, () => {
      document.body.style.overflow = "";
    });
  };

  toggleDontShow = () => {
    this.setState((prev) => ({ dontShowAgain: !prev.dontShowAgain }));
  };

  joinGroup = () => {
    const url =
      "https://chat.whatsapp.com/Iw42G2UNmvL6E0o94ezj2P?mode=gi_t";

    if (this.state.dontShowAgain) {
      sessionStorage.setItem("wa_popup_dismissed", "1");
    }

    window.open(url, "_blank", "noopener,noreferrer");
    this.setState({ open: false }, () => {
      document.body.style.overflow = "";
    });
  };

  joinChannel = () => {
    const url =
      "https://whatsapp.com/channel/0029VbCUcWm7YSd2bAPC4431";

    window.open(url, "_blank", "noopener,noreferrer");
  };

  stopOverlayClose = (e) => {
    e.stopPropagation();
  };

  render() {
    const { open, dontShowAgain } = this.state;

    if (!open) return null;

    return (
      <div
        className="waPopOverlay"
        onClick={this.closePopup}
        role="presentation"
      >
        <div
          className="waPopCard"
          onClick={this.stopOverlayClose}
          role="dialog"
          aria-modal="true"
          aria-label="Join WhatsApp Community"
        >
          <button
            className="waPopClose"
            onClick={this.closePopup}
            aria-label="Close"
          >
            ✕
          </button>

          {/* HEADER */}
          <div className="waPopTop">
            <div className="waPopLogo" aria-hidden="true">
              <span className="waPopDot" />
              <span className="waPopDot" />
              <span className="waPopDot" />
            </div>

            <div className="waPopTitleWrap">
              <h3 className="waPopTitle">
                JOIN OUR WHATSAPP COMMUNITY
              </h3>
              <p className="waPopSub">
                Be part of our community. Join the main group to share ideas and
                connect, or follow our channel for updates.
              </p>
            </div>
          </div>

          
          {/* CHANNEL - SECONDARY */}
          <div className="waPopSection waPopSecondary">
            <h4 className="waPopSectionTitle">
              📢 WhatsApp Channel
            </h4>
            <p className="waPopSectionText">
              Get fast updates, announcements, and important notices.
            </p>

            <button
              className="waPopBtn waPopBtnGhost"
              onClick={this.joinChannel}
            >
              Follow Channel
            </button>
          </div>

          {/* MAIN GROUP - PRIMARY */}
          <div className="waPopSection">
            <h4 className="waPopSectionTitle">
              👥  WhatsApp Group
            </h4>
            <p className="waPopSectionText">
              Open for everyone to post, share ideas, ask questions, and connect
              in real-time.
            </p>

            <button
              className="waPopBtn waPopBtnPrimary"
              onClick={this.joinGroup}
            >
              Join Group Now
              <span className="waPopBtnGlow" />
            </button>
          </div>


          {/* ACTIONS */}
          <div className="waPopActions">
            <button
              className="waPopBtn waPopBtnGhost"
              onClick={this.closePopup}
            >
              Not Now
            </button>
          </div>

          {/* CHECKBOX */}
          <label className="waPopCheck">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={this.toggleDontShow}
            />
            Don’t show again
          </label>

          <div className="waPopScan" aria-hidden="true" />
        </div>
      </div>
    );
  }
}

export default WhatsAppChannelPopup;