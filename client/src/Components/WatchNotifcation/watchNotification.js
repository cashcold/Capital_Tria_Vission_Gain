import React, { Component } from 'react';
import './watchNotification.css';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { io } from "socket.io-client";

class WatchNotificationMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            live_deposit: '' 
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = input => (event) => {
        event.preventDefault();
        this.setState({ [input]: event.target.value });
    };

    // Method to play sound
    playSound = (soundFile) => {
        const audio = new Audio(`/tones/${soundFile}`);
        audio.play()
            .then(() => console.log('Sound played successfully.'))
            .catch((error) => console.error('Error playing sound:', error));
    };

    componentDidMount() {
        let socket = io();

        var deposit_message = document.getElementById('deposit_message');
        socket.on('incoming_deposit', live_deposit => {
            var li = document.createElement("li");
            li.textContent = live_deposit;
            deposit_message.appendChild(li);

            toast.success(live_deposit, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });

        socket.on('NewDeposit', NewDeposit => {
            toast.success(
                <div className='New_Deposit_main'>
                    <h2>User {NewDeposit.user_Name}<br />Has Made a New Deposit of {NewDeposit.depositAmount}$<br />
                        Time: {NewDeposit.date}
                    </h2>
                </div>, {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onOpen: () => this.playSound('incoming_message.mp3') // Call playSound with the correct filename
                });
        });

        socket.on('Withdraw', Withdraw => {
            toast.info(
                <div className='New_Deposit_main'>
                    <h2>User {Withdraw.user_Name}<br />Has Made a New Withdrawal of {Withdraw.activetDeposit}$<br />
                        Time: {Withdraw.date}
                    </h2>
                </div>, {
                    position: "top-left",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    onOpen: () => this.playSound('incoming_msg.mp3') // Call playSound with the correct filename
                });
        });
    }

    render() {
        return (
            <div className='watch_notifi_main'>
                <ToastContainer />
                <section className="watch_not">
                    <h1>WE ARE ABOUT TO WATCH THE NOTIFICATION!!!</h1>
                </section>
                <section>
                    <ul id="deposit_message"></ul>
                </section>
            </div>
        );
    }
}

export default WatchNotificationMain;
