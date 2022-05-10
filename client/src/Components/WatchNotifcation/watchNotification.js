import React, { Component } from 'react';
import './watchNotification.css'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { io } from "socket.io-client";

class WatchNotificationMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            live_deposit: ''

        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange =input => (event)=>{
        event.preventDefault()
        this.setState({[input]:event.target.value })
    }
    componentDidMount(){
    
        // let socket = io('http://localhost:3000/')
        let socket = io('http://capitalgain.herokuapp.com/')

        var  deposit_message = document.getElementById('deposit_message')
             socket.on('incoming_deposit', live_deposit =>{
               var li = document.createElement("li")
               li.textContent =  live_deposit;
               deposit_message.appendChild(li)
               toast.success(live_deposit,{
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
         })
         
         socket.on('NewDeposit',NewDeposit =>{
            toast.success(
            <div className='New_Deposit_main'>
                <h2>User {NewDeposit.user_Name}<br/>Have Made New Deposit of {NewDeposit.depositAmount}$<br/>
                Time: {NewDeposit.date}
                </h2>
            </div>,{
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                })
         })
  
        
    }
    render() { 
    let socket = io('http://localhost:3000/')

     return ( 
            <div className='watch_notifi_main'>
                <ToastContainer/>

                <section className="watch_not">
                    <h1 >WE ARE ABOUT TO WATCH THE NOTIFICATION!!!</h1>
                    
                 </section>
                <section>
                    <ul  id="deposit_message"></ul>
                </section>
                 {/* <section className="flow">
                     <input  name='live_deposit'  onChange={this.handleChange('live_deposit')}/>
                     <a onClick={()=>{
                         toast.success('hi',{
                            position: "top-right",
                            autoClose: false,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            })
                     }} className='btn-btn-warning' href='#' >Send</a>
                 </section> */}
               
            </div>
         );
    }
}
 
export default WatchNotificationMain;