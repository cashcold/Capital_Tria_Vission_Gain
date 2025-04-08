import React, { Component } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import {addDays,addMinutes} from "date-fns"
import moment from 'moment';
import './style.css'

class AccountRouter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user_profile_display: '',
            user_deposit_display: '',
            totalReferralReward: 0,
            full_Name: '',
            user_Name: '',
            ip_address: '',
            ip: "Loading...",
            bitcoin: '',
            user_id: [],
            email: '',
            register_date: '',
            accountBalance: '',
            activetDeposit: '',
            totalDeposit: [],
            withdrawTotal: [],
            user_balance: [],
            totalDeposit_id: '',
            login: '',
            plan: '',
            timestamp: '',
            redirectToHome: false,
            Refedate: '',
            showDetails: false, // State for popout card visibility
         }

         this.handleChange = this.handleChange.bind(this)
    }
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.user_balance.activetDeposit !== this.state.user_balance.activetDeposit) {
          if (this.state.user_balance.activetDeposit > 0) {
            console.log("Deposit Amount updated to:", this.state.user_balance.activetDeposit);
            this.setState({ showDetails: true });
          } else {
            this.setState({ showDetails: false });
          }
        }
      }
      

    componentDidMount(){

     axios
      .get("https://api64.ipify.org?format=json")
      .then((response) => {
        this.setState({ ip: response.data.ip });
      })
      .catch((error) => {
        console.error("Error fetching IP:", error);
        this.setState({ ip: "Failed to load IP" });
      });

       
   
        try {
              const token = sessionStorage.getItem('x-access-token');
        
              if (!token) {
                throw new Error('Token missing or null');
              }
        
              const decoded = jwt_decode(token);
              const currentTime = Date.now() / 1000;
        
              if (decoded.exp && decoded.exp < currentTime) {
                throw new Error('Token expired');
              }
        
              // Token is valid – continue
            } catch (err) {
              console.warn('Token error:', err.message);
              sessionStorage.clear();
              this.setState({ redirectToHome: true });
            }
        

        const token = sessionStorage.getItem('x-access-token')
        const decoded = jwt_decode(token)
         JSON.stringify( sessionStorage.setItem('user_id',decoded.user_id))
         JSON.stringify( sessionStorage.setItem('email',decoded.email))
         JSON.stringify( sessionStorage.setItem('full_Name',decoded.full_Name))
         JSON.stringify( sessionStorage.setItem('user_Name',decoded.user_Name))
         JSON.stringify( sessionStorage.setItem('accountBalance',decoded.accountBalance))
         JSON.stringify( sessionStorage.setItem('bitcoin',decoded.bitcoin))
         JSON.stringify( sessionStorage.setItem(' register_date',decoded.date))
         JSON.stringify( sessionStorage.setItem('ip_address',decoded.ip_address))
        this.setState({
            user_id: decoded.user_id,
            full_Name: decoded.full_Name,
            user_Name: decoded.user_Name,
            email: decoded.email,
            bitcoin: decoded.bitcoin,
            accountBalance: decoded.accountBalance,
            activetDeposit: decoded.activetDeposit,
            ip_address: decoded.ip_address,
            register_date: decoded.date
         })

         const id = decoded.user_id

          // Fetch total referral reward
        axios.get(`/users/totalRefferReward/${decoded.user_id}`)
        .then(response => {
          this.setState({ totalReferralReward: response.data.totalReward });
        })
        .catch(error => {
          console.error("Error fetching total referral reward:", error);
          toast.error("Failed to fetch total referral reward.");
        });

         axios.post('/users/user_profile_display',{id}).then(data => this.setState({
            user_profile_display: data.data
         }))
         axios.post('/users/user_deposit_display',{id}).then(data => this.setState({
            user_deposit_display: data.data.deposit
         }))
         axios.post('/users/depositInfo',{id}).then(data => this.setState({
            totalDeposit: data.data
         }))
          axios.post('/users/withdrawInfo',{id}).then(data => this.setState({
            withdrawTotal: data.data
         }))
          
         axios.post('/users/user_balance',{id}).then(data => this.setState({
           user_balance: data.data
           
        }))
        // axios.post('/users/checkdate',{id}).then(data => console.log(data.lastDate))
        axios.post('/users/checkdate',{id}).then(data => this.setState({
            timestamp: data.data.map(user => user.lastDate)
         }))
         

    }
    

    
    toggleDetails = () => {
        this.setState((prevState) => ({ showDetails: !prevState.showDetails }));
      };


    render() { 

         if (this.state.redirectToHome) {
              return <Redirect to="/" />;
        
            }

        // console.log(this.state.user_profile_display.refferReward
        // )

        const showInvestButton = this.state.user_balance.activetDeposit === 0;

       

      
        sessionStorage.setItem('user_active_desposit',this.state.user_balance.activetDeposit)
        // JSON.stringify( sessionStorage.setItem('user_active_desposit',this.state.user_balance.activetDeposit))

    
        
    

       const CreditDashboard = ()=>{
       

        const activetDeposit__amount = Number(this.state.user_balance.activetDeposit)
        JSON.stringify( sessionStorage.setItem('activetDeposit__amount',activetDeposit__amount))
        const date = new Date(`${this.state.timestamp}`);;

        const today_date = new Date();
        const date_24hrs = addDays(date,1)
        const date_3days = addDays(date,3)
        const date_5days = addDays(date,5)
        const date_7days = addDays(date,7)

          

            if(activetDeposit__amount){
                if(activetDeposit__amount <= 599){
                  if(today_date > date_24hrs  && this.state.showDetails !== false){
                    this.setState({ showDetails: false }, () =>{
                        document.querySelector('.activetStatus').innerHTML = "GHC 0.00"
                        document.querySelector('.balanceMe').innerHTML = "GHC"+activetDeposit__amount+".00"
                        document.querySelector('.btn_balanceMe').style.display = 'block'
                    }
                      
                        
                )    
                }
               
                }
            }
           
            if(activetDeposit__amount){
                if(activetDeposit__amount >= 600 ){
                  if(today_date > date_3days && this.state.showDetails !== false){
                    this.setState({ showDetails: false }, () =>{
                        document.querySelector('.activetStatus').innerHTML = "GHC.00"
                        document.querySelector('.balanceMe').innerHTML = "GHC"+activetDeposit__amount+".00"
                        document.querySelector('.btn_balanceMe').style.display = 'block'
                    })
                 }
                }
            }
            if(activetDeposit__amount){
                if(activetDeposit__amount > 800){
                  if(today_date > date_5days && this.state.showDetails !== false){
                    this.setState({ showDetails: false }, () =>{
                        document.querySelector('.activetStatus').innerHTML = "GHC.00"
                        document.querySelector('.balanceMe').innerHTML = "GHC"+activetDeposit__amount+".00"
                        document.querySelector('.btn_balanceMe').style.display = 'block'
                    })
                    }
                }
            }
            if(activetDeposit__amount){
                if(activetDeposit__amount > 1000){
                  if(today_date > date_7days && this.state.showDetails !== false){
                    this.setState({ showDetails: false }, () =>{
                        document.querySelector('.activetStatus').innerHTML = "GHC.00"
                        document.querySelector('.balanceMe').innerHTML = "GHC"+activetDeposit__amount+".00"
                        document.querySelector('.btn_balanceMe').style.display = 'block'
                    })
                    }
                }
            }
            // if(activetDeposit__amount){
            //     if(activetDeposit__amount > 199){
            //       if(today_date > date_7days){
            //             document.querySelector('.activetStatus').innerHTML = "$0.00"
            //             document.querySelector('.balanceMe').innerHTML = "$ "+activetDeposit__amount+".00"
            //             document.querySelector('.btn_balanceMe').style.display = 'block'

                     
                    
            //         }else{
                    
            //         }
            //     }
            // }
       }
       CreditDashboard()


       const CheckDeposit = this.state.user_balance.activetDeposit

       const { showDetails, user_balance } = this.state;

       const formattedDate = this.state.user_deposit_display 
        ? moment(this.state.user_deposit_display.createdAt).format('MMMM Do YYYY, h:mm:ss a')
        : "No date available";


        return ( 
            <div className='account__router'>
                {
                    CheckDeposit === 0 && (
                        <section className="div invest_ui_ux_btn">
                        <div class="no-deposit-container">
                        <div class="no-deposit-card">
                            <div class="icon-wrapper">
                            <img src="https://images.unsplash.com/photo-1639843885527-43b098a9661a?q=80&w=1530&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="No Deposit" class="no-deposit-icon"/>
                            </div>
                            <h1>No Active Deposits</h1>
                            <p>
                            You currently don't have any active deposits in your mining account.
                            Start earning by making your first deposit today!
                            </p>
                            <button class="deposit-button"> <a href='/dashboard/deposit'>Make a Deposit</a></button>
                        </div>
                        </div>
                    </section>

                    )
                }
                
                {
                    CheckDeposit > 0 && (
                        <section className="miningCard">
                        <div class="main-container">
                            <div class="card">
                                <div class="robot-head">
                                <div class="eye left-eye"></div>
                                <div class="eye right-eye"></div>
                                <div class="antenna"></div>
                                </div>
                                <div class="info">
                                <h1 class="title">Active Deposit</h1>
                                <p class="amount">GHC{this.state.user_balance.activetDeposit}.00</p>
                                <p class="status">Status: <span class="status_active">Active</span></p>
                                </div>
                                <button class="view-details-btn" onClick={this.toggleDetails}>View Details</button>
                            </div>
                            </div>
                        </section>

                    )
                }

                {showDetails && (
                    
                <div className='popout-card'>
                    <div className='card-content'>
                    <h2>Mining Plan Details</h2>
                    <p>
                        <span>Plan </span>: {this.state.user_deposit_display.fixedDepositAmount} <br />
                        <span>Miner</span>: Premium Miner <br />
                       <span>Deposit Amount</span>: GHC{user_balance.activetDeposit}.00 <br />
                       <span>Deposit Date</span>: {formattedDate} <br />
                       <span className='Status'> Status</span>: Active
                    </p>
                     <div class="bitcoin-mining-container">
                        <div class="mining-machine">
                        <div class="bitcoin-logo"></div>
                        </div>
                        <p class="deposit-info">Your deposit is active. Mining in progress...</p>
                        <div class="loading-bar-container">
                        <div class="loading-bar"></div>
                        </div>
                    </div>
                    <button className='close-btn' onClick={this.toggleDetails}>
                        Close
                    </button>
                    </div>
                </div>
                )}
                {
                    CheckDeposit > 1 && (
                        <section className="automining">
                            <div className="auto-mode-box">
                        <div className="glow-title">Auto Mining Mode Activated</div>
                        <div className="auto-info">
                            When you make a withdrawal, your profit is instantly sent to your wallet,<br />
                            and your mining plan is automatically reactivated.<br /><br />
                            This smart Auto Mode helps us avoid repeated blockchain network fees<br />
                            and keeps your mining seamless and uninterrupted.<br />
                            All need to reupdate your deposit plan and everything updates automatically!
                        </div>

                        {/* Floating Coins */}
                        <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029" className="moving-coin" style={{ animationDelay: "0s" }} />
                        <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029" className="moving-coin" style={{ animationDelay: "5s", width: "30px" }} />
                        <img src="https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=029" className="moving-coin" style={{ animationDelay: "10s", width: "50px" }} />
                        </div>

                        </section>

                    )
                }

                <section className='dashboard__section_box__3'>
                    <div className="dash__box__1">
                        <i class="fas fa-coins fa-3x"></i>
                        <div className="dashText"> 
                            <h5>TOTAL INVESTMENT</h5>
                            <h5> GHC {this.state.totalDeposit.map(user => user.depositAmount)}.00</h5>
                        </div>
                        {showInvestButton && <a href='/dashboard/deposit'><h2 className='btn invest_btn'>INVEST</h2></a>}
                    
                    </div>
                    <div className="dash__box__1">
                        <i class="fas fa-comments-dollar fa-3x"></i>
                        <div className="dashText">
                            <h5>ACCOUNT BALANCE</h5>
                            <h5 className='balanceMe'> GHC {this.state.accountBalance}.00</h5>
                        </div>
                      <a className='btn_balanceMe'  href={`/dashboard/withdraw/${this.state.user_id}`}>  <h2 >WITHDRAW</h2></a>
                    </div>
                </section>
                <section className='welcome__user'>
                    <div className="welcomeText">
                        <h4>Welcome {this.state.user_Name}!</h4>
                        <h4>IP Address : {this.state.ip}</h4>
                    </div>
                </section>
                <section className='progress_bar'>
                    
                </section>
                <section className='about__all'>
                    <div className="all__about_-box__1">
                        <h3>DEPOSIT HISTORY</h3>
                        <div className="all__box">
                            <p>Active Deposit :</p>
                            <p className='activetStatus'>GHC {this.state.user_balance.activetDeposit}.00</p>
                        </div>
                        <div className="all__box">
                            <p>Total Deposit :</p>
                            <p>GHC {this.state.totalDeposit.map(user => user.depositAmount)}.00</p>
                        </div>
                        <div className="all__box">
                            <p>Last Deposit :</p>
                            <p>GHC {this.state.totalDeposit.map(user => user.depositAmountlast)}.00</p>
                        </div>
                    </div>
                    <div className="all__about_-box__1">
                        <h3>WITHDRAW HISTORY</h3>
                        <div className="all__box">
                            <p>Pending Withdraw :</p>
                            <p>GHC0.00</p>
                        </div>
                        <div className="all__box">
                            <p>Total Withdraw :</p>
                            <p>GHC {this.state.withdrawTotal.map(user => user.WithdrawAmount)}.00</p>
                        </div>
                        <div className="all__box">
                            <p>Last Withdraw :</p>   
                            <p>GHC {this.state.withdrawTotal.map(user => user.WithdrawAmountlast)}.00</p>
                        </div>
                    </div>
                </section>
                <section className='reffer__link'>
                    <div className="refferNow">
                        <div className="reff__box_1">
                             <i class="fas fa-users fa-10x"></i>
                        </div>
                        <div className="reff__box_2">
                            <h2>Personal <span>Referral</span> Link:</h2>
                            <p className='reffLink'>https://capgainco.com/?ref={this.state.user_Name}</p>
                            <p className='btn btn-warning btn-referral'> Your Referral Reward: <span>GHC{this.state.user_profile_display.refferReward}.00</span><br/>
                            {this.state.user_profile_display.refferReward > 2 ? (
                            <button className="btn-referral-cashout" onClick={()=>{
                                window.location =`/withdraw-refferReward`
                            }} >Cashout</button>
                            ) : null}
                            <div className="with__inner__box_dash">
                                <p>Total Referral Rewards:</p>
                                <p>GHC{this.state.totalReferralReward || '0'}.00</p>
                                </div>
                             </p>
                             
                        </div>
                    </div>
                </section>
            </div>
         );
    }
}
 
export default AccountRouter;