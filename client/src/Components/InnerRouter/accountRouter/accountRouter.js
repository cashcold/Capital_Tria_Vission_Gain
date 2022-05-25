import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import {addDays,addMinutes} from "date-fns"
import './style.css'

class AccountRouter extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            full_Name: '',
            user_Name: '',
            ip_address: '',
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
            Refedate: ''
         }

         this.handleChange = this.handleChange.bind(this)
    }
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

    componentDidMount(){

        // const RefreshToken = sessionStorage.getItem('RefreshToken')
        // const Refres_profile_hToken = sessionStorage.getItem('Refres_profile_hToken')
        // if(RefreshToken || Refres_profile_hToken){
        //     sessionStorage.removeItem('x-access-token')
        //     sessionStorage.setItem('x-access-token',RefreshToken)
        //     sessionStorage.setItem('x-access-token',Refres_profile_hToken)
        // }
        
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
    
    render() { 
       
        
       
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
                if(activetDeposit__amount <= 59){
                  if(today_date > date_24hrs){
                      
                        document.querySelector('.activetStatus').innerHTML = "$0.00"
                        document.querySelector('.balanceMe').innerHTML = "$ "+activetDeposit__amount+".00"
                        document.querySelector('.btn_balanceMe').style.display = 'block'
                       
                        
                    
                    }else{
                    
                    }
                }
            }
            if(activetDeposit__amount){
                if(activetDeposit__amount >= 60){
                  if(today_date > date_3days){
                        document.querySelector('.activetStatus').innerHTML = "$0.00"
                        document.querySelector('.balanceMe').innerHTML = "$ "+activetDeposit__amount+".00"
                        document.querySelector('.btn_balanceMe').style.display = 'block'
                        
                    
                    }else{
                    
                    }
                }
            }
            if(activetDeposit__amount){
                if(activetDeposit__amount > 119){
                  if(today_date > date_5days){
                        document.querySelector('.activetStatus').innerHTML = "$0.00"
                        document.querySelector('.balanceMe').innerHTML = "$ "+activetDeposit__amount+".00"
                        document.querySelector('.btn_balanceMe').style.display = 'block'
                    
                    }else{
                    
                    }
                }
            }
            if(activetDeposit__amount){
                if(activetDeposit__amount > 199){
                  if(today_date > date_7days){
                        document.querySelector('.activetStatus').innerHTML = "$0.00"
                        document.querySelector('.balanceMe').innerHTML = "$ "+activetDeposit__amount+".00"
                        document.querySelector('.btn_balanceMe').style.display = 'block'
                    
                    }else{
                    
                    }
                }
            }
       }
       CreditDashboard()
        return ( 
            <div className='account__router'>
                 <section className='dashboard__section_box__3'>
                    <div className="dash__box__1">
                        <i class="fas fa-coins fa-3x"></i>
                        <div className="dashText"> 
                            <h5>TOTAL INVESTMENT</h5>
                            <h5> $ {this.state.totalDeposit.map(user => user.depositAmount)}.00</h5>
                        </div>
                        <a href='/dashboard/deposit'><h2 className='btn'>INVEST</h2></a>
                    </div>
                    <div className="dash__box__1">
                        <i class="fas fa-comments-dollar fa-3x"></i>
                        <div className="dashText">
                            <h5>ACCOUNT BALANCE</h5>
                            <h5 className='balanceMe'> $ {this.state.accountBalance}.00</h5>
                        </div>
                      <a className='btn_balanceMe'  href={`/dashboard/withdraw/${this.state.user_id}`}>  <h2 >WITHDRAW</h2></a>
                    </div>
                </section>
                <section className='welcome__user'>
                    <div className="welcomeText">
                        <h4>Welcome {this.state.user_Name}!</h4>
                        <h4>IP Address : {this.state.ip_address}</h4>
                    </div>
                </section>
                <section className='about__all'>
                    <div className="all__about_-box__1">
                        <h3>DEPOSIT HISTORY</h3>
                        <div className="all__box">
                            <p>Active Deposit :</p>
                            <p className='activetStatus'>$ {this.state.user_balance.activetDeposit}.00</p>
                        </div>
                        <div className="all__box">
                            <p>Total Deposit :</p>
                            <p>$ {this.state.totalDeposit.map(user => user.depositAmount)}.00</p>
                        </div>
                        <div className="all__box">
                            <p>Last Deposit :</p>
                            <p>$ {this.state.totalDeposit.map(user => user.depositAmountlast)}.00</p>
                        </div>
                    </div>
                    <div className="all__about_-box__1">
                        <h3>WITHDRAW HISTORY</h3>
                        <div className="all__box">
                            <p>Pending Withdraw :</p>
                            <p>$0.00</p>
                        </div>
                        <div className="all__box">
                            <p>Total Withdraw :</p>
                            <p>$ {this.state.withdrawTotal.map(user => user.WithdrawAmount)}.00</p>
                        </div>
                        <div className="all__box">
                            <p>Last Withdraw :</p>
                            <p>$ {this.state.withdrawTotal.map(user => user.WithdrawAmountlast)}.00</p>
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
                            <p className='reffLink'>https://capitalgain/?ref={this.state.user_Name}</p>
                        </div>
                    </div>
                </section>
            </div>
         );
    }
}
 
export default AccountRouter;