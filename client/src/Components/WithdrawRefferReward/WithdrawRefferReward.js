import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'
import './WithdrawRefferReward.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from "socket.io-client";


class WithdrawRefferReward extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user_profile_display: '',
      depositAmount: '0',
      zero_accountBalance: '0',
      user_id: '',
      user_Name: '',
      type: 'Withdrawal',
      email: '',
      accountBalance: '',
      bitcoin: '',
      activetDeposit: '',
      walletAddress: '',
      withdraw_date: '',
      activetDeposit__amount: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.WithdrawNowFound = this.WithdrawNowFound.bind(this);
  }

  handleChange = input => event => {
    event.preventDefault();
    this.setState({ [input]: event.target.value });
  }

  WithdrawNowFound = () => {
    const userId = this.state.user_id; // You already have this from the decoded token
  
    // Emit to socket if needed
    let socket = io('http://localhost:8000');
    socket.emit('WithdrawRefferReward', { userId });
  
    // Call backend to withdraw the reffer reward
    axios.post(`http://localhost:8000/users/refferReward/${userId}`)
      .then(res => {
        toast.success(res.data.message); // Display success message
        // Update state or UI if needed
      })
      .then(setTimeout(()=>{
        window.location='/dashboard'
    },5000))
      .catch(err => {
        toast.error("Failed to withdraw reward: " + err.response?.data?.message || err.message);
      });
  }
  

  
  componentDidMount() {
  
    const token = sessionStorage.getItem('x-access-token')
    const decoded = jwt_decode(token)
     this.setState({
        user_id: decoded.user_id,
       
     })

     const id = decoded.user_id

     axios.post('/users/user_profile_display',{id}).then(data => this.setState({
        user_profile_display: data.data
     }))

  

  }

  render() {
    return (
      <div className='refferReward_center_main'>
      <div className='RefferReward__main'>
        <ToastContainer />
        <h1 className='RefferReward__h1'>Reffer Reward Cashout</h1>


        <div className="All__flow__withdraw">
          <section className='RefferReward__method_box'>
            <div className="flow__text">
              <div className="with__inner__box_1">
                <h4>Reffer Reward:</h4>
              </div>
              <div className="with__inner__box_1">
                <h4>${this.state.user_profile_display.refferReward}.00</h4>
              </div>
             
              <div className="with__inner__box_1">
                <h4>Pending Reffer Reward:</h4>
              </div>
              <div className="with__inner__box_1">
                <h4>$0.00</h4>
              </div>
            </div>
          </section>

          <section className='RefferReward__wallet'>
            <div className="iconWallet">
              <i className="fas fa-wallet fa-3x"></i>
            </div>
            <div className="wallet__id">
              <h4>Wallet Address</h4>
            </div>
            <div className="wallet__id">
              <h4>{this.state.user_profile_display.bitcoin}</h4>
            </div>
            <section className='cash_reffer_reward_btn'>
              <a href='#' className='btn btn-success  ' onClick={this.WithdrawNowFound} >WITHDRAW REWARD</a>
          </section>
          </section>
         
        </div>
      </div>
      </div>
    );
  }
}

export default WithdrawRefferReward;
