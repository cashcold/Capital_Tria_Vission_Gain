import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './style.css'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import {DropdownButton,Dropdown} from 'react-bootstrap'

class RegisterUser extends Component {  
    constructor(props) {
        super(props);
        this.state = { 
            full_Name: '',
            user_Name: '',
            password: '',
            confirm_password: '',
            email: '',
            bitcoin: '',
            ip_address: '',
            accountBalance: '',
            activetDeposit: '',
            question: '',
            question__ans: '',
            reffer: '',
            refferReward: '',
            restartLinkPassword: '',
            checkBox: '',
            date: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

    }

    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }
   

    componentDidMount(){

       

        const DateTime = new Date().toString()
        this.setState({
            date: DateTime
        })
        console.log(this.state.date)

        fetch('http://api.ipify.org/?format=json').then(res => res.json()).then(data => this.setState({
            ip_address: data.ip
        }))

        const reffer = sessionStorage.getItem('reffer')

        this.setState({reffer: reffer})
       
        
    } 
    onSubmit = (event)=>{
        event.preventDefault() 
        const SaveNewUser = {
            full_Name: this.state.full_Name.trim(),
            user_Name: this.state.user_Name.replace(/\s/g, ''),
            password: this.state.password,
            comfirm_password: this.state.comfirm_password,
            email: this.state.email.replace(/\s/g, ''),
            bitcoin: this.state.bitcoin.trim(),
            ip_address: this.state.ip_address,
            accountBalance: this.state.accountBalance,
             activetDeposit: this.state.activetDeposit,
            reffer: this.state.reffer,
            refferReward: this.state.refferReward,
            restartLinkPassword: this.state.restartLinkPassword,
            question: this.state.question.trim(),
            question__ans: this.state.question__ans.trim(),
            checkBox: this.state.checkBox,
            date: this.state.date
            
        }

        
        if(SaveNewUser.full_Name.length < 6){
            toast.warn('Full Name must be at least 6 characters')
            return false
        }
        if(SaveNewUser.user_Name.length < 5){
            toast.warn('User Name must be at least 5 characters')
            return false
        }
        if(SaveNewUser.password.length < 10){
            toast.warn('Password must be at least 10 characters')
            return false
        }
        if(SaveNewUser.password !== SaveNewUser.comfirm_password){
            toast.warn('password do not match')
            return false
        }

        if(!SaveNewUser.full_Name || !SaveNewUser.user_Name || !SaveNewUser.password || !SaveNewUser.email){
        toast.error('Please fill all fields')
        return false;
        }
        if(!SaveNewUser.bitcoin){
            toast.warn('Provide Bitcoin Address Wallet')
            return false;
        }
        
        if(!SaveNewUser.checkBox){ 
            toast.warn('Please agree with Terms and conditions')
            return false
        }
        if(SaveNewUser.question.length < 1){
            toast.warn('Please Create Question')
            return false
        }
        if(SaveNewUser.question__ans.length < 1){
            toast.warn('Please Provide Secret Answer')
            return false
        }

        console.log(SaveNewUser)
        event.preventDefault()
        axios.post("/users/register/",SaveNewUser).then(res => {toast.success("Register Successful")}).then(res => setTimeout(()=>{
            window.location="/login"
        }),8000).catch(err => {toast.error(err.response.data)})
        
    
    }
    render() { 
        console.log(this.state.reffer)
        return ( 
            <div className='register'>
                 <Helmet>
                    <base />
                    <title>Capital Gain Registration</title>
                    <meta name="description" content="Capital Gain Registration" />
                    <link rel="canonical" href="next-platform.com" />
                </Helmet>
             <ToastContainer/>
             <h1  className='registerH1'>CREATE AN ACCOUNT</h1>
                <div className="allRegister">
                    <div className='registerNow'>
                        <h1>PERSONAL <span>INFORMATION</span></h1>
                        <div className='formMain'>
                            <form>
                                <table className='formTable'>
                                    <tr> 
                                        <td><label>Your Full Name:</label></td>
                                        <td><input  className='' type='text' name='full_Name' onChange={this.handleChange('full_Name')}/></td>
                                       
                                    </tr>
                                    <tr>
                                         <td><label>Your Username:</label></td>
                                        <td><input  className='' type='text' name='user_Name'  onChange={this.handleChange('user_Name')}/></td>
                                    </tr>
                                    <tr>
                                        <td><label>Your Email Address:</label></td>
                                        <td><input  className='' type='email' name='email'   onChange={this.handleChange('email')}/></td>
                                    </tr>
                                    <tr>
                                        <td><label>Retype Email Address: </label></td>
                                        <td><input  className='' name='email'  onChange={this.handleChange('email')}/></td>
                                    </tr>
                                       <tr>
                                           <td><label>Bitcoin Wallet or Momo Number:</label></td>
                                        <td><input  className='' name='bitcoin'  onChange={this.handleChange('bitcoin')}/></td>
                                    </tr>
                                
                                </table>
                            </form>
                        </div>
                       
                    </div>
                    <div className="otherRegisterInfo">
                        <h1>SECURITY <span>INFORMATION</span></h1>
                        <div className='formMain'>
                            <form>
                                <table>
                                    <tr>
                                        <td><label>Define Password:</label></td>
                                        <td><input   className='' type='password' name='password'  placeholder='password' onChange={this.handleChange('password')}/></td>
                                    </tr>
                                    <tr>
                                        <td><label>Retype Password:</label></td>
                                        <td><input  className='' type='password' name='confirm_password'  placeholder='confirm password' onChange={this.handleChange('comfirm_password')}/></td>
                                    </tr>
                                    <tr>
                                        <td><label>Create Question:</label></td>
                                         <td><input  className='' type='text' name='question'   onChange={this.handleChange('question')}/></td>
                                    </tr>
                                    <tr>
                                        <td><label>Secret Answer:</label></td>
                                        <td><input  className='' type='text' name='question__ans' onChange={this.handleChange('question__ans')}  /></td>
                                    </tr>
                                </table>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="upFontLine">
                        <div className=' animate__animated animate__slower animate__heartBeat'>
                            <p>Your Upline:</p>
                            <p>{this.state.reffer}</p>
                        </div>
                        <div className='upfontLine2'>
                            <div className='upfont'>
                                <p><input type='radio' name='checkbox' onChange={this.handleChange('checkBox')}/> I agree with Terms and conditions</p>
                                <a href='' className='btn btn-danger' onClick={this.onSubmit}>REGISTER</a>
                            </div>
                        </div>
                    </div>
            </div>
         );
    }
}
 
export default RegisterUser;