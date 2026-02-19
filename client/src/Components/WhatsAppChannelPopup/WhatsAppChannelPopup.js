import React, { Component } from "react";
import "./WhatsAppChannelPopup.css";

class WhatsAppChannelPopup extends Component {
  timer = null;

  state = {
    open: false,
    dontShowAgain: false,
  };

  componentDidMount() {
    // Session-based: hide only for the current tab session
    const dismissed = sessionStorage.getItem("wa_channel_popup_dismissed");
    if (dismissed === "1") return;

    this.timer = setTimeout(() => {
      this.setState({ open: true }, () => {
        // lock scroll when open
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

    // Save only for this session (refresh won't show, but closing tab/browser resets it)
    if (dontShowAgain) {
      sessionStorage.setItem("wa_channel_popup_dismissed", "1");
    }

    this.setState({ open: false }, () => {
      document.body.style.overflow = "";
    });
  };

  toggleDontShow = () => {
    this.setState((prev) => ({ dontShowAgain: !prev.dontShowAgain }));
  };

  joinChannel = () => {
    const url = "https://whatsapp.com/channel/0029VbCUcWm7YSd2bAPC4431";

    // Optional: if user checked "don't show again" when joining
    if (this.state.dontShowAgain) {
      sessionStorage.setItem("wa_channel_popup_dismissed", "1");
    }

    window.open(url, "_blank", "noopener,noreferrer");
    this.setState({ open: false }, () => {
      document.body.style.overflow = "";
    });
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
          aria-label="Join WhatsApp Channel"
        >
          <button
            className="waPopClose"
            onClick={this.closePopup}
            aria-label="Close"
          >
            ✕
          </button>

          <div className="waPopTop">
            <div className="waPopLogo" aria-hidden="true">
              <span className="waPopDot" />
              <span className="waPopDot" />
              <span className="waPopDot" />
            </div>

            <div className="waPopTitleWrap">
              <h3 className="waPopTitle">NEW WHATSAPP CHANNEL</h3>
              <p className="waPopSub">
                Join our new WhatsApp channel community platform for updates and
                many more.
              </p>
            </div>
          </div>

          <div className="waPopInfo">
            <div className="waPopBadge">🤖 LIVE UPDATES</div>
            <div className="waPopBadge">⚡ FAST NOTICES</div>
            <div className="waPopBadge">✅ TRUSTED</div>
          </div>

          <div className="waPopActions">
            <button
              className="waPopBtn waPopBtnPrimary"
              onClick={this.joinChannel}
            >
              Join Now
              <span className="waPopBtnGlow" />
            </button>

            <button className="waPopBtn waPopBtnGhost" onClick={this.closePopup}>
              Not Now
            </button>
          </div>

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
