import React, { Component } from 'react';
import axios from 'axios'
import './style.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import jwt_decode from 'jwt-decode'
import { io } from "socket.io-client";
import USDT from "./usdt.png";


class ConfirmDeposit extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user_id: '',
            planNow: '',
            depositAmount: '',
            activetDeposit: '',
            fixedDepositAmount: '',
            walletAddress: '',
            user_Name: '',
            full_Name: '',
            email: '',
            amount: '',
            date: '',
            paymentMade: false,
            isSubmitting: false
            

            

        }
        this.onSubmit = this.onSubmit.bind(this)
        this.handlePaymentCheck = this.handlePaymentCheck.bind(this)

       
    }

    handlePaymentCheck = () => {
        this.setState({ paymentMade: true });
    }

    componentDidMount() {
        const depositAmountCheck = Number(sessionStorage.getItem('depositAmount')) || 0;
    
        if (depositAmountCheck <= 599) {
            const uCheck = document.querySelector('.planNow').innerHTML = "24 HOURS";
            setTimeout(() => {
                this.setState({ fixedDepositAmount: uCheck });
            }, 900);
        } else if (depositAmountCheck >= 600 && depositAmountCheck <= 799) {
            const uCheck = document.querySelector('.planNow').innerHTML = "3 DAYS";
            setTimeout(() => {
                this.setState({ fixedDepositAmount: uCheck });
            }, 900);
        } else if (depositAmountCheck >= 800 && depositAmountCheck <= 999) {
            const uCheck = document.querySelector('.planNow').innerHTML = "5 DAYS";
            setTimeout(() => {
                this.setState({ fixedDepositAmount: uCheck });
            }, 900);
        } else if (depositAmountCheck >= 1000) {
            const uCheck = document.querySelector('.planNow').innerHTML = "7 DAYS";
            setTimeout(() => {
                this.setState({ fixedDepositAmount: uCheck });
            }, 900);
        }
    
        // Function to calculate percentage based on deposit amount
        const CalculatorEngine = () => {
              
                const totalMoneyElement = document.querySelector('.toatalAllMoney');
            if (!totalMoneyElement) return; // Ensure the element exists
    
            let checkPercent = 0;

            if (depositAmountCheck > 1000) {
                    checkPercent = depositAmountCheck * 25 / 100;
                } else if (depositAmountCheck > 800) {
                    checkPercent = depositAmountCheck * 20 / 100;
                } else if (depositAmountCheck >= 600) {
                    checkPercent = depositAmountCheck * 15 / 100;
                } else {
                    checkPercent = depositAmountCheck * 10 / 100;
                }

                // Now convert AFTER calculation
                const RATE = 12; // 1 USDT = 12 GHC
                const usdtAmount = checkPercent / RATE;

                // Update state
                this.setState({ checkPercent });

                // Display
                totalMoneyElement.innerHTML = `$${usdtAmount.toFixed(2)}`;
                    };
    
        // Execute the function
        CalculatorEngine();
    
        const user_id = sessionStorage.getItem('user_id');
        const user_Name = sessionStorage.getItem('user_Name');
        const full_Name = sessionStorage.getItem('full_Name');
        const planNow = sessionStorage.getItem('planNow');
        const bitcoin = sessionStorage.getItem('bitcoin');
        const email = sessionStorage.getItem('email');
        const depositAmount = sessionStorage.getItem('depositAmount');
        const activetDeposit = sessionStorage.getItem('activetDeposit');
        const walletAddress = sessionStorage.getItem('walletAddress');
        const date = new Date().toString();
    
        this.setState({
            user_id,
            user_Name,
            full_Name,
            planNow,
            depositAmount,
            walletAddress: bitcoin, // Fix this assignment
            email,
            date,
            activetDeposit,
        });
    }
    
   

   onSubmit = ()=>{
    this.setState({ isSubmitting: true });


        const NewDeposit = {
        user_id: this.state.user_id,
        email: this.state.email,
        user_Name: this.state.user_Name,
        full_Name: this.state.full_Name,
        fixedDepositAmount: this.state.fixedDepositAmount,
        depositAmount: Number(this.state.depositAmount), 
        walletAddress: this.state.walletAddress,
        deposit_date: this.state.deposit_date,
        date: this.state.date

       }
       
       let socket = io('/')

       socket.emit('NewDeposit', NewDeposit)

       
       axios.post("/users/deposit", NewDeposit)
        .then(res => {
            toast.success(
            "⏳ Payment submitted successfully! Please allow 5–10 minutes for network verification. Your account will be updated automatically once the payment is received and confirmed."
            );
        })
        .then(() => {
            setTimeout(() => {
            window.location = "/dashboard";              
            }, 10000); // 10 seconds
        })
        .catch(err => {
            toast.error("❌ Something went wrong. Please try again or contact support.");
        });


   }


    render() { 
        const Amount_to_send = this.state.depositAmount;
        const RATE = 12; // 1 USDT = 15 GHC (you can change this anytime)
        const usdtAmount = Amount_to_send / RATE;

        const { paymentMade, isSubmitting } = this.state;
        return(
            <div className='confirm'>
                <div className='confirmDepositNow'>
                    <h1 className='animate__animated animate__flash animate__slower'><span>DEPOSIT</span>
                    CONFIRMATION:</h1>
                    <ToastContainer/>
                </div>
                <img className='blockchainQbar_pic' src={USDT} alt="USDT QR Code"/>
                <div className='confirmLine'>
                    <div className='lastConfirm'>
                     
                        <div className="insideLastConfirm">
                            <div className='planInfo'>
                                <p>Plan:</p>  
                                <p className='planNow'>  </p>
                            </div>
                            <div className='planInfo'>
                                <p>Profit:</p>
                                <p className='toatalAllMoney'></p>
                            </div>
                            <div className='planInfo'>
                                <p>Principal Return:</p>
                                <p>Yes</p>
                            </div>
                            <div className='planInfo'>
                                <p>Principal Withdraw: Available</p>
                                <p>Yes</p>
                            </div>
                            <div className='planInfo'>
                                <p>Credit Amount:</p>
                                <p>USDT ${usdtAmount.toFixed(2)}</p>
                            </div>
                            <div className='planInfo'>
                                <p>Deposit Fee:</p>
                                <p>	0.00% + $0.00 (min. $0.00 max. $0.00)</p>
                            </div>
                            <div className='planInfo'>
                                <p>Debit Amount:</p>
                                <p>usdt ${usdtAmount.toFixed(2)}</p>
                            </div>
                            <div className='planInfo'>
                                <p>BTC Debit Amount:</p>
                                <p><span className='outAmount'></span></p> 
                            </div>

                            <div className='confirmBtnInfo'>
                                <p>Please Send only USDT (TRC20). Do not send other networks:</p>
                                <p> <p>Kindly use your User Name <span> { this.state.user_Name}</span><br/> as Reference ID or Description when making Payment Transaction </p> <br/>Please send exactly <span className='outAmount1'>{usdtAmount.toFixed(2)}</span> USDT to<br/>
                                <p className='wallertNumber'><span>TMmpdCUFH9xJ5efivRdyAw8MBVGqdsJmpX</span></p>
                                
                                <h4>Order status: <span>Waiting for payment</span></h4>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='confirm'>
                <div className='btnConfirm'>
                    <button 
                        className='btn btn-primary' 
                        onClick={this.handlePaymentCheck}
                        disabled={paymentMade}
                    >
                        {paymentMade ? <div className="spinner"></div> : "I HAVE PAID"}
                    </button>
                </div>
                <p style={{ color: 'red', fontWeight: 'bold' }}>
                    ⚠️ Warning: Do not click the "Confirm Payment" button without making a deposit!  
                    If you confirm payment without actually depositing, your account will be frozen or blocked after multiple attempts.  
                    Please ensure you have completed the payment before confirming.
                </p>

                <div className='btnConfirm'>
                <button 
                className='btn btn-success' 
                onClick={this.onSubmit}
                disabled={!paymentMade || isSubmitting}
            >
                {isSubmitting ? <div className="spinner"></div> : "CONFIRM , PAYMENT ✅"}
            </button>

                </div>
            </div>
               
                {/* <div className='btnConfirm'>
                     <button className='btn btn-success' onClick={this.onSubmit}>I PAID CONFIRM</button>
                 </div> */}
            </div>

        )
    }
}
 
export default ConfirmDeposit;