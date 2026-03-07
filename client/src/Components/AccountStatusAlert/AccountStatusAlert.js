import React, { Component } from "react";
import "./AccountStatusAlert.css";

class AccountStatusAlert extends Component {
  interval = null;
  state = { user: null, daysLeft: null };

  componentDidMount() {
    this.fetchUser();
    
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchUser = async () => {
  try {
    const token = sessionStorage.getItem("x-access-token");

    console.log(
  "[AccountStatusAlert] Token from storage:",
  token && typeof token === "string" ? token.slice(0, 30) + "..." : null
  );

    if (!token) {
      console.error("❌ No token found. User not logged in.");
      this.setState({ user: { error: "No token. Please login first." } });
      return;
    }

    const res = await fetch("/users/me", {
      headers: { "x-access-token": token }
    });

    if (!res.ok) {
      console.error("❌ API Error:", res.status);
      this.setState({ user: { error: `API error: ${res.status}` } });
      return;
    }

    const data = await res.json();

      this.setState({ user: data }, () => {
      if (data.warningDate && !data.isFrozen) {
        this.updateDaysLeft();

        if (this.interval) {
          clearInterval(this.interval);
        }

        this.interval = setInterval(this.updateDaysLeft, 1000 * 60 * 60);
      }
    });

  } catch (err) {
    console.error("❌ Fetch error:", err.message);
    this.setState({ user: { error: err.message } });
  }
};

  updateDaysLeft = () => {
  const { user } = this.state;

  if (!user || !user.warningDate) return;

  const freezeDate = new Date(user.warningDate);
  freezeDate.setDate(freezeDate.getDate() + 3);

  const diff = freezeDate - new Date();
  const daysLeft = Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);

  this.setState({ daysLeft });

  if (daysLeft === 0 && this.interval) {
    clearInterval(this.interval);
  }
};

  handleUpdatePhone = () => window.location.href = "/dashboard/edit";

  // duplicate check UI removed in production

  render() {
    const { user, daysLeft } = this.state;
    
    // Show error messages 
    if (user && user.error) {
      return (
        <div className="alert alert-warning" style={{ backgroundColor: "#ffe0b2" }}>
          <h3>⚠️ Error Loading Account Status</h3>
          <p>{user.error}</p>
          <p style={{ fontSize: "12px", color: "#666" }}>
            Open DevTools Console (F12) for more details
          </p>
        </div>
      );
    }

    if (!user) return <p style={{ textAlign: "center", padding: "20px" }}>Loading account status...</p>;

    if (user.isFrozen) {
      return (
        <div className="alert alert-frozen">
          <h3>❄ Account Frozen</h3>
          <p>Your account is frozen due to duplicate phone number. Update to restore access.</p>
          <button onClick={this.handleUpdatePhone}>Update Phone Number</button>
        </div>
      );
    }

    if (user.duplicateWarningSent) {
      return (
        <div className="alert alert-warning">
          <h3>⚠ Duplicate Phone Number Detected</h3>
          <h3>May I open several accounts in your program?
            No. If we find that one member has more than one account, the entire funds will be frozen.</h3>
          <p>Update your phone to avoid account suspension.</p>
          <p>⏳ Account will be frozen in <strong>{daysLeft ?? 0}</strong> day(s)</p>
          <button onClick={this.handleUpdatePhone}>Update Phone Number</button>
        </div>
      );
    }

    // No alerts - nothing to show
    return null;
  }
}

export default AccountStatusAlert;