import React, { Component } from "react";
import "./AccountStatusAlert.css";

class AccountStatusAlert extends Component {
  state = { user: null, daysLeft: null };

  componentDidMount() {
    this.fetchUser();
    this.interval = setInterval(this.updateDaysLeft, 1000 * 60 * 60); // update every hour
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  fetchUser = async () => {
    try {
      // Try both sessionStorage and localStorage
      let token = sessionStorage.getItem("x-access-token") || localStorage.getItem("token");
      console.log('[AccountStatusAlert] Raw token from storage:', token ? token.substring(0, 30) + '...' : null);
      
      if (token) {
        try { token = JSON.parse(token); } catch {}
      }
      
      console.log('[AccountStatusAlert] Token to send:', token ? token.substring(0, 30) + '...' : null);
      
      if (!token) {
        console.error("❌ No token found. User not logged in.");
        this.setState({ user: { error: "No token. Please login first." } });
        return;
      }

      console.log('[AccountStatusAlert] Fetching /users/me with token header');
      const res = await fetch("http://localhost:8000/users/me", {
        headers: { "x-access-token": token }
      })
      
      
      if (!res.ok) {
        console.error("❌ API Error:", res.status, res.statusText);
        this.setState({ user: { error: `API error: ${res.status}` } });
        return;
      }

      const data = await res.json();
      this.setState({ user: data }, this.updateDaysLeft);
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
    this.setState({ daysLeft: Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0) });
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
          <p>⏳ Account will be frozen in <strong>{daysLeft}</strong> day(s)</p>
          <button onClick={this.handleUpdatePhone}>Update Phone Number</button>
        </div>
      );
    }

    // No alerts - nothing to show
    return null;
  }
}

export default AccountStatusAlert;