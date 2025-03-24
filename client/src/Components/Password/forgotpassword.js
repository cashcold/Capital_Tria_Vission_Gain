import React, { Component } from 'react';
import axios from 'axios'
import './forgot.css'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify'; 


class ForgotPassword extends Component {
    constructor(props){
        super(props)
        this.state = {
            restartLinkPassword: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }
    onSubmit = (event)=>{
        event.preventDefault()
        const saveRestartLinkPassword = {
            email: this.state.restartLinkPassword
        }
        if(!saveRestartLinkPassword.email){
            return(toast.warning("Enter Email",{position: 'top-center'})) 
           
        }   

        axios.post("/users/forgotpassword", saveRestartLinkPassword)
    .then(res => {
        toast.success("Link has been sent to your email. If you don't see it in your inbox, check your spam folder and mark it as 'Not Spam'.", { autoClose: 9000 });
        setTimeout(() => {
            window.location = "/login";
        }, 5000); 
    })
    .catch(err => toast.error(err.response.data, { autoClose: 5000 }));

    }
 
    render() { 
        return ( 
            <div className='passwordForgot'>
                <ToastContainer /> 
                <div className='mainPassword'>
                    <h1 className='animate__animated animate__zoomInRight animate__slower'><span>RECOVERY</span> YOUR<br/> <span>PASSWORD </span> VIA INBOX</h1>
                    <div className='recoverInput animate__animated animate__zoomInLeft animate__slower'>
                        <input placeholder='email' onChange={this.handleChange("restartLinkPassword")}  name='restartLinkPassword'/>
                    </div>
                    
                    <button className='btn btn-success' onClick={this.onSubmit}>Recover Password</button>
                </div>
               
            </div>
         );
    }
}
 
export default ForgotPassword;