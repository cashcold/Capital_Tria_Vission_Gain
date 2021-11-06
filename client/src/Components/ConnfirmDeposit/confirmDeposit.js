import React, { Component } from 'react';
import axios from 'axios'
import './style.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import jwt_decode from 'jwt-decode'
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
            date: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

       
    }

    componentDidMount(){
        
        


        const depositAmountCheck = sessionStorage.getItem('depositAmount')
        if(Number(depositAmountCheck) <= 59){
          const uCheck =   document.querySelector('.planNow').innerHTML = "24 HOURS"
          setTimeout(()=>{
              this.setState({
              fixedDepositAmount: uCheck
          })
          },900)
        }
        if(Number(depositAmountCheck) >= 60){
            const uCheck =   document.querySelector('.planNow').innerHTML = "3 DAYS"
            setTimeout(()=>{
                this.setState({
                fixedDepositAmount: uCheck
            })
            },900)
        }
        if(Number(depositAmountCheck) > 119){
            const uCheck =   document.querySelector('.planNow').innerHTML = "5 DAYS"
            setTimeout(()=>{
                this.setState({
                fixedDepositAmount: uCheck
            })
            },900)
        }
        if(Number(depositAmountCheck) > 199){
            const uCheck =   document.querySelector('.planNow').innerHTML = "7 DAYS"
            setTimeout(()=>{
                this.setState({
                fixedDepositAmount: uCheck
            })
            },900)
        }


        
        // const depositAmountCheck = sessionStorage.getItem('depositAmount')

        const CalculatorEngine = ()=>{
        if( depositAmountCheck <= 59){
           const Percentage = depositAmountCheck * 9.5/100
            const checkPercent = Percentage

            document.querySelector('.toatalAllMoney').innerHTML ="$"+checkPercent
          }else if( depositAmountCheck  >= 60){
              const Percentage =  depositAmountCheck  * 29/100
              const checkPercent = Percentage
 
             document.querySelector('.toatalAllMoney').innerHTML ="$"+checkPercent 

          }
          else if(depositAmountCheck > 119){
              const Percentage = depositAmountCheck * 49.5/100
              const checkPercent = Percentage

              document.querySelector('.toatalAllMoney').innerHTML ="$"+checkPercent

          }
          
          else if(depositAmountCheck <=199){
              const Percentage = depositAmountCheck * 45/100
              const checkPercent = Percentage
 
             document.querySelector('.toatalAllMoney').innerHTML ="$"+checkPercent 

          }
          
     }
     CalculatorEngine()
      
        
        
        const user_id =  sessionStorage.getItem('user_id')
        const user_Name =  sessionStorage.getItem('user_Name')
        const full_Name = sessionStorage.getItem('full_Name')
        const planNow  = sessionStorage.getItem('planNow')
        const bitcoin  = sessionStorage.getItem('bitcoin')
        const email  = sessionStorage.getItem('email')
        const depositAmount = sessionStorage.getItem('depositAmount')
        const activetDeposit = sessionStorage.getItem('activetDeposit')
        const walletAddress = sessionStorage.getItem('walletAddress')
        const date = new Date().toString()

        this.setState({
            user_id,
            user_Name,
            full_Name,
            planNow,
            depositAmount,
            walletAddress,
            email,
            date,
            walletAddress: bitcoin,
            activetDeposit


        })
        
    }

    
   onSubmit = ()=>{
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
       
       axios.post( "/users/deposit",NewDeposit).then(res => {toast.success('...Waiting for Blockchain confirmation')}).then(res => setTimeout(()=>{
            window.location='/dashboard'
       },1100))

   }


    render() { 
        return(
            <div className='confirm'>
                <div className='confirmDepositNow'>
                    <h1 className='animate__animated animate__flash animate__slower'><span>DEPOSIT</span> CONFIRMATION:</h1>
                    <ToastContainer/>
                </div>
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
                                <p>${this.state.depositAmount}</p>
                            </div>
                            <div className='planInfo'>
                                <p>Deposit Fee:</p>
                                <p>	0.00% + $0.00 (min. $0.00 max. $0.00)</p>
                            </div>
                            <div className='planInfo'>
                                <p>Debit Amount:</p>
                                <p>${this.state.depositAmount}</p>
                            </div>
                            <div className='planInfo'>
                                <p>BTC Debit Amount:</p>
                                <p><span className='outAmount'></span></p>
                            </div>

                            <div className='confirmBtnInfo'>
                                <p> <p>Kindly use your User Name <span> { this.state.user_Name}</span><br/> as Reference ID or Description when making Payment Transaction </p> <br/>Please send exactly <span className='outAmount1'></span> BTC to<br/>
                                <p className='wallertNumber'><span>14VoBZY3Pap6NUeTxNttspyGHBx92d1wAh</span></p>
                                
                                <h4>Order status: <span>Waiting for payment</span></h4>
                                </p>
                            </div>
                        </div>
                    </div>
                    <img className='blockchainQbar_pic' src={require('../../images/blockchainQbar-code.png')}/>
                </div>
               
                <div className='btnConfirm'>
                     <button className='btn btn-success' onClick={this.onSubmit}>I PAID CONFIRM</button>
                 </div>
            </div>

        )
    }
}
 
export default ConfirmDeposit;