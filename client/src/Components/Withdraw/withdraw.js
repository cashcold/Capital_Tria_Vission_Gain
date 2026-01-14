import React, { Component } from 'react';
import './style.css'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from "socket.io-client";

class WithdrawMain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
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
         }

         this.handleChange = this.handleChange.bind(this)
         this.WithdrawNowFound = this.WithdrawNowFound.bind(this)
    }

     handleChange =input => (event)=>{
        event.preventDefault()
        this.setState({[input]: event.target.value})
    }

    WithdrawNowFound = ()=>{
        this.setState({depositAmount: Number(0)})
        setTimeout(()=>
        {toast.success(`Payment will be sent to your account`)},800)

        // sessionStorage.removeItem('token')
        

        const Withdraw = { 
            user_id: this.state.user_id,
            accountBalance: this.state.accountBalance,
            activetDeposit: this.state.activetDeposit__amount,
            zero_accountBalance: this.state.zero_accountBalance,
            user_Name: this.state.user_Name,
            full_Name: this.state.user_Name,
            type: this.state.type,
            email: this.state.email,
            date: this.state.withdraw_date, 
            bitcoin: this.state.bitcoin,
            activetDeposit: this.state.activetDeposit__amount,
            
        }
        let socket = io('/')

        socket.emit('Withdraw', Withdraw)
        const id  = this.props.match.params.id
        
        axios.post(`/users/withdraw/${id}`,Withdraw).then(res => { 
            sessionStorage.setItem('RefreshToken',JSON.stringify(res.data))
            return res.data;
        }).then(res => {toast.success("Account Update") }).then(setTimeout(()=>{
            window.location='/dashboard'
        },5000))

       
        
    }

    componentDidMount(){
        
        

      
        
        const activetDeposit__amount =  sessionStorage.getItem('activetDeposit__amount')
        const user_id =  sessionStorage.getItem('user_id')
        const user_Name =  sessionStorage.getItem('user_Name')
        const full_Name =  sessionStorage.getItem('full_Name')
        const email = sessionStorage.getItem('email')
        const bitcoin = sessionStorage.getItem('bitcoin')
        const activetDeposit = sessionStorage.getItem('activetDeposit')
        const withdraw_date = new Date().toString()

        this.setState({
            user_Name,
            full_Name,
            email,
            bitcoin,
            user_id,
            withdraw_date,
            activetDeposit,
            activetDeposit__amount
        })





        

        this.setState({
            depositAmount: activetDeposit__amount
        })

        if(activetDeposit__amount > 1){
            document.querySelector(".blink_me").style.display = "none";
            document.querySelector(".withdrawBtn").style.display = "block";
           
        }
    }
    render() { 
        return ( 
            <div className='withdraw__main'>
                <ToastContainer/>
                <h1 className='widthraw__h1'>WITHDRAW FUND</h1>
                <div className="textInfo blink_me alert alert-danger  " role="alert" >
                     <h5>You have no funds to withdraw.</h5>
                </div>
                <div className="All__flow__withdraw">
                    <section className='withdraw__box__1'>
                      <div className="flow__text">
                            <div className="with__inner__box_1">
                                <h4 className='style__h4'>Account Balance:</h4>
                            </div>
                            <div className="with__inner__box_1">
                                <h4>GHC{this.state.activetDeposit__amount}.00</h4>
                            </div>
                            <div className="with__inner__box_1">
                                <h4 className='style__h4'>Pending Withdrawals:</h4>
                            </div>
                            <div className="with__inner__box_1">
                                <h4>GHC0.00</h4>
                            </div>
                      </div>
                    </section>
                    <section className='widthdraw__info'>
                        <div className="width__process__1">
                            <h4>Processing</h4>
                        </div>
                        <div className="width__process__1">
                            <h4>Available</h4>
                        </div>
                        <div className="width__process__1">
                            <h4>Pending</h4>
                        </div>
                    </section>
                    <section className='width__method'>
                        <div className="method__box">
                            <h4><i class="fab fa-bitcoin"></i>Bitcoin</h4>
                        </div>
                        <div className="method__box">
                            <h4 className=''>GHC{this.state.activetDeposit__amount}.00</h4><br/>
                            <a href='#' className='btn btn-success withdrawBtn ' onClick={this.WithdrawNowFound}>WITHDRAW BALANCE</a>
                        </div>
                        <div className="method__box">
                            <h4  className='btn btn-danger'>GHC0.00</h4>
                        </div>
                    </section>
                    <section className='wallet'>
                        <div className="iconWallet">
                        <i class="fas fa-wallet fa-3x"></i>
                        </div>
                        <div className="wallet__id">
                            <h4>wallet address</h4>
                        </div>
                        <div className="wallet__id">
                            <h4>{this.state.bitcoin}</h4>
                        </div>
                       
                    </section>
                  
                </div>
              
            </div>
         );
    }
}
 
export default WithdrawMain;