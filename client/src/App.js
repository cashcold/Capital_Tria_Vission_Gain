import React, { Component } from 'react';
import './App.css'
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
            isDateTimeValid: true,
            errorMessage: '',
            showSettingsLink: false
        };
    }

    componentDidMount() {
        this.validateDateTime();

        const RefreshToken = sessionStorage.getItem('RefreshToken');
        if (RefreshToken) {
            sessionStorage.removeItem('x-access-token');
            sessionStorage.setItem('x-access-token', RefreshToken);
        }
    }

    validateDateTime = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users/api/server-time');
            const serverTime = new Date(response.data.serverTime);
            const clientTime = new Date();

            const timeDifference = Math.abs(serverTime - clientTime) / 1000; // in seconds
            const allowedDifference = 300; // 5 minutes

            if (timeDifference > allowedDifference) {
                this.setState({
                    isDateTimeValid: false,
                    errorMessage: `Access Denied: Your system date and time are incorrect. Please adjust them to access the website.`,
                    showSettingsLink: true
                });
            }
        } catch (error) {
            console.error('Error fetching server time:', error);
            this.setState({
                isDateTimeValid: false,
                errorMessage: `
                    Access Denied: Your system date and time appear to be incorrect. 
                    To use this website, please update your device's date and time settings to the correct values. 
                    Once updated, refresh the page to continue.

                    On most devices, you can find the date and time settings under "System Settings" or "Control Panel." 
                    For convenience, you can click the button below to view instructions on how to update your device's date and time.

                    Thank you for your understanding and cooperation!
                `,
                showSettingsLink: true
            });
        }
    };

    render() {
        const { isDateTimeValid, errorMessage, showSettingsLink } = this.state;

        if (!isDateTimeValid) {
            return (
                <div style={{ textAlign: 'center', marginTop: '50px', color: 'red' }}>
                    <h1>Access Denied</h1>
                    <p>{errorMessage}</p>
                    {showSettingsLink && (
                        <a
                            href="https://www.timeanddate.com/time/settime.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none', color: '#007BFF', marginTop: '10px', display: 'inline-block' }}
                        >
                            Click here for instructions to set your date and time
                        </a>
                    )}
                </div>
            );
        }

        return (
            <Router>
                <div className='mainApp animate__animated animate__zoomIn animate__slowerss'>
                    <div className='google__id' id="google_translate_element"></div>
                    <div className='container_!'>
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
