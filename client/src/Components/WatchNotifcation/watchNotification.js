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
            live_deposit: '',
            bitcoinDeposits: [],
            bitcoinWithdrawals: []
            
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

    fetchBitcoinDeposits = () => {
        axios.get('/users/last-deposits')
            .then(response => {
                this.setState({ bitcoinDeposits: response.data });
            })
            .catch(error => console.error('Error fetching bitcoinBuy:', error));
    };

    fetchBitcoinWithdrawals = () => {
        axios.get('/users/last/withdrawals')
            .then(response => {
                this.setState({ bitcoinWithdrawals: response.data });
            })
            .catch(error => console.error('Error fetching bitcoinSell:', error));
    };

    componentDidMount() {

        this.interval = setInterval(this.fetchBitcoinDeposits, 3000);
        this.interval = setInterval(this.fetchBitcoinWithdrawals, 3000);



        const socket = io('/', {
            reconnection: true,
            reconnectionAttempts: 10,
            reconnectionDelay: 500
        });

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
                    <h1>WATCH THE NOTIFICATION!!!</h1>

                    <section className="displayBothTrans">
                        <section className="displayNewBitcoinSell">
                            <h2>Recent Bitcoin Withdrawlas</h2>
                            {this.state.bitcoinWithdrawals.map((bitcoinSell, index) => (
                                <div key={index} className="card">
                                    <div className="card-body">
                                        <h3 className="card-title">{bitcoinSell.user_Name}</h3>
                                        <p className="card-text">Amount: ${bitcoinSell.activetDeposit} </p>
                                        <p className="card-text">Method: <span className="bitcoinColour">Bitcoin</span></p>
                                        <p className="card-text"><span className="dateColor">Deposit</span> Date: {new Date(bitcoinSell.date).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </section>
                        <section className="displayNewBitcoinBuy">
                            <h2>Recent Bitcoin Deposits</h2>
                            {this.state.bitcoinDeposits.map((bitcoinBuy, index) => (
                                <div key={index} className="card">
                                    <div className="card-body">
                                        <h3 className="card-title">{bitcoinBuy.user_Name}</h3>
                                        <p className="card-text">Amount: ${bitcoinBuy.depositAmount} </p>
                                        <p className="card-text">Method: <span className="bitcoinColour">Bitcoin</span></p>
                                        <p className="card-text"><span className="">Deposit</span> Date: {new Date(bitcoinBuy.date).toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </section>
                </section>
                <section>
                    <ul id="deposit_message"></ul>
                </section>
            </div>
        );
    }
}

export default WatchNotificationMain;
