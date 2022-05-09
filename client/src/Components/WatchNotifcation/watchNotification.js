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
    
        let socket = io('http://localhost:3000/')

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
     
  
        
    }
    render() { 
    let socket = io('http://localhost:3000/')

     return ( 
            <div className='watch_notifi_main'>
                <ToastContainer/>

                <section className="watch_not">
                    <h1 >WE ARE ABOUT TO WATCH THE NOTIFICATION</h1>
                    
                 </section>
                <section>
                    <ul  id="deposit_message"></ul>
                </section>
                 <section className="flow">
                     <input  name='live_deposit'  onChange={this.handleChange('live_deposit')}/>
                     <a onClick={(event)=>{
                         event.preventDefault()
                         socket.emit('live_deposit', this.state.live_deposit)
                        

                     }} className='btn-btn-warning' href='#' >Send</a>
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