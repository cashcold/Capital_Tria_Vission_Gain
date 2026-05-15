import React, { Component } from 'react';
import './style.css'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { io } from "socket.io-client";
import PaymentNameUpdateNotice from '../PaymentNameUpdateNotice/PaymentNameUpdateNotice';

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
        checkPercent: 0,
        TotalWithdraw: '',
        withdrawStatusMessage: '',
    }

         this.handleChange = this.handleChange.bind(this)
         this.WithdrawNowFound = this.WithdrawNowFound.bind(this)
    }

     handleChange =input => (event)=>{
        event.preventDefault()
        this.setState({[input]: event.target.value})
    }

   WithdrawNowFound = async (e) => {
    e.preventDefault();

    this.setState({
        withdrawStatusMessage: ''
    });

    const Withdraw = {
        user_id: this.state.user_id,
        accountBalance: this.state.accountBalance,
        activetDeposit: this.state.activetDeposit__amount,
        zero_accountBalance: this.state.zero_accountBalance,
        user_Name: this.state.user_Name,
        full_Name: this.state.full_Name,
        type: this.state.type,
        email: this.state.email,
        date: this.state.withdraw_date,
        bitcoin: this.state.bitcoin,
        checkPercent: this.state.checkPercent,
        TotalWithdraw: this.state.TotalWithdraw
    };

    try {
        const id = this.props.match.params.id;

        const response = await axios.post(`/users/withdraw/${id}`, Withdraw);

        // only emit after backend approves
        let socket = io('/');
        socket.emit('Withdraw', Withdraw);

        sessionStorage.setItem('RefreshToken', JSON.stringify(response.data));

        toast.success("Account Updated Successfully", {
            autoClose: false
        });

        setTimeout(() => {
            window.location = '/dashboard';
        }, 3000);

    } catch (error) {
       const message =
        error?.response?.data?.error ||
        error?.response?.data ||
        "Withdrawal failed";

        toast.error(message, { autoClose: false });

        this.setState({
            withdrawStatusMessage: message
        });

        return;
    }
};

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

        // Calculate checkPercent based on deposit amount
        let checkPercent = 0;
        const depositAmountNum = Number(activetDeposit__amount);

        if (depositAmountNum >= 10 && depositAmountNum <= 299) {
            checkPercent = depositAmountNum * 10 / 100;

        } else if (depositAmountNum >= 300 && depositAmountNum <= 599) {
            checkPercent = depositAmountNum * 15 / 100;

        } else if (depositAmountNum >= 600 && depositAmountNum <= 899) {
            checkPercent = depositAmountNum * 20 / 100;

        } else if (depositAmountNum >= 900 && depositAmountNum <= 1200) {
            checkPercent = depositAmountNum * 25 / 100;

        } else {
            checkPercent = 0; // fallback (optional)
        }

        const TotalWithdraw = depositAmountNum + checkPercent;
        this.setState({ checkPercent, TotalWithdraw });

        if(activetDeposit__amount > 1){
            document.querySelector(".blink_me").style.display = "none";
            document.querySelector(".withdrawBtn").style.display = "block";
           
        }
    }
    render() { 
        return ( 
            <div className='withdraw__main'>
                <ToastContainer
                    position="top-center"
                    autoClose={false}
                    newestOnTop
                    closeOnClick
                    pauseOnHover
                    draggable
                    style={{ zIndex: 9999 }}
                />
                <h1 className='widthraw__h1'>WITHDRAW FUND</h1>
                <div className="textInfo blink_me alert alert-danger  " role="alert" >
                     <h5>You have no funds to withdraw.</h5>
                </div>
                <PaymentNameUpdateNotice/>
                <div className="All__flow__withdraw">
                    <section className='withdraw__box__1'>
                      <div className="flow__text">
                            <div className="with__inner__box_1">
                                <h4 className='style__h4'>Account Balance:</h4>
                            </div>
                            <div className="with__inner__box_1">
                                <h4>GHC{this.state.TotalWithdraw}.00</h4>
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
                            <h4><i class="fa fa-money" ></i>momo number</h4>
                        </div>
                        <div className="method__box">
                            <h4 className=''>GHC{this.state.TotalWithdraw}.00</h4><br/>
                            {this.state.withdrawStatusMessage && (
                                <p style={{ color: "red", fontWeight: "bold" }}>
                                    ⚠️ {this.state.withdrawStatusMessage}
                                </p>
                            )}
                            <a href='#' className='btn btn-success withdrawBtn' onClick={this.WithdrawNowFound}>
                                WITHDRAW BALANCE
                            </a>
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