import React, { Component } from 'react';
import './style.css'
import jwt_decode from 'jwt-decode'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';


class DepositMain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
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
            date: ''
        }

          this.handleChange = this.handleChange.bind(this)
          this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

    componentDidMount(){
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
            toast.warn('Select Bitcoin')
            return false
        }
        setTimeout(()=>{
            window.location='/dashboard/confirm_deposit'
        },600)
    }


    render() { 
        const CalculatorEngine = ()=>{
            if( this.state.amountCalculate){
                 if( this.state.amountCalculate <= 59){
                 const Percentage = this.state.amountCalculate * 9.5/100
                 const totoalCheck = Number(this.state.amountCalculate) + (Percentage)
                document.querySelector('.totalAmount').innerHTML = "$"+ totoalCheck
                document.querySelector('.percent_check').innerHTML = Percentage +" %"
                document.querySelector('.planNowType').innerHTML = "PLAN I"
                 }
  
             }
            if( this.state.amountCalculate){
                 if( this.state.amountCalculate >= 60 ){
                 const Percentage = this.state.amountCalculate * 29/100
                 const totoalCheck = Number(this.state.amountCalculate) + (Percentage)
                document.querySelector('.totalAmount').innerHTML = "$"+totoalCheck
                document.querySelector('.percent_check').innerHTML = Percentage
                document.querySelector('.planNowType').innerHTML = "PLAN II"
                 }
  
             }
            if( this.state.amountCalculate){
                 if( this.state.amountCalculate > 119){
                 const Percentage = this.state.amountCalculate * 49.5/100
                 const totoalCheck = Number(this.state.amountCalculate) + (Percentage)
                document.querySelector('.totalAmount').innerHTML = "$"+totoalCheck
                document.querySelector('.percent_check').innerHTML = Percentage
                document.querySelector('.planNowType').innerHTML = "PLAN III"
                 }
  
             }
            if( this.state.amountCalculate){
                 if( this.state.amountCalculate > 199){
                 const Percentage = this.state.amountCalculate * 70/100
                 const totoalCheck = Number(this.state.amountCalculate) + (Percentage)
                document.querySelector('.totalAmount').innerHTML = "$"+totoalCheck
                document.querySelector('.percent_check').innerHTML = Percentage
                document.querySelector('.planNowType').innerHTML = "PLAN IIII"
                 }
  
             }
            if( this.state.amountCalculate){
                 if( this.state.amountCalculate > 300){
                document.querySelector('.totalAmount').innerHTML = "Please Max Investment is 300$ "
                document.querySelector('.percent_check').innerHTML = 'Not Avalibale'
                document.querySelector('.planNowType').innerHTML = ""
                 }
  
             }
             
               
         }
         CalculatorEngine()
        return ( 
            <div className='depositMain'>
                <ToastContainer/>
                <h1 className='newDeposit'>NEW <span>DEPOSIT</span></h1>
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
                                            <h4>$10.00 - $59.00	</h4>
                                            <h4>9.5</h4>
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
                                            <h4>$60.00 - $119.00	</h4>
                                            <h4>29</h4>
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
                                            <h4>$120.00 - $199.00	</h4>
                                            <h4>49.5</h4>
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
                                            <h4>$200.00 - $300.00	</h4>
                                            <h4>70</h4>
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
                         <p className='totalAmount'>$0</p>
                     </div>
                     <div className="calcualteNow__box_6">
                         <p><span>DAILY PROFIT</span></p>
                         <p className='percent_check'>%</p>
                     </div>
                 </section>
                <section className='other__deposit__info'>
                    <div className="other_deposit_box_1">
                        <div className="other__inner_box">
                            <h5>Your account balance ($):</h5>
                            <h5 className='innerH5'>$0.00</h5>
                        </div>
                        <div className="other__inner_box_2">
                            <h5>Amount to Spend ($):</h5>
                            <h5 className='innerH5'><input name='depositAmount' onChange={this.handleChange('depositAmount')} placeholder='e.g $20'/></h5>
                        </div>
                        <div className="bit__btn">
                             <h5> <input type='radio' name='ckeckWallet' onChange={this.handleChange('checkWallet')}    className='planBtn4'/><span> Bitcoin</span></h5>
                        </div>
                        <div className="bit__btn ">
                             <h5 className='bit__btn_2'><a href='' onClick={this.onSubmit}>SPEND</a></h5>
                        </div>
                    </div>
                </section>
                </div>
            </div>
         );
    }
}
 
export default DepositMain;