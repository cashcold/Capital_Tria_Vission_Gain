import React, { Component } from 'react';
import './WithdrawRefferReward.css'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class WithdrawRefferReward extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      user_profile_display: {},
      totalReferralReward: 0,
    };
  }

  componentDidMount() {
    const token = sessionStorage.getItem('x-access-token');
    if (token) {
      const decoded = jwt_decode(token);
      this.setState({ user_id: decoded.user_id });

      // Fetch user profile
      axios.post('/users/user_profile_display', { id: decoded.user_id })
        .then(response => {
          this.setState({ user_profile_display: response.data });
        })
        .catch(error => {
          console.error("Error fetching user profile:", error);
          toast.error("Failed to fetch user profile.");
        });

      // Fetch total referral reward
      axios.get(`/users/totalRefferReward/${decoded.user_id}`)
        .then(response => {
          this.setState({ totalReferralReward: response.data.totalReward });
        })
        .catch(error => {
          console.error("Error fetching total referral reward:", error);
          toast.error("Failed to fetch total referral reward.");
        });
    } else {
      toast.error("No access token found.");
    }
  }

  handleWithdraw = () => {
    const { user_id } = this.state;

    axios.post('http://localhost:8000/users/withdrawReferralReward', { userId: user_id })
      .then(response => {
        toast.success(response.data.message);

        // Update UI after successful withdrawal
        this.setState(prevState => ({
          user_profile_display: { ...prevState.user_profile_display, refferReward: 0 },
          totalReferralReward: prevState.totalReferralReward - prevState.user_profile_display.refferReward,
        }));
      })
      .then(res => setTimeout(()=>{
        window.location='/withdraw-refferReward'
      },100))

      .catch(error => {
        toast.error(error.response?.data?.message || "Withdrawal failed!");
      });
  };

  render() {
    const { user_profile_display, totalReferralReward } = this.state;

    return (
      <div className='refferReward_center_main'>
        <div className='RefferReward__main'>
          <ToastContainer />
          <h1 className='RefferReward__h1'>Referral Reward Cashout</h1>

          <div className="All__flow__withdraw">
            <section className='RefferReward__method_box'>
              <div className="flow__text">
                <div className="with__inner__box_1">
                  <h4>Referral Reward:</h4>
                  <h4>${user_profile_display.refferReward || '0'}.00</h4>
                </div>

                <div className="with__inner__box_1">
                  <h4>Total Referral Rewards:</h4>
                  <h4>${totalReferralReward || '0'}.00</h4>
                </div>
              </div>

              {/* Withdraw Button */}
              <button 
                className="withdraw-button"
                onClick={this.handleWithdraw}
                disabled={user_profile_display.refferReward === 0}
              >
                Withdraw Reward
              </button>

            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default WithdrawRefferReward;
