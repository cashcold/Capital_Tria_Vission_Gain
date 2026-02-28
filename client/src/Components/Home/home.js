import React, { Component } from 'react';
import './style.css'
import axios from 'axios'
import {Card,Button} from 'react-bootstrap'
import { motion } from "framer-motion";
import TradingViewWidget from '../TradingViewWidget/TradingViewWidget';
import BusinessModel from '../BusinessModel/BusinessModel';
import CloudMiningAnimation from '../CloudMiningAnimation/CloudMiningAnimation';
import GoogleTranslate from '../GoogleTranslate/GoogleTranslate';
import MomoTrust from '../MomoTrust/MomoTrust';
import GlobalMiningActivity from '../GlobalMiningActivity/GlobalMiningActivity';
import ActivitiesList from '../Activities/ActivitiesList';
import TestimonialsSection from '../TestimonialsSection/TestimonialsSection';
import PoultryFarmVideo from '../PoultryFarmVideo/PoultryFarmVideo';
import GoatFarmVideo from '../GoatFarmVideo/GoatFarmVideo';
import MaizeFarm from '../MaizeFarm/MaizeFarm';
import PigFarm from '../PigFarm/PigFarm';
import CassavaFarmingVideo from '../CassavaFarmingVideo/CassavaFarmingVideo';
import WhatsAppChannelPopup from '../WhatsAppChannelPopup/WhatsAppChannelPopup';
import AuthRedirectPopup from '../AuthRedirectPopup/AuthRedirectPopup';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            amountCalculate: '',
            recent_info_both: [],
            users: [],
            user_now: '',
            deposits: [],
            withdrawals: []
         }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
        
    }

    fetchRecentUsers = async () => {
        try {
          const response = await axios.get("/users/recent-users"); // Adjust API URL
          this.setState({ users: response.data });
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };

    componentDidMount(){

        this.fetchRecentUsers();

        axios.get(`https://randomuser.me/api/?results=9`)
        .then((data)=>{
            this.setState({
                recent_info_both: data.data.results
            })
        })

        axios.get('/users/last/withdrawals') // Adjust the API endpoint as needed
      .then(response => {
        this.setState({ withdrawals: response.data });
      })
      .catch(error => {
        console.error('Error fetching withdrawals:', error);
      });
        

        axios.get('/users/last-deposits')
        .then(response => {
          this.setState({ deposits: response.data });
        })
        .catch(error => console.error('Error fetching deposits:', error));

        const urlSearchParams = new URLSearchParams(window.location.search);
        for(var pair of urlSearchParams.entries()) {
            sessionStorage.setItem('reffer',(pair[1]) ) 
         }
       
    }
    render() { 
        const CalculatorEngine = ()=>{
           if( this.state.amountCalculate){
                if( this.state.amountCalculate <= 599){
                const Percentage = this.state.amountCalculate * 10/100
                const totoalCheck = Number(this.state.amountCalculate) + (Percentage)
               document.querySelector('.totalAmount').innerHTML = "GHC"+ totoalCheck
               document.querySelector('.percent_check').innerHTML = Percentage +" GHC"
               document.querySelector('.planNowType').innerHTML = "PLAN I 24HRS"
                }
 
            }
           if( this.state.amountCalculate){
                if( this.state.amountCalculate >= 600 ){
                const Percentage = this.state.amountCalculate * 15/100
                const totoalCheck = Number(this.state.amountCalculate) + (Percentage)
               document.querySelector('.totalAmount').innerHTML = "GHC"+totoalCheck
               document.querySelector('.percent_check').innerHTML = Percentage +" GHC"
               document.querySelector('.planNowType').innerHTML = "PLAN II 3DAYS"
                }
 
            }
           if( this.state.amountCalculate){
                if( this.state.amountCalculate > 800){
                const Percentage = this.state.amountCalculate * 20/100
                const totoalCheck = Number(this.state.amountCalculate) + (Percentage)
               document.querySelector('.totalAmount').innerHTML = "GHC"+totoalCheck
               document.querySelector('.percent_check').innerHTML = Percentage +" GHC"
               document.querySelector('.planNowType').innerHTML = "PLAN III 5DAYS"
                }
 
            }
           if( this.state.amountCalculate){
                if( this.state.amountCalculate > 1000){
                const Percentage = this.state.amountCalculate * 25/100
                const totoalCheck = Number(this.state.amountCalculate) + (Percentage)
               document.querySelector('.totalAmount').innerHTML = "GHC"+totoalCheck
               document.querySelector('.percent_check').innerHTML = Percentage +" GHC"
               document.querySelector('.planNowType').innerHTML = "PLAN IV 7DAYS"
                }
 
            }
           if( this.state.amountCalculate){
                if( this.state.amountCalculate > 1201){
               document.querySelector('.totalAmount').innerHTML = "Please Max Investment is 1201GHC "
               document.querySelector('.percent_check').innerHTML = 'Not Avalibale'
               document.querySelector('.planNowType').innerHTML = ""
                }
 
            }
            
              
        }
          
        CalculatorEngine()
        return ( 
            
            <div className='main__home'>
                <section className='home__main__box__1'>
                    <AuthRedirectPopup/>
                    <WhatsAppChannelPopup/>
                     <div className="home__box__2">
                         </div>
                        <div className="home__box__1">
                            <div className='home__h1'>
                                <h1 className='home__box__h1'>Capital Gain Management Co.</h1>
                                <h3 className='home__box__h3'>Earn up to 10% Daily, Easily with 3 STEPS</h3>
                                 <GlobalMiningActivity/>
                            </div>
                         <div className="home__flow__box">
                            <div className="flow__box__1 flow__boxMe flowAnimate">
                                 <i class="fas fa-user fa-3x flowAnimate"></i>
                                 <hr className='flowAnimate'/>
                                 <p className='flowAnimate'>Open a Free Account</p>
                                 <a href='/register' className='btn-home flowAnimate'>Sign-up</a>
                            </div>
                            <div className="flow__box__2 flow__boxMe flowAnimate">
                                 <i class="fas fa-user fa-3x flowAnimate"></i>
                                 <hr className='flowAnimate'/>
                                 <p className='flowAnimate'>Choose a Mining Plan and<br/> Deposit</p>
                                 <a href='/login' className='btn-home flowAnimate'>Deposit</a>
                            </div>
                            <div className="flow__box__3 flow__boxMe flowAnimate">
                            <i class="fas fa-user fa-3x flowAnimate"></i>
                                 <hr className='flowAnimate'/>
                                 <p className='flowAnimate'>Withdraw Your Profits</p>
                                 <a href='/login' className='btn-home flowAnimate'>Withdraw</a>
                            </div>
                            </div>
                        </div>
                       
                        
                </section>
                <CloudMiningAnimation/>
                <BusinessModel/>
                
                <section class="co_ing">
                    <img src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2FTHE%20CRYTO%20MINING%20POWERHOUSE.jpg?alt=media&token=97841213-86fb-48c0-aef8-f8df4833c900" alt="Capgainco " />
                </section>
              
                <section className='about__investmentt__plan  '>
                    <div className="header__text">
                        <h2>OUR <span>MINING MACHINES  </span> PLANS</h2>
                    </div>
                    <div className="investmentt__plan">
                         <section className='pricingNow'>
                   <div className='container container__2'>
                       <div className="box_box__1"> 
                           <h1>PLAN I</h1>
                           <div className="innerPlan innerPlanother">
                               <h1 className='percentRate'>10</h1>
                               <h3>%</h3>
                           </div>
                           <h3 className='planType'>24HRS DAILY FOREVER</h3>
                           <p>Antminer S9i/j 14.5T 16nm BTC Bitcoin Miner SHA256 Include APW3++ 1600W PSU</p>
                           <div className='icon'>
                                <i class="fas fa-star"></i>
                                <i class="fa fa-star-half" aria-hidden="true"></i>
                             </div>
                           <div className="typeAmount_box_1">
                              <div className="innerTypeAmount">
                                  <p>Min: </p>
                                  <p className='typeAmountSpan'>GHC 10</p>
                              </div>
                               <span className='spanMainType'></span>
                              <div className="innerTypeAmount innerTypeAmount2">
                                  <p>Max: </p>
                                  <p className='typeAmountSpan'>GHC 599</p>
                              </div>
                               <span className='spanMainType'></span>
                              <div className="innerTypeAmount innerTypeAmount2">
                                  <p>Withdraw:</p>
                                  <p className='typeAmountSpan'>INSTANT</p>
                              </div>
                              <span className='spanMainType'></span>
                           </div>
                       </div>
                       <div className="box_box__1">
                           <h1>PLAN II</h1>
                           <div className="innerPlan innerPlanother">
                               <h1 className='percentRate'>15</h1>
                               <h3>%</h3>
                           </div>
                           <h3 className='planType'>3 DAYS</h3>
                           <p>ONPULINK Bitcoin Miner,<br/>Antminer Renewed AntMiner L3+ ~504MH/s @ 1.6W/MH ASIC</p>
                           <div className='icon'>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                            </div>
                           <div className="typeAmount_box_1">
                              <div className="innerTypeAmount">
                                  <p>Min: </p>
                                  <p className='typeAmountSpan'>GHC 600</p>
                              </div>
                               <span className='spanMainType'></span>
                              <div className="innerTypeAmount innerTypeAmount2">
                                  <p>Max: </p>
                                  <p className='typeAmountSpan'>GHC 799</p>
                              </div>
                               <span className='spanMainType'></span>
                              <div className="innerTypeAmount innerTypeAmount2">
                                  <p>Withdraw:</p>
                                  <p className='typeAmountSpan'>INSTANT</p>
                              </div>
                              <span className='spanMainType'></span>
                           </div>
                       </div>
                       <div className="box_box__1">
                           <h1>PLAN III</h1>
                           <div className="innerPlan innerPlanother">
                               <h1 className='percentRate'>20</h1>
                               <h3>%</h3>
                           </div>
                           <h3 className='planType'>5 DAYS</h3>
                           <p>Whatsminer M20S 65Th/s BTC Miner, SHA256 ASIC Bitcoin Miner</p>
                           <div className='icon'>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                            </div>
                           <div className="typeAmount_box_1">
                              <div className="innerTypeAmount">
                                  <p>Min: </p>
                                  <p className='typeAmountSpan'>GHC 800</p>
                              </div>
                               <span className='spanMainType'></span>
                              <div className="innerTypeAmount innerTypeAmount2">
                                  <p>Max: </p>
                                  <p className='typeAmountSpan'>GHC 999</p>
                              </div>
                               <span className='spanMainType'></span>
                              <div className="innerTypeAmount innerTypeAmount2">
                                  <p>Withdraw:</p>
                                  <p className='typeAmountSpan'>INSTANT</p>
                              </div>
                              <span className='spanMainType'></span>
                           </div>
                       </div>
                       <div className="box_box__1">
                           <h1>PLAN IV</h1>
                           <div className="innerPlan innerPlanother">
                               <h1 className='percentRate'>25</h1>
                               <h3>%</h3>
                           </div>
                           <h3 className='planType'>7 DAYS</h3>
                           <p>Bitmain Antminer S19 Pro 110TH - SHA-256 - Bitcoin Miner</p>
                           <div className='icon'>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                                <i class="fas fa-star"></i>
                                            </div>
                           <div className="typeAmount_box_1">
                              <div className="innerTypeAmount">
                                  <p>Min: </p>
                                  <p className='typeAmountSpan'>GHC 1000</p>
                              </div>
                               <span className='spanMainType'></span>
                              <div className="innerTypeAmount innerTypeAmount2">
                                  <p>Max: </p>
                                  <p className='typeAmountSpan'>GHC 1200</p>
                              </div>
                               <span className='spanMainType'></span>
                              <div className="innerTypeAmount innerTypeAmount2">
                                  <p>Withdraw:</p>
                                  <p className='typeAmountSpan'>INSTANT</p>
                              </div>
                              <span className='spanMainType'></span>
                           </div>
                       </div>
                   </div>
                 </section>
                 <section className='overLay_section'>
              
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
                         <p className='totalAmount'>GHC 0</p>
                     </div>
                     <div className="calcualteNow__box_6">
                         <p><span>DAILY PROFIT</span></p>
                         <p className='percent_check'>GHC</p>
                     </div>
                 </section>
                    </div>
                </section>
                
                <section className="welcome-section">
                
      <div className="welcome-container">
       
        <h1>Welcome to <span>Capital Gain Management Co.</span></h1>
        <p className="tagline">The Future, Our Mission</p>
        <p>
          At <strong>Capital Gain Management Co.</strong>, we’re more than just an investment platform — we are <strong>a legacy in motion</strong>.
        </p>
        <p>
          We believe in building a future not just for today, but for <strong>generations to come</strong>. Our mission is deeply rooted in purpose: to create an opportunity where everyone — regardless of background or status — can be part of a project that blesses lives, <strong>puts daily bread on the table</strong>, and unlocks doors to financial freedom.
        </p>
        <p>This isn’t just about money. It’s about <strong>impact, growth, and generational success</strong>.</p>

        <div className="promise-box">
          <h2>🔐 Our Promise:</h2>
          <ul>
            <li>To build a <strong>secure, trusted, and lasting investment platform</strong></li>
            <li>To empower individuals to grow, no matter where they’re starting from</li>
            <li>To make this platform a <strong>blessing for families, communities, and future generations</strong></li>
            <li>To grow with you, and for you</li>
          </ul>
        </div>

        <p>
          With <strong>Capital Gain Management Co.</strong>, you're not just investing in a project — you're becoming part of a <strong>global vision</strong> to create wealth, opportunity, and sustainability for years to come.
        </p>

        <blockquote className="quote">
          🚀 <strong>Your investment today is a seed for tomorrow’s harvest.</strong>
        </blockquote>

        <p className="final-note">Join us, and let’s build a future that <strong>outlives us all</strong>.</p>
      </div>
    </section>
    
    <img
          src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2FCapital%20Gain%20Management%20Co..jpg?alt=media&token=0d468756-ba8a-4084-b2cd-00cbf957f9ab" // Replace with your actual image path
          alt="Capital Gain Management Co."
          className=""
        />
                <section className='about__us__main'>
                   <div className="about__box_1">
                    <h1>ABOUT <span>OUR COMPANY</span></h1>
                    <p>
                        <strong>Capital Gain Management Co.</strong> is a global leader in <strong>Bitcoin cloud mining</strong> combined with <strong>real-world diversified agriculture</strong>. We deliver <strong>stable daily profits</strong> to our investors by merging secure crypto operations with high-demand farm ventures.
                        <br /><br />
                        Our Farm Divisions include:  
                        🐟 <strong>Fish Farming</strong>,  
                        🐔 <strong>Poultry Farming</strong> (chickens, ducks, guinea fowls),  
                        🐐 <strong>Goat Farming</strong>,  
                        🐌 <strong>Snail Farming</strong>,  
                        🐇 <strong>Rabbit Farming</strong>,  
                        🐖 <strong>Pig Farming</strong>,  
                        🐑 <strong>Sheep Farming</strong>,  
                        🐄 <strong>Cattle Farming</strong>,  
                        🍯 <strong>Bee Keeping</strong> (honey production),  
                        🥬 <strong>Vegetable Cultivation</strong> (pepper, tomatoes, okra),  
                        🍌 <strong>Plantain & Maize Farming</strong>,  
                        🌱 <strong>Cassava Farming</strong>,  
                        🍄 <strong>Mushroom Farming</strong>.
                        <br /><br />
                        By investing with Capital Gain Management Co., you support sustainable agriculture while earning from both <strong>digital and physical asset-backed streams</strong>.
                      </p>
                    <p>
                        We are well-financed, professionally managed, and committed to transparent, secure, and reliable profit-sharing. Investors can easily deposit and withdraw using Bitcoin, Mobile Money (MoMo), Bank Transfers. With strong local support in Ghana and a vision to serve future generations, Capital Gain Management Co. is your trusted partner for building sustainable wealth.
                    </p>
                    <a href="/about-us" className="btn btn__read_more">READ MORE</a>
                    </div>

                    {/* <div className="about__box_2">
                        <img src={require('../../images/bitcoin-3396302.jpg')} />
                    </div> */}
                </section>
                <section className='poultryFarmMain'>
                    <PoultryFarmVideo/>
                </section>
                <section class="btc_shark_trade_MomoTrust">
                    <MomoTrust/>
                </section>
           
                <section className='advanteage'>
                    <h1>OUR <span>ADVANTEAGE</span></h1>
                    <div className="advant__box__1">
                        <div className="advanteage__box__1 advan__box">
                            <div className="Advanteage__inner__box__1">
                            <i class="fas fa-registered fa-4x" ></i>
                            </div>
                            <div className="Advanteage__inner__box__2">
                            <h3>REGISTERED & TRUSTED</h3>
                            <p>Capital Gain Management Co. is fully registered and legally licensed under the proper authorities. We operate transparently and comply with all local and international investment regulations to keep your funds safe and secure.</p>
                            </div>

                        </div>
                        <div className="advanteage__box__1 advan__box">
                            <div className="Advanteage__inner__box__1">
                            <i class="fas fa-shield-alt fa-4x"></i>
                            </div>
                           <div className="Advanteage__inner__box__2">
                            <h3>ADVANCED DDoS PROTECTION</h3>
                            <p>Our platform is safeguarded with industry-leading DDoS protection systems to prevent and mitigate all types of attacks, ensuring your data and transactions remain secure and uninterrupted 24/7.</p>
                            </div>

                        </div>
                        <div className="advanteage__box__1 advan__box">
                            <div className="Advanteage__inner__box__1">
                            <i class="fas fa-hand-holding-usd fa-4x"></i>
                            </div>
                           <div className="Advanteage__inner__box__2">
                            <h3>FAST & SECURE WITHDRAWALS</h3>
                            <p>
                                Withdrawal requests are processed instantly without delays. Enjoy unlimited daily withdrawals through <strong>Mobile Money (MoMo)</strong>, <strong>Bank Transfer</strong>, and <strong>Bitcoin</strong> — giving you quick and reliable access to your funds anytime.
                            </p>
                            </div>

                        </div>
                        <div className="advanteage__box__1 advan__box">
                            <div className="Advanteage__inner__box__1">
                            <i class="fas fa-users fa-4x"></i>
                            </div>
                            <div className="Advanteage__inner__box__2">
                            <h3>EXPERIENCED MANAGEMENT TEAM</h3>
                            <p>
                                Our company is legally registered and operated by a highly experienced team with deep expertise in cryptocurrency mining and diversified investment management.
                            </p>
                            </div>

                        </div>
                        <div className="advanteage__box__1 advan__box">
                            <div className="Advanteage__inner__box__1">
                            <i class="fas fa-key fa-4x"></i>
                            </div>
                            <div className="Advanteage__inner__box__2">
                            <h3>DOMAIN REGISTRATION</h3>
                            <p>
                                Our domain is securely registered with domain lock enabled to prevent unauthorized changes, ensuring maximum protection against malicious and hacker activities.
                            </p>
                            </div>

                        </div>
                        <div className="advanteage__box__1 advan__box">
                            <div className="Advanteage__inner__box__1">
                            <i class="fas fa-phone fa-4x"></i>
                            </div>
                            <div className="Advanteage__inner__box__2">
                            <h3>24/7 CUSTOMER SUPPORT</h3>
                            <p>
                                At capgainco.com, taking care of our customers is our top priority. That’s why we offer reliable 24/7 online support to assist you anytime you need help.
                            </p>
                            </div>

                        </div>
                    </div>
                </section>
                <section class="co_ing">
                    <img src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2FMANAGEMENT%20CO.jpg?alt=media&token=d3e8d635-e62a-49db-8e38-55ce8ce65af9" alt="Capgainco " />
                </section>
                
                 <section class="goatFarmVideo">
                    <GoatFarmVideo/>
                 </section>
                <section class="displayRecentRegisterUser">
                <div className="recent-users-container">
                <motion.h2
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="title"
                >
                🚀 Recent Users Registered
                </motion.h2>
                
                <motion.ul
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                >
                {this.state.users.map((user, index) => (
                    <motion.li
                        key={index}
                        className="recent-users-container user-card"
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px #0ff" }}
                        transition={{ duration: 0.3 }}
                    >
                       
                        <div className="recent-users-container user-info">
                        <img src={`https://robohash.org/${user.user_Name}`} alt="Avatar" />
                        <h3><span class="newUserColour">New</span> User: {user.user_Name}</h3>
                        <p><span class="dateColor">Joined</span>Date: {new Date(user.createdAt).toLocaleString()}</p>
                        </div>
                    </motion.li>
                    ))}
                </motion.ul>
            </div>
                </section>
                <section className='reffer__main'>
                    <div className="reffer__me__now">
                        <i class="fas fa-people-arrows fa-8x"></i>
                        <div className="reff__box">
                            <h1><span>5%</span></h1>
                            <h4>REFERRAL COMMISSION</h4>
                        </div>
                        <div className="refferText">
                            <p>You've got the opportunity to invite your friends, family, or other groups to enjoy our Invest plans and benefit from our lucrative affiliate program.</p>
                            <p>For each Invest of plans, one of your referrals makes, you'll gain an instant 5% commission. This alone can help you build a constant cash-flow.</p>
                        </div>
                    </div>
                </section>
                <section class="co_ing">
                    <img src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2FUntitled%20design%20(2).jpg?alt=media&token=88b1471a-973d-4b48-9eeb-f9090be9cb0b " />
                </section>
                <section class="MaizeFarm">
                <MaizeFarm/>
                </section>
                <section class="recentDepost">
                            <div className="recent-users-container">
                    <h1 className="recent-users-container title">Recent Deposits</h1>
                    <ul className="recent-users-container ul">
                    {this.state.deposits.map((deposit, index) => (
                        <motion.li
                        key={index}
                        className="recent-users-container user-card"
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px #0ff" }}
                        transition={{ duration: 0.3 }}
                        >
                       
                        <div className="recent-users-container user-info">
                            <img src={`https://robohash.org/${deposit.user}`} alt="User Avatar" />
                            <h3>{deposit.user_Name}</h3>
                            <p>Amount: GHC{deposit.depositAmount}</p>
                            {/* <p>Method: <span class="bitcoinColour">MOMO</span> </p> */}
                            <p><span class="dateColor">Deposit</span> Date: {new Date(deposit.createdAt).toLocaleString()}</p>
                        </div>
                        </motion.li>
                    ))}
                    </ul>
                </div>
                </section>
                <section class="co_ing">
                    <img src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2FYour%20paragraph%20text.jpg?alt=media&token=cb2a1896-a5f4-4437-b4c5-f8782ef0cb5b" alt="Capgainco " />
                </section>
                <section class="lastWithdrawls">
                     <div className="recent-users-container">
                      {/* <img src={require('../../AllInOne/bticoin/de0912f4-bd56-4e69-9c60-ca69755ea08d.webp')}/> */}
                        <h1 className="title titleRecentWithdrawals">Recent Withdrawals</h1>
                        <ul>
                        {this.state.withdrawals.map((withdrawal, index) => (
                            <motion.li
                            key={index}
                            className="user-card"
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px #ff0" }}
                            transition={{ duration: 0.3 }}
                            >
                            
                            <div className="user-info">
                                <img src={`https://robohash.org/${withdrawal.user_Name}`} alt="Avatar" />
                                <h3>{withdrawal.user_Name}</h3>
                                <p><span class="newUserColour">Amount </span> Withdraw: GHC{withdrawal.activetDeposit
                                }</p>
                                <p><span class="dateColor">Withdraw</span> Date: {new Date(withdrawal.createdAt).toLocaleString()}</p>
                            </div>
                            </motion.li>
                        ))}
                        </ul>
                    </div>
                </section>
                
               <section class="pigFarmMain">
                <PigFarm/>
               </section>
                <section className="tradingView" >
                  <TradingViewWidget />
                </section>
                <section class="TestimonialsSection">
                    <TestimonialsSection/>
                </section>
                <section class="cassavaFarmMain">
                    <CassavaFarmingVideo/>
                </section>
                   
            </div>
         );
    }
}
 
export default Home;