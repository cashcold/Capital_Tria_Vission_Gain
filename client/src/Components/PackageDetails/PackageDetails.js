import React, { Component } from "react";
import jwt_decode from 'jwt-decode';
import "./PackageDetails.css"; // your CSS
import activePackage from "./activePackage.png"; // dashboard image

class PackageDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packageData: null,
      packageMature: false,
      loading: true,
      error: null,
      userId: '',
    };
  }

  componentDidMount() {
    try {
      const token = sessionStorage.getItem('x-access-token');
      if (token) {
        const decoded = jwt_decode(token);
        this.setState({ userId: decoded.user_id }, () => {
          // Fetch the package after userId is set
          this.fetchPackageDetails();
        });
      } else {
        this.setState({ loading: false, error: "User not logged in" });
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      this.setState({ loading: false, error: "Failed to decode user token" });
    }
  }

  fetchPackageDetails = async () => {
    const { userId } = this.state;
    if (!userId) return;

    try {
      const response = await fetch(`/users/boost-packages/${userId}`);
      const data = await response.json();

      if (!data.success || !data.data || data.data.length === 0) {
        throw new Error("No active package found");
      }

      const latestPackage = data.data[0]; // get most recent package

      const createdDate = new Date(latestPackage.createdAt);
      const now = new Date();
      const diffInDays = (now - createdDate) / (1000 * 60 * 60 * 24);

      this.setState({
        packageData: latestPackage,
        packageMature: diffInDays >= 14,
        loading: false,
      });
    } catch (error) {
      console.error(error);
      this.setState({
        error: error.message || "Failed to load package data",
        loading: false,
      });
    }
  };

  handleCashOut = () => {
    alert("Package matured! Cashout logic goes here.");
    // TODO: Call backend API to cash out
  };

  render() {
    const { packageData, packageMature, loading, error } = this.state;

    if (loading) return <p>Loading package details...</p>;
    if (error) return <p>{error}</p>;
    if (!packageData) return <p>No active package found.</p>;

    return (
      <div className="detailsWrapper">
        <div className="detailsCard">
          <img src={activePackage} alt="Boost Package" className="detailsImage" />

          <div className="detailsContent">
            {/* Active Badge */}
            <div className="activeBadge">PACKAGE ACTIVE</div>

            <h1>🚀 {packageData.packageName}</h1>
            <p className="subtitle">Track your growth. Monitor your returns.</p>

            <div className="detailsGrid">
              <div className="detailsBox">
                <span>📈 Profit</span>
                <h2>{packageData.profit || "N/A"}</h2>
              </div>
              <div className="detailsBox">
                <span>⏳ Duration</span>
                <h2>{packageData.duration}</h2>
              </div>
            </div>

            <div className="detailsGrid">
              <div className="detailsBox">
                <span>💰 Amount</span>
                <h2>{packageData.amount} GHC</h2>
              </div>
              <div className="detailsBox">
                <span>Status</span>
                <h2>{packageData.status}</h2>
              </div>
            </div>

            {/* Dashboard Info */}
            <div className="dashboardInfo">
              <p>14-Day Cycle</p>
              <div className="progressBar">
                <div
                  className="progressFill"
                  style={{ width: packageMature ? "100%" : "50%" }}
                ></div>
              </div>
              <p>Monitor Growth & Cash Out when mature</p>
            </div>

            {packageMature && (
              <button className="cashOutBtn" onClick={this.handleCashOut}>
                CASH OUT
              </button>
            )}

            <p className="footerCTA">Visit <strong>CAPGAINCO.COM</strong> – Grow Together. Succeed Together.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default PackageDetails;