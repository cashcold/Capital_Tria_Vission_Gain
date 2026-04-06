import React, { Component } from 'react';
import './style.css'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import ReferralDepositNoticeModal from '../ReferralDepositNoticeModal/ReferralDepositNoticeModal';
import DepositTutorial from '../DepositTutorial/DepositTutorial';


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
            this.setState({ user_id: id });
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
        onSubmit = async (event) => {
            event.preventDefault();

            const maxDeposit = Number(this.state.user_profile_display.maxDeposit);
            const depositAmount = Number(this.state.depositAmount);

            if (depositAmount > maxDeposit) {
                toast.warn(
                    `You cannot invest more than your maximum deposit ${maxDeposit} GHC. Please refer more people to enjoy higher deposit.`,
                    {
                        autoClose: 30000
                    }
                );
                return false;
            }

            try {
                const res = await axios.get(
                    `/users/check-tier-usage/${this.state.user_id}/${this.state.depositAmount}`
                );

                if (res.data.restricted) {
                    toast.warning(res.data.message, {
                        autoClose: 10000
                    });
                    return false;
                }
            } catch (err) {
                console.log(err);
                toast.error("Error checking deposit rules");
                return false;
            }

            sessionStorage.setItem('planNow', this.state.planNow);
            sessionStorage.setItem('depositAmount', this.state.depositAmount);
            sessionStorage.setItem('deposit_date', this.state.deposit_date);

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
            };

            if (!DepositForm.planNow) {
                toast.warn('Select Plan');
                return false;
            }
            if (!DepositForm.depositAmount) {
                toast.warn('Amount to Spend');
                return false;
            }
            if (!DepositForm.checkWallet) {
                toast.warn('Select Deposit Method');
                return false;
            }

            setTimeout(() => {
                window.location = '/dashboard/confirm_deposit';
            }, 600);
        }
    onSubmitMomo = async (event) => {
        event.preventDefault();

        const maxDeposit = Number(this.state.user_profile_display.maxDeposit);
        const depositAmount = Number(this.state.depositAmount);

        // CHECK MAX DEPOSIT
        if (depositAmount > maxDeposit) {
            toast.warn(
                `You cannot invest more than your maximum deposit ${maxDeposit} GHC. Please refer more people to enjoy higher deposit.`,
                {
                    autoClose: 30000
                }
            );
            return false;
        }

        try {
            const res = await axios.get(
               `/users/check-tier-usage/${this.state.user_id}/${this.state.depositAmount}`
            );

            if (res.data.restricted) {
                toast.warning(res.data.message, {
                    autoClose: 60000
                });
                return false;
            }
        } catch (err) {
            console.log(err);
            toast.error("Error checking deposit rules");
            return false;
        }

        sessionStorage.setItem('planNow', this.state.planNow);
        sessionStorage.setItem('depositAmount', this.state.depositAmount);
        sessionStorage.setItem('deposit_date', this.state.deposit_date);

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
        };

        if (!DepositForm.planNow) {
            toast.warn('Select Plan');
            return false;
        }
        if (!DepositForm.depositAmount) {
            toast.warn('Amount to Spend');
            return false;
        }
        if (!DepositForm.checkWallet) {
            toast.warn('Select Deposit Method');
            return false;
        }

        setTimeout(() => {
            window.location = '/dashboard/MomoDeposit';
        }, 600);
    }


    render() {  
        const CalculatorEngine = () => {
        const totalEl = document.querySelector('.totalAmount');
        const percentEl = document.querySelector('.percent_check');
        const planEl = document.querySelector('.planNowType');

        if (!totalEl || !percentEl || !planEl) return;

        const amount = Number(this.state.amountCalculate);

        // If no amount entered
        if (!amount) {
            document.querySelector('.totalAmount').innerHTML = "";
            document.querySelector('.percent_check').innerHTML = "";
            document.querySelector('.planNowType').innerHTML = "";
            return;
        }

        // Below minimum
        if (amount < 10) {
            document.querySelector('.totalAmount').innerHTML = "Minimum is 10 GHC";
            document.querySelector('.percent_check').innerHTML = "N/A";
            document.querySelector('.planNowType').innerHTML = "";
        }

        
       else if (amount >= 10 && amount <= 299) {
            const Percentage = amount * 10 / 100;
            const total = amount + Percentage;

            document.querySelector('.totalAmount').innerHTML = "GHC " + total;
            document.querySelector('.percent_check').innerHTML = Percentage + " GHC";
            document.querySelector('.planNowType').innerHTML = "PLAN I 24HRS";
        }

        
        else if (amount >= 300 && amount <= 599) {
            const Percentage = amount * 15 / 100;
            const total = amount + Percentage;

            document.querySelector('.totalAmount').innerHTML = "GHC " + total;
            document.querySelector('.percent_check').innerHTML = Percentage + " GHC";
            document.querySelector('.planNowType').innerHTML = "PLAN II 3DAYS";
        }

       
        else if (amount >= 600 && amount <= 899) {
            const Percentage = amount * 20 / 100;
            const total = amount + Percentage;

            document.querySelector('.totalAmount').innerHTML = "GHC " + total;
            document.querySelector('.percent_check').innerHTML = Percentage + " GHC";
            document.querySelector('.planNowType').innerHTML = "PLAN III 5DAYS";
        }


        else if (amount >= 900 && amount <= 1200) {
            const Percentage = amount * 25 / 100;
            const total = amount + Percentage;

            document.querySelector('.totalAmount').innerHTML = "GHC " + total;
            document.querySelector('.percent_check').innerHTML = Percentage + " GHC";
            document.querySelector('.planNowType').innerHTML = "PLAN IV 7DAYS";
        }

        // Above max
        else if (amount > 1200) {
            document.querySelector('.totalAmount').innerHTML = "Max Investment is 1200 GHC";
            document.querySelector('.percent_check').innerHTML = "Not Available";
            document.querySelector('.planNowType').innerHTML = "";
        }

        };
          
        CalculatorEngine()

        const Amount_to_send = this.state.depositAmount;
        const RATE = 12; // 1 USDT = 15 GHC (you can change this anytime)
        const usdtAmount = Amount_to_send / RATE;
        return ( 
            <div className='depositMain'>
                <ToastContainer/>
                <DepositTutorial/>
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
                <div className="infoBlock">
                <p>
                    At <b>CapGainCo</b>, we believe in growing together as a community.
                    Before you can  <b>extended to access higher deposit</b> or  activate <b>Auto Mining</b>, you are required to
                    invite and refer a specific number of people to join our platform
                    through your referral link.
                </p>

                <p className="whyTitle">This helps us to:</p>
                <ul>
                    <li>🤝 Expand the learning community</li>
                    <li>🌍 Reach more people interested in digital mining education</li>
                    <li>🚀 Reward active members who support the platform’s growth</li>
                </ul>

                <p className="whyTitle">✅ What You Need To Do</p>
                <ul>
                    <li>1️⃣ Share your unique referral link with friends and family</li>
                    <li>2️⃣ Let them register on capgainco.com through your link</li>
                    <li>3️⃣ Complete the required number of referrals</li>
                    <li>4️⃣ Your <b>Auto Mining</b> feature will be unlocked automatically and your deposit amount
                        <span className="highlightText"> limit will be extended to access higher </span>
                        deposit plans.</li>

                </ul>

                <p className="whyTitle">🎁 Why This Matters</p>
                <p>
                    We designed this system to reward members who actively contribute to
                    the growth of the CapGainCo community. The more you share, the faster
                    you unlock powerful features like <b>Auto Mining</b> and mining
                     <b>Deposit extended.</b>
                </p>

                <p className="finalNote">
                    No hidden steps. No confusion.
                </p>
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
                                            <h4>GHC10 - GHC299	</h4>
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
                                            <h4>GHC300 - GHC599	</h4>
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
                                            <h4>GHC600 - GHC899	</h4>
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
                                            <h4>GHC900 - GHC1200	</h4>
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
                            <h5 className='innerH5'><input 
                            type="number"
                            name='depositAmount'
                            onChange={this.handleChange('depositAmount')}
                            placeholder='e.g 50'
                            /></h5>

                            <p className='usdtAmount'>USDT Amount: {usdtAmount.toFixed(2)}</p>
                        </div>
                        <div className="bit__btn">
                             <h5> <input type='radio' name='ckeckWallet' onChange={this.handleChange('checkWallet')}    className='planBtn4'/><span> USDT</span></h5>
                             <h5> <input type='radio' name='ckeckWallet' onChange={this.handleChange('checkWallet')}    className='planBtn4'/><span> Momo Number</span></h5>
                        </div>
                        <div className="bit__btn ">
                             {/* <h5 className='bit__btn_2'><a href='#' >Pay with Bitcoin</a></h5> */}
                             <h5 className='bit__btn_2'><a href='' onClick={this.onSubmit}>Pay with USDT</a></h5>
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