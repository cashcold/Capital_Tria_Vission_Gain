import React, { Component } from "react";
import "./AuthRedirectPopup.css";

class AuthRedirectPopup extends Component {
  typingInterval = null;

  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      typedText: "",
      fullText: "Welcome to Capital Gain "
    };
  }

  componentDidMount() {
    const popupShown = sessionStorage.getItem("popupShown");

    if (!popupShown) {
      this.setState({ showPopup: true }, () => {
        sessionStorage.setItem("popupShown", "true");
        this.startTyping();
        document.body.style.overflow = "hidden";
      });
    }
  }

  componentWillUnmount() {
    if (this.typingInterval) clearInterval(this.typingInterval);
    document.body.style.overflow = "";
  }

  startTyping = () => {
    let index = 0;

    this.typingInterval = setInterval(() => {
      this.setState((prevState) => {
        if (index >= prevState.fullText.length) {
          clearInterval(this.typingInterval);
          return null;
        }

        const nextText = prevState.fullText.substring(0, index + 1);
        index++;
        return { typedText: nextText };
      });
    }, 50);
  };

  closePopup = () => {
    this.setState({ showPopup: false }, () => {
      document.body.style.overflow = "";
    });
  };

  goToLogin = () => {
    window.location.href = "/login";
  };

  goToRegister = () => {
    window.location.href = "/register";
  };

  render() {
    const { showPopup, typedText } = this.state;

    if (!showPopup) return null;

    return (
      <div className="authOverlay">
        <div className="authCard">
          {/* Close Button */}
          <button className="authClose" onClick={this.closePopup}>✕</button>

          {/* Robot */}
          <div className="authRobotWrap">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png"
              alt="Robot"
              className="authRobot"
            />
          </div>

          {/* Typing Title */}
          <h2 className="authTitle">
            <span className="authTyping">{typedText}</span>
          </h2>

          <p className="authSub">Login or register to start mining today</p>

          {/* Buttons */}
          <div className="authActions">
            <button className="authBtn authPrimary" onClick={this.goToLogin}>
              Login
              <span className="authGlow"></span>
            </button>

            <button className="authBtn" onClick={this.goToRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthRedirectPopup;