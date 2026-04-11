import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'
import { Redirect } from 'react-router-dom';
import './App.css'
import moment from 'moment';
import {BrowserRouter as Router, Switch, Route, useParams, useRouteMatch} from 'react-router-dom'
import Navbar from './Components/Navbar/navbar';
import './App.css'
import Other__NavBar from './Components/Navbar/other_nav';
import Home from './Components/Home/home';
import FooterMain from './Components/Footer/footer';
import AboutMain from './Components/About-us/about';
import FAQSMAIN from './Components/FAQ/faq';
import ContactMain from './Components/Contact-us/contact_us';
import RegisterUser from './Components/Register/register';
import Dashboard from './Components/Dashboard/dashboard';
import Login from './Components/Login/login';
import DepositMain from './Components/Deposit/depsoit';
// import DepositModal from './Components/DepositModal/DepositModal';
import EditMain from './Components/Edit/edit';
import WithdrawMain from './Components/Withdraw/withdraw';
import EditMainRouter from './Components/InnerRouter/editRouter/edit';
import AccountRouter from './Components/InnerRouter/accountRouter/accountRouter';
import TotalTransaction from './Components/Transacttion/transaction';
import ForgotPassword from './Components/Password/forgotpassword';
import ActivitPassword from './Components/Password/activePassword';
import FAQSETUP from './Components/FAQ/faqsSetup';
import WatchNotificationMain from './Components/WatchNotifcation/watchNotification';
import WithdrawRefferReward from './Components/WithdrawRefferReward/WithdrawRefferReward';
import axios from 'axios';
import ExchangeMarquee from './Components/ExchangeMarquee/ExchangeMarquee';
import PriceMarquee from './Components/PriceMarquee/PriceMarquee';
import PopoutExample from './Components/PopoutExample/PopoutExample';
import DepositModal from './Components/DepositModal.js/DepositModal';
import WithdrawNoticeModal from './Components/WithdrawNoticeModal/WithdrawNoticeModal.';
import ReferralDepositNoticeModal from './Components/ReferralDepositNoticeModal/ReferralDepositNoticeModal';
import ReferralPerformance from './Components/ReferralPerformance/ReferralPerformance';
import WhatsAppChannelPopup from './Components/WhatsAppChannelPopup/WhatsAppChannelPopup';
import AccountStatusAlert from './Components/AccountStatusAlert/AccountStatusAlert';
import BTCShark from "./BTCShark.jpg"; // ✅ import video
import PayFee from './Components/PayFee/PayFee';
import PaymentNotice from './Components/PaymentNotice/PaymentNotice';
import AutoFeeDeduction from './Components/AutoFeeDeduction/AutoFeeDeduction';
import DepositAndMiningPlanUpdate from './Components/DepositAndMiningPlanUpdate/DepositAndMiningPlanUpdate';
import AutoMiningReactivationFrontend from './Components/AutoMiningReactivationFrontend/AutoMiningReactivationFrontend';
import InvestorNoticeModal from './Components/InvestorNoticeModal/InvestorNoticeModal';


class MainApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            liveTime: null,
            timeMismatch: null,
            redirectToHome: false,
            loading: true,
            token: null,
        };
    }

    
    
    async componentDidMount() {
        const token = sessionStorage.getItem('x-access-token');
        this.setState({ token });

        const RefreshToken = sessionStorage.getItem('RefreshToken');
        if (RefreshToken) {
            sessionStorage.removeItem('x-access-token');
            sessionStorage.setItem('x-access-token', RefreshToken);
        }


        try {
            const response = await axios.get('https://api.timezonedb.com/v2.1/get-time-zone', {
                params: {
                    key: 'AV9V19IQBEX1',
                    format: 'json',
                    by: 'zone',
                    zone: 'Africa/Accra', // Use the correct timezone for Accra, Ghana
                },
            });
        
            if (response.data.status === 'FAILED') {
                throw new Error(response.data.message || 'Failed to fetch time data');
            }
        
            const liveTime = new Date(response.data.formatted);
            this.compareTime(liveTime);
        } catch (error) {
            console.error('Error fetching live time:', error.message);
            this.compareTime(new Date()); // Fallback to local system time
        }
        
          
          
    }
    

    compareTime(liveTime) {
        // Convert both times to UTC for accurate comparison
        const userTime = moment.utc(); // Use moment.utc() directly for current time
        const liveMoment = moment.utc(liveTime); // Use moment.utc() to parse the liveTime

        
    
        // Calculate the time difference in minutes
        const timeDifference = Math.abs(liveMoment.diff(userTime, 'minutes'));
    
        // Update the state and clear session if there's a time mismatch
        this.setState({
            timeMismatch: timeDifference > 5,
            loading: false,
        });
    
        if (timeDifference > 5) {
            sessionStorage.clear();
        }
    }
    
    
    

    
    
    

    render() {
        
    // Show a loading screen while checking time
    if (this.state.loading) {
        return (
          <div className="loading-screen">
            <h2>Checking Time...</h2>
          </div>
        );
      }
  
      // Block access if time mismatch
      if (this.state.timeMismatch) {
        return (
          <div className="time-error">
            <h2>Time Error</h2>
            <p>Your device time is more than 5 minutes off. Please adjust your system time to access this website.</p>
          </div>
        );
      }
  

 
        return (
            <Router>
                <div className='mainApp animate__animated animate__zoomIn animate__slowerss'>
                    {/* {!this.state.token && <PopoutExample />} */}
                    {/* <div className='google__id' id="google_translate_element"></div> */}
                    <div className='container_!'>
                        <section className="trust-ai-wrapper">

                        <div className="trust-ai-card">

                            <p className="trust-ai-text">
                                Investment deposits and withdrawals are processed through
                                <strong> Mobile Money </strong> and
                                <strong> Bank Transfers </strong>
                                under the registered company name in Ghana:
                            </p>

                            <h2 className="trust-ai-company">
                                BTC SHARK TRADE
                            </h2>

                            <p className="trust-ai-sub">
                                Also known as <strong>BITCOIN SHARK TRADE</strong>
                            </p>

                            <p className="trust-ai-register">
                                Registered under the Office of the Registrar of Companies,
                                Republic of Ghana.
                            </p>

                            <div className="trust-ai-badges">
                                <span>✅ Fast</span>
                                <span>✅ Safe</span>
                                <span>✅ Fully Verified</span>
                            </div>

                            <div className="trust-ai-certificate">

                                <h3>Business Certificate</h3>

                                <img
                                src={BTCShark}
                                alt="BTC Shark Trade Business Certificate"
                                />

                            </div>
                            <h3>📞 Need Help? Talk to Our Ghana Support Team ➡️ <strong>BTC SHARK TRADE</strong></h3>
                            <p>We're not just online. We're here for you — personally and directly:</p>
                            <p>We speak Twi, Fante, Ewe & Ga — your local support!</p>
                            <ul className="contact-list">
                            <li>📱 <strong>Support Lines:</strong></li>
                            <li>• 020 380 8479</li>
                            <li>• 026 825 3787</li>
                            <li>💬 <strong>WhatsApp:</strong> <a href="https://wa.me/0203808479" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a></li>
                            <li>✉️ <strong>Email:</strong> <a href="mailto:support@capgainco.com">support@capgainco.com</a></li>
                            </ul>

                        </div>

                        </section>
                        <PaymentNotice />

                        <section class="grobelInvest">
                            <img
                                src='https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/capgainco%2FMANY%20MORE.jpg?alt=media&token=5975b784-7100-4d95-b0fe-ee411c485707'
                                alt="Popout"
                                className="popout-image"
                            />
                        </section>
                        
                        <ExchangeMarquee/>
                        <Other__NavBar />
                        {/* <PriceMarquee /> */}
                        <Navbar />
                        {/* <DepositAndMiningPlanUpdate /> */}
                        <div className='router'> 

                            <Switch>
                            <Route path='/' exact component={Home}/> 
                              <Route path='/about-us' exact component={AboutMain}/> 
                              <Route path='/faq' exact component={FAQSMAIN}/> 
                              <Route path='/faqs' exact component={FAQSETUP}/> 
                              <Route path='/contact-us' exact component={ContactMain}/> 
                              <Route path='/login' exact component={Login}/> 
                              <Route path='/register' exact component={RegisterUser}/> 
                              <Route path='/deposit' exact component={DepositMain}/> 
                              <Route path='/depositmodal' exact component={DepositModal}/> 
                              <Route path='/edit' exact component={EditMain}/> 
                              <Route path='/withdraw' exact component={WithdrawMain}/>
                              <Route path='/WithdrawNoticeModal' exact component={WithdrawNoticeModal}/>
                              <Route path='/ReferralDepositNoticeModal' exact component={ReferralDepositNoticeModal}/>
                              <Route path='/withdraw-refferReward' exact component={WithdrawRefferReward}/>
                              <Route path='/dashboard' render={(props)=> <Dashboard {...props} />} />
                              <Route path='/forgotpassword' exact component={ForgotPassword}/> 
                              <Route path='/activitPassword/:token' exact component={ActivitPassword}/> 
                              <Route path='/user_admin_watch_notification' exact component={WatchNotificationMain}/> 
                              <Route path='/ReferralPerformance' exact component={ReferralPerformance}/> 
                              <Route path='/AccountStatusAlert' exact component={AccountStatusAlert}/> 
                              <Route path='/PayFee' exact component={PayFee}/> 
                              <Route path='/PaymentNotice' exact component={PaymentNotice}/> 
                              <Route path='/AutoFeeDeduction' exact component={AutoFeeDeduction}/> 
                              <Route path='/DepositAndMiningPlanUpdate' exact component={DepositAndMiningPlanUpdate}/> 
                              <Route path='/AutoMiningReactivationFrontend' exact component={AutoMiningReactivationFrontend}/> 
                              <Route path='/InvestorNoticeModal' exact component={InvestorNoticeModal}/> 
                            </Switch>
                        </div>
                        <FooterMain />
                    </div>
                    
                </div>
            </Router>
            
        );
    }
}

export default MainApp;
