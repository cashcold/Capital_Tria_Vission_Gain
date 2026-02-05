import React, { Component } from 'react';
import './style.css'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import ReferralDepositNoticeModal from '../ReferralDepositNoticeModal/ReferralDepositNoticeModal';


class DepositMain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            user_profile_display: '',
            user_id: '',
            planNow: '',
            depositAmount: '',
            walletAddress: '',
            checkWallet: '',
            user_Name: '',
            full_Name: '',
            email: '',
            amount: '',
            deposit_date: '',
            date: '',
            showReferralNotice: true, 
        }

          this.handleChange = this.handleChange.bind(this)
          this.onSubmit = this.onSubmit.bind(this)
          this.closeReferralNotice = this.closeReferralNotice.bind(this);

    }

    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

    closeReferralNotice = () => {
    this.setState({ showReferralNotice: false });
    };


    componentDidMount(){
         const token = sessionStorage.getItem('x-access-token');
            
              if (!token) {
                  throw new Error('Token missing or null');
              }
        
              const decoded = jwt_decode(token); // Decode the token
              const currentTime = Date.now() / 1000; // Current time in seconds
        
              if (decoded.exp && decoded.exp < currentTime) {
                  throw new Error('Token expired');
              }
            const id = decoded.user_id
            axios.post('/users/user_profile_display',{id})
            .then(data => this.setState({user_profile_display: data.data}))

        const user_Name = sessionStorage.getItem('user_Name');
         this.setState({
            user_Name: user_Name,
        });

        const deposit_date = new Date().toString()
        this.setState({
            deposit_date
        })
        const DateTime = new Date().toString()
        this.setState({
            date: DateTime
        })
        console.log(this.state.date)
    }

    onSubmit = (event)=>{
        event.preventDefault()
        
        sessionStorage.setItem('planNow', this.state.planNow)
         sessionStorage.setItem('depositAmount', this.state.depositAmount)
        sessionStorage.setItem('deposit_date', this.state.deposit_date)

        const DepositForm = {
            user_id: this.state.user_id,
            user_Name: this.state.user_Name,
            full_Name: this.state.full_Name,
            planNow: this.state.planNow,
            depositAmount: this.state.depositAmount,
            activetDeposit: this.state.depositAmount,
            walletAddress: this.state.walletAddress,
            date: this.state.date,
            checkWallet: this.state.checkWallet,

        }

        if(!DepositForm.planNow){
            toast.warn('Select Plan')
            return false
        }
        if(!DepositForm.depositAmount){
            toast.warn('Amount to Spend')
            return false
        }
        if(!DepositForm.checkWallet){
            toast.warn('Select Deposit Method')
            return false
        }
        setTimeout(()=>{
            window.location='/dashboard/confirm_deposit'
        },600)
    } 
    onSubmitMomo = (event)=>{
        event.preventDefault()
        
        sessionStorage.setItem('planNow', this.state.planNow)
         sessionStorage.setItem('depositAmount', this.state.depositAmount)
        sessionStorage.setItem('deposit_date', this.state.deposit_date)

        const DepositForm = {
            user_id: this.state.user_id,
            user_Name: this.state.user_Name,
            full_Name: this.state.full_Name,
            planNow: this.state.planNow,
            depositAmount: this.state.depositAmount,
            activetDeposit: this.state.depositAmount,
            walletAddress: this.state.walletAddress,
            date: this.state.date,
            checkWallet: this.state.checkWallet,

        }

        if(!DepositForm.planNow){
            toast.warn('Select Plan')
            return false
        }
        if(!DepositForm.depositAmount){
            toast.warn('Amount to Spend')
            return false
        }
        if(!DepositForm.checkWallet){
            toast.warn('Select Deposit Method')
            return false
        }
        setTimeout(()=>{
            window.location='/dashboard/MomoDeposit'
        },600)
    }


    render() { 
        const CalculatorEngine = ()=>{
            if( this.state.amountCalculate){
                 if( this.state.amountCalculate <= 599){
                 const Percentage = this.state.amountCalculate * 10/100
                 const totoalCheck = Number(this.state.amountCalculate) + (Percentage)
                document.querySelector('.totalAmount').innerHTML = "GHC"+ totoalCheck
                document.querySelector('.percent_check').innerHTML = Percentage +" GHC"
                document.querySelector('.planNowType').innerHTML = "PLAN I 24HRS"
                 }
  
             }
            if( this.state.amountCalculate){
                 if( this.state.amountCalculate >= 600 ){
                 const Percentage = this.state.amountCalculate * 15/100
                 const totoalCheck = Number(this.state.amountCalculate) + (Percentage)
                document.querySelector('.totalAmount').innerHTML = "GHC"+totoalCheck
                document.querySelector('.percent_check').innerHTML = Percentage
                document.querySelector('.planNowType').innerHTML = "PLAN II 3DAYS"
                 }
  
             }
            if( this.state.amountCalculate){
                 if( this.state.amountCalculate > 800){
                 const Percentage = this.state.amountCalculate * 20/100
                 const totoalCheck = Number(this.state.amountCalculate) + (Percentage)
                document.querySelector('.totalAmount').innerHTML = "GHC"+totoalCheck
                document.querySelector('.percent_check').innerHTML = Percentage
                document.querySelector('.planNowType').innerHTML = "PLAN III 5DAYS"
                 }
  
             }
            if( this.state.amountCalculate){
                 if( this.state.amountCalculate > 1000){
                 const Percentage = this.state.amountCalculate * 25/100
                 const totoalCheck = Number(this.state.amountCalculate) + (Percentage)
                document.querySelector('.totalAmount').innerHTML = "GHC"+totoalCheck
                document.querySelector('.percent_check').innerHTML = Percentage
                document.querySelector('.planNowType').innerHTML = "PLAN IV 7DAYS"
                 }
  
             }
            if( this.state.amountCalculate){
                 if( this.state.amountCalculate > 1201){
                document.querySelector('.totalAmount').innerHTML = "Please Max Investment is GHC1201 "
                document.querySelector('.percent_check').innerHTML = 'Not Available'
                document.querySelector('.planNowType').innerHTML = ""
                 }
  
             }
             
               
         }
         CalculatorEngine()
        return ( 
            <div className='depositMain'>
                <ToastContainer/>
                <ReferralDepositNoticeModal
                show={this.state.showReferralNotice}
                onClose={this.closeReferralNotice}
                referralLink={`https://capgainco.com/?ref=${this.state.user_Name || "YOUR_USERNAME"}`}
                />

                <h1 className='newDeposit'>NEW <span>DEPOSIT</span></h1>
                <div className="maxInvestReal">
                <div className="statusDot"></div>
                <div className="content">
                    <p className="title">Mining Limit Protection</p>
                    <p className="desc">
                    Your Maximum Mining Invest is
                    <span className="amount"> {this.state.user_profile_display.maxDeposit} GHC</span>
                    </p>
                </div>
                <div className="badge">SECURED</div>
                </div>

                <div className="allSection">
                <section className='deposit__box__1'>
                    <div className="deposit__1">
                        <div className="depositInfo__lay__1">
                            <h3> <input type='radio' name='planNow' value='24HRS' onChange={this.handleChange('planNow')}   className='planBtn4'/>  Plan 1</h3>
                        </div>
                        <div className="depositInfo__lay__2">
                             <div className="depositInfo__box__1">
                                 <div className="depositInfo__box__1">
                                    <div className="depositInfo__innerbox__1">
                                        <h4><span>Plan</span></h4>
                                        <h4><span>Spent Amount ($)</span></h4>
                                        <h4><span>Profit (%)</span></h4>
                                    </div>
                                 </div>
                             </div> 
                             <div className="depositInfo__box__2">
                                     <div className="depositInfo__box__1">
                                        <div className="depositInfo__innerbox__1">
                                            <h4>24HRS</h4>
                                            <h4>GHC50 - GHC599	</h4>
                                            <h4>10</h4>
                                        </div>
                                    </div>
                             </div>
                             
                        </div>
                    </div>
                </section>
                <section className='deposit__box__1'>
                    <div className="deposit__1">
                        <div className="depositInfo__lay__1">
                            <h3> <input type='radio' name='planNow' value='3 DAYS' onChange={this.handleChange('planNow')}   className='planBtn4'/>  Plan 2</h3>
                        </div>
                        <div className="depositInfo__lay__2">
                             <div className="depositInfo__box__1">
                                 <div className="depositInfo__box__1">
                                    <div className="depositInfo__innerbox__1">
                                        <h4><span>Plan</span></h4>
                                        <h4><span>Spent Amount ($)</span></h4>
                                        <h4><span>Profit (%)</span></h4>
                                    </div>
                                 </div>
                             </div> 
                             <div className="depositInfo__box__2">
                                     <div className="depositInfo__box__1">
                                        <div className="depositInfo__innerbox__1">
                                            <h4>3 DAYS</h4>
                                            <h4>GHC600 - GHC799	</h4>
                                            <h4>15</h4>
                                        </div>
                                    </div>
                             </div>
                        </div>
                    </div>
                </section>
                <section className='deposit__box__1'>
                    <div className="deposit__1">
                        <div className="depositInfo__lay__1">
                            <h3> <input type='radio' name='planNow' value='5 days' onChange={this.handleChange('planNow')}className='planBtn4'/>  Plan 3</h3>
                        </div>
                        <div className="depositInfo__lay__2">
                             <div className="depositInfo__box__1">
                                 <div className="depositInfo__box__1">
                                    <div className="depositInfo__innerbox__1">
                                        <h4><span>Plan</span></h4>
                                        <h4><span>Spent Amount ($)</span></h4>
                                        <h4><span>Profit (%)</span></h4>
                                    </div>
                                 </div>
                             </div> 
                             <div className="depositInfo__box__2">
                                     <div className="depositInfo__box__1">
                                        <div className="depositInfo__innerbox__1">
                                            <h4>5 DAYS</h4>
                                            <h4>GHC800 - GHC999	</h4>
                                            <h4>20</h4>
                                        </div>
                                    </div>
                             </div>
                        </div>
                    </div>
                </section>
                <section className='deposit__box__1'>
                    <div className="deposit__1">
                        <div className="depositInfo__lay__1">
                            <h3> <input type='radio' name='planNow' value='7 DAYS' onChange={this.handleChange('planNow')}   className='planBtn4'/>  Plan 4</h3>
                        </div>
                        <div className="depositInfo__lay__2">
                             <div className="depositInfo__box__1">
                                 <div className="depositInfo__box__1">
                                    <div className="depositInfo__innerbox__1">
                                        <h4><span>Plan</span></h4>
                                        <h4><span>Spent Amount ($)</span></h4>
                                        <h4><span>Profit (%)</span></h4>
                                    </div>
                                 </div>
                             </div> 
                             <div className="depositInfo__box__2">
                                     <div className="depositInfo__box__1">
                                        <div className="depositInfo__innerbox__1">
                                            <h4>7 DAYS</h4>
                                            <h4>GHC1000 - GHC1200	</h4>
                                            <h4>25</h4>
                                        </div>
                                    </div>
                             </div>
                        </div>
                    </div>
                </section>
                <section className='calculateMe'>
                     <div className="calcualteNow__box_1">
                        <img src={require('../../images/b72895618be95619a15bd4a0befdf826.png')}/>
                     </div>
                     <div className="calcualteNow__box_2">
                         <h2>CALCULATE <br/><span className='profit'>PROFIT</span></h2>
                     </div>
                     <div className="calcualteNow__box_3">
                         <p><span>Enter Amount</span></p>
                         <input name='amountCalculate' onChange={this.handleChange('amountCalculate')} className='calculateInput'/>
                     </div>
                     <div className="calcualteNow__box_4">
                         <p><span>PLAN</span></p>
                         <p className='planNowType'></p>
                     </div>
                     <div className="calcualteNow__box_5">
                         <p><span>DAILY EARNING</span></p>
                         <p className='totalAmount'>GHC0</p>
                     </div>
                     <div className="calcualteNow__box_6">
                         <p><span>DAILY PROFIT</span></p>
                         <p className='percent_check'>GHC</p>
                     </div>
                 </section>
                <section className='other__deposit__info'>
                    <div className="other_deposit_box_1">
                        <div className="other__inner_box">
                            <h5>Your account balance (GHC):</h5>
                            <h5 className='innerH5'>GHC0.00</h5>
                        </div>
                        <div className="other__inner_box_2">
                            <h5>Amount to Spend (GHC):</h5>
                            <h5 className='innerH5'><input name='depositAmount' onChange={this.handleChange('depositAmount')} placeholder='e.g GHC50'/></h5>
                        </div>
                        <div className="bit__btn">
                             <h5> <input type='radio' name='ckeckWallet' onChange={this.handleChange('checkWallet')}    className='planBtn4'/><span> Bitcoin</span></h5>
                             <h5> <input type='radio' name='ckeckWallet' onChange={this.handleChange('checkWallet')}    className='planBtn4'/><span> Momo Number</span></h5>
                        </div>
                        <div className="bit__btn ">
                             <h5 className='bit__btn_2'><a href='#' >Pay with Bitcoin</a></h5>
                             {/* <h5 className='bit__btn_2'><a href='' onClick={this.onSubmit}>Pay with Bitcoin</a></h5> */}
                             <h5 className='bit__btn_2'><a href='' onClick={this.onSubmitMomo}>Pay with Momo Number</a></h5>
                        </div>
                    </div>
                </section>
                </div>
            </div>
         );
    }
}
 
export default DepositMain;