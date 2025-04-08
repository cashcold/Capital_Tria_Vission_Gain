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

class MainApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            liveTime: null,
            timeMismatch: null,
            redirectToHome: false,
            loading: true, // Added a loading state to control rendering for users
        };
    }

    
    
    async componentDidMount() {


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
                    <div className='google__id' id="google_translate_element"></div>
                    <div className='container_!'>
                        <section className="MethodMomo">
                            <section className="monoPAYMENT">
                                <h1 className="animated-text">📱 Momo Payment Now Accepted!</h1>
                                    <p className="blinking-text">
                                    We are now accepting <strong>Mobile Money (Momo)</strong> for all investors in Ghana.
                                    <br />Wherever you are, it's now simple and easy to invest with your mobile money.
                                    <br />Invest with any amount from <strong>GHS 50</strong> and above!
                                    </p>
                                    <div className="image-box">
                                    <img src={require('./images/mobile-money.jpg')} className=''/> 
                                    </div>
                            </section>
                        </section>
                        <Other__NavBar />
                        <Navbar />
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
                              <Route path='/edit' exact component={EditMain}/> 
                              <Route path='/withdraw' exact component={WithdrawMain}/>
                              <Route path='/withdraw-refferReward' exact component={WithdrawRefferReward}/>
                              <Route path='/dashboard' render={(props)=> <Dashboard {...props} />} />
                              <Route path='/forgotpassword' exact component={ForgotPassword}/> 
                              <Route path='/activitPassword/:token' exact component={ActivitPassword}/> 
                              <Route path='/user_admin_watch_notification' exact component={WatchNotificationMain}/> 
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
