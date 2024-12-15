import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { addDays } from 'date-fns';
import moment from 'moment';
import './style.css';

class AccountRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userProfile: null,
      userDeposit: null,
      userBalance: null,
      activeDeposit: 0,
      totalDeposits: 0,
      withdrawals: 0,
      timestamp: '',
      showDetails: false, // Controls visibility of the details popout
    };
  }

  componentDidMount() {

    
    const token = sessionStorage.getItem('x-access-token');
    if (!token) {
      // Handle missing token (e.g., redirect to login)
      return;
    }

    const decoded = jwt_decode(token);
    sessionStorage.setItem('user_id', decoded.user_id);
    sessionStorage.setItem('email', decoded.email);

    // Update state with user details
    this.setState({
    //   userBalance: decoded.accountBalance,
      activeDeposit: decoded.activetDeposit,
      timestamp: decoded.date,
    });userProfile

    const userId = decoded.user_id;

    // Fetch user data
    this.fetchUserData(userId);

    console.log(this.state.userDeposit)
  }

  fetchUserData = async (userId) => {
    try {
      const [profileRes, depositRes, balanceRes, withdrawalRes] = await Promise.all([
        axios.post('/users/user_profile_display', { id: userId }),
        axios.post('/users/user_deposit_display', { id: userId }),
        axios.post('/users/user_balance', { id: userId }),
        axios.post('/users/withdrawInfo', { id: userId }),
      ]);

      this.setState({
        userProfile: profileRes.data,
        userDeposit: depositRes.data.deposit,
        userBalance: balanceRes.data.activetDeposit,
        totalDeposits: depositRes.data.totalDeposit,
        withdrawals: withdrawalRes.data.total,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  toggleDetails = () => {
    this.setState((prevState) => ({ showDetails: !prevState.showDetails }));
  };

  calculateDepositStatus = () => {
    const { activeDeposit, timestamp } = this.state;
    const depositDate = new Date(timestamp);
    const today = new Date();

    const depositThresholds = [
      { amount: 59, duration: 1 },
      { amount: 119, duration: 3 },
      { amount: 199, duration: 5 },
      { amount: Infinity, duration: 7 },
    ];

    for (const { amount, duration } of depositThresholds) {
      if (activeDeposit <= amount && today > addDays(depositDate, duration)) {
        return true;
      }
    }
    return false;
  };

  render() {

    console.log(this.state.userDeposit)
    const { userBalance, activeDeposit, showDetails, userDeposit, totalDeposits } = this.state;

    const formattedDate = userDeposit
      ? moment(userDeposit.createdAt).format('MMMM Do YYYY, h:mm:ss a')
      : '';

    return (
      <div className="account-router">
        {activeDeposit === 0 ? (
          <section className="invest-ui">
            <div className="no-deposit-card">
              <h1>No Active Deposits</h1>
              <p>You currently don't have any active deposits. Start earning by making your first deposit today!</p>
              <a href="/dashboard/deposit" className="deposit-button">
                Make a Deposit
              </a>
            </div>
          </section>
        ) : (
          <section className="active-deposit-card">
            <h1>Active Deposit new: ${activeDeposit}.00</h1>
            <button onClick={this.toggleDetails}>View Details</button>
          </section>
        )}

        {showDetails && userDeposit && (
          <div className="popout-card">
            <h2>Mining Plan Details</h2>
            <p>Plan: {userDeposit.fixedDepositAmount}</p>
            <p>Miner: Premium Miner</p>
            <p>Deposit Amount: ${activeDeposit}.00</p>
            <p>Deposit Date: {formattedDate}</p>
            <p>Status: Active</p>
            <button onClick={this.toggleDetails}>Close</button>
          </div>
        )}

        <section className="dashboard-section">
          <div className="dashboard-box">
            <h5>Total Investment</h5>
            <h5>${totalDeposits}.00</h5>
          </div>
          <div className="dashboard-box">
            <h5>Account Balance</h5>
            <h5>${userBalance}.00</h5>
          </div>
        </section>
      </div>
    );
  }
}

export default AccountRouter;
