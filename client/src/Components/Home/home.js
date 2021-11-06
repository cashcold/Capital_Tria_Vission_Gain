import React, { Component } from 'react';
import './style.css'


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            amountCalculate: ''
         }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
        
    }

    componentDidMount(){

        const urlSearchParams = new URLSearchParams(window.location.search);
        for(var pair of urlSearchParams.entries()) {
            sessionStorage.setItem('reffer',(pair[0]+''+pair[1]) ) 
         }
       
    }
    render() { 
        const CalculatorEngine = ()=>{
           if( this.state.amountCalculate){
                if( this.state.amountCalculate <= 59){
                const Percentage = this.state.amountCalculate * 9.5/100
                const totoalCheck = Number(this.state.amountCalculate) + (Percentage)
               document.querySelector('.totalAmount').innerHTML = "$"+ totoalCheck
               document.querySelector('.percent_check').innerHTML = Percentage +" %"
               document.querySelector('.planNowType').innerHTML = "PLAN I"
                }
 
            }
           if( this.state.amountCalculate){
                if( this.state.amountCalculate >= 60 ){
                const Percentage = this.state.amountCalculate * 29/100
                const totoalCheck = Number(this.state.amountCalculate) + (Percentage)
               document.querySelector('.totalAmount').innerHTML = "$"+totoalCheck
               document.querySelector('.percent_check').innerHTML = Percentage
               document.querySelector('.planNowType').innerHTML = "PLAN II"
                }
 
            }
           if( this.state.amountCalculate){
                if( this.state.amountCalculate > 119){
                const Percentage = this.state.amountCalculate * 49.5/100
                const totoalCheck = Number(this.state.amountCalculate) + (Percentage)
               document.querySelector('.totalAmount').innerHTML = "$"+totoalCheck
               document.querySelector('.percent_check').innerHTML = Percentage
               document.querySelector('.planNowType').innerHTML = "PLAN III"
                }
 
            }
           if( this.state.amountCalculate){
                if( this.state.amountCalculate > 199){
                const Percentage = this.state.amountCalculate * 70/100
                const totoalCheck = Number(this.state.amountCalculate) + (Percentage)
               document.querySelector('.totalAmount').innerHTML = "$"+totoalCheck
               document.querySelector('.percent_check').innerHTML = Percentage
               document.querySelector('.planNowType').innerHTML = "PLAN IIII"
                }
 
            }
           if( this.state.amountCalculate){
                if( this.state.amountCalculate > 300){
               document.querySelector('.totalAmount').innerHTML = "Please Max Investment is 300$ "
               document.querySelector('.percent_check').innerHTML = 'Not Avalibale'
               document.querySelector('.planNowType').innerHTML = ""
                }
 
            }
            
              
        }
                
            //    document.querySelector('.toatlProfit').style.cssText = "font-size: 30px"
            //    document.querySelector('.toatalAllMoney').innerHTML ="$"+OverAllProfit + " TOATAL PROFIT RECEIVED   "
            //    document.querySelector('.toatalAllMoney').style.cssText = "display: block; font-size: 30px " 
        CalculatorEngine()
        console.log(this.state.amountCalculate)
        return ( 
            
            <div className='main__home'>
                <section className='home__main__box__1'>
                        <div className="home__box__1">
                            <div className='home__h1'>
                                <h1 className='home__box__h1'>Capital Gain Management Co.</h1>
                                <h3 className='home__box__h3'>Earn up to 9.5% Daily, Easily with 3 STEPS</h3>
                            </div>
                         <div className="home__flow__box">
                            <div className="flow__box__1 flow__boxMe flowAnimate">
                                 <i class="fas fa-user fa-3x flowAnimate"></i>
                                 <hr className='flowAnimate'/>
                                 <p className='flowAnimate'>Open a Free Account</p>
                                 <a href='#' className='btn-home flowAnimate'>Sign-up</a>
                            </div>
                            <div className="flow__box__2 flow__boxMe flowAnimate">
                                 <i class="fas fa-user fa-3x flowAnimate"></i>
                                 <hr className='flowAnimate'/>
                                 <p className='flowAnimate'>Choose a Plan and Deposit</p>
                                 <a href='#' className='btn-home flowAnimate'>Deposit</a>
                            </div>
                            <div className="flow__box__3 flow__boxMe flowAnimate">
                            <i class="fas fa-user fa-3x flowAnimate"></i>
                                 <hr className='flowAnimate'/>
                                 <p className='flowAnimate'>Withdraw Your Profits</p>
                                 <a href='#' className='btn-home flowAnimate'>Withdraw</a>
                            </div>
                            </div>
                        </div>
                        <div className="home__box__2">
                        <img src={require('../../images/farm-2852024_1920.jpg')} className='home__box__2_image'/> 
                        </div>
                </section>
                <section className='about__investmentt__plan  '>
                    <div className="header__text">
                        <h2>OUR <span>INVESTMENT</span> PLANS</h2>
                    </div>
                    <div className="investmentt__plan">
                         <section className='pricingNow'>
                   <div className='container container__2'>
                       <div className="box_box__1">
                           <h1>PLAN I</h1>
                           <div className="innerPlan innerPlanother">
                               <h1 className='percentRate'>9.5</h1>
                               <h3>%</h3>
                           </div>
                           <h3 className='planType'>DAILY FOREVER</h3>
                           <div className="typeAmount_box_1">
                              <div className="innerTypeAmount">
                                  <p>Min: </p>
                                  <p className='typeAmountSpan'>$10</p>
                              </div>
                               <span className='spanMainType'></span>
                              <div className="innerTypeAmount innerTypeAmount2">
                                  <p>Max: </p>
                                  <p className='typeAmountSpan'>$59</p>
                              </div>
                               <span className='spanMainType'></span>
                              <div className="innerTypeAmount innerTypeAmount2">
                                  <p>Withdraw:</p>
                                  <p className='typeAmountSpan'>INSTANT</p>
                              </div>
                           </div>
                       </div>
                       <div className="box_box__1">
                           <h1>PLAN II</h1>
                           <div className="innerPlan innerPlanother">
                               <h1 className='percentRate'>29</h1>
                               <h3>%</h3>
                           </div>
                           <h3 className='planType'>3 DAYS</h3>
                           <div className="typeAmount_box_1">
                              <div className="innerTypeAmount">
                                  <p>Min: </p>
                                  <p className='typeAmountSpan'>$60</p>
                              </div>
                               <span className='spanMainType'></span>
                              <div className="innerTypeAmount innerTypeAmount2">
                                  <p>Max: </p>
                                  <p className='typeAmountSpan'>$119</p>
                              </div>
                               <span className='spanMainType'></span>
                              <div className="innerTypeAmount innerTypeAmount2">
                                  <p>Withdraw:</p>
                                  <p className='typeAmountSpan'>INSTANT</p>
                              </div>
                           </div>
                       </div>
                       <div className="box_box__1">
                           <h1>PLAN III</h1>
                           <div className="innerPlan innerPlanother">
                               <h1 className='percentRate'>49.5</h1>
                               <h3>%</h3>
                           </div>
                           <h3 className='planType'>5 DAYS</h3>
                           <div className="typeAmount_box_1">
                              <div className="innerTypeAmount">
                                  <p>Min: </p>
                                  <p className='typeAmountSpan'>$120</p>
                              </div>
                               <span className='spanMainType'></span>
                              <div className="innerTypeAmount innerTypeAmount2">
                                  <p>Max: </p>
                                  <p className='typeAmountSpan'>$199</p>
                              </div>
                               <span className='spanMainType'></span>
                              <div className="innerTypeAmount innerTypeAmount2">
                                  <p>Withdraw:</p>
                                  <p className='typeAmountSpan'>INSTANT</p>
                              </div>
                           </div>
                       </div>
                       <div className="box_box__1">
                           <h1>PLAN IV</h1>
                           <div className="innerPlan innerPlanother">
                               <h1 className='percentRate'>70</h1>
                               <h3>%</h3>
                           </div>
                           <h3 className='planType'>7 DAYS</h3>
                           <div className="typeAmount_box_1">
                              <div className="innerTypeAmount">
                                  <p>Min: </p>
                                  <p className='typeAmountSpan'>$200</p>
                              </div>
                               <span className='spanMainType'></span>
                              <div className="innerTypeAmount innerTypeAmount2">
                                  <p>Max: </p>
                                  <p className='typeAmountSpan'>$300</p>
                              </div>
                               <span className='spanMainType'></span>
                              <div className="innerTypeAmount innerTypeAmount2">
                                  <p>Withdraw:</p>
                                  <p className='typeAmountSpan'>INSTANT</p>
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
                         <p className='totalAmount'>$0</p>
                     </div>
                     <div className="calcualteNow__box_6">
                         <p><span>DAILY PROFIT</span></p>
                         <p className='percent_check'>%</p>
                     </div>
                 </section>
                    </div>
                </section>
                <section className='about__us__main'>
                    <div className="about__box_1">
                        <h1>ABOUT <span>OUR COMPANY</span></h1>
                        <p>Capital Gain Management Co. is at heart a bitcoin investment company. However, we are opportunistic and are looking at other cryptocurrency resource opportunities that present a favorable upside.</p>
                        <p>The Company is well financed and management has a wealth of experience in all aspects of mineral exploration and development. Capital Gain Management Co. is also a place to invest and earn profits with stable percent.</p>
                        <a href='/about-us' classname='btn btn__read_more'>READ MORE</a>
                    </div>
                    <div className="about__box_2">
                        <img src={require('../../images/bitcoin-3396302.jpg')} />
                    </div>
                </section>
                <section className='advanteage'>
                    <h1>OUR <span>ADVANTEAGE</span></h1>
                    <div className="advant__box__1">
                        <div className="advanteage__box__1 advan__box">
                            <div className="Advanteage__inner__box__1">
                            <i class="fas fa-registered fa-4x" ></i>
                            </div>
                            <div className="Advanteage__inner__box__2">
                                <h3>REAL REGISTERED COMPANY</h3>
                                <p>Our company is legally registered in the United Kingdom with the proper authority.</p>
                            </div>
                        </div>
                        <div className="advanteage__box__1 advan__box">
                            <div className="Advanteage__inner__box__1">
                            <i class="fas fa-shield-alt fa-4x"></i>
                            </div>
                            <div className="Advanteage__inner__box__2">
                                <h3>DDOS PROTECTION</h3>
                                <p>Our company install DDoS Protection to mitigate all types of DDoS attacks.</p>
                            </div>
                        </div>
                        <div className="advanteage__box__1 advan__box">
                            <div className="Advanteage__inner__box__1">
                            <i class="fas fa-hand-holding-usd fa-4x"></i>
                            </div>
                            <div className="Advanteage__inner__box__2">
                                <h3>FAST AND SECURE WITHDRAWALS</h3>
                                <p>Withdrawal requests process instantlyy without any delay. You can make as many requests as you want everyday.</p>
                            </div>
                        </div>
                        <div className="advanteage__box__1 advan__box">
                            <div className="Advanteage__inner__box__1">
                            <i class="fas fa-users fa-4x"></i>
                            </div>
                            <div className="Advanteage__inner__box__2">
                                <h3>EXPERIENCED MANAGEMENT TEAM</h3>
                                <p>Our company is legally registered in the United Kingdom with the proper authority.</p>
                            </div>
                        </div>
                        <div className="advanteage__box__1 advan__box">
                            <div className="Advanteage__inner__box__1">
                            <i class="fas fa-key fa-4x"></i>
                            </div>
                            <div className="Advanteage__inner__box__2">
                                <h3>DOMAIN REGISTRATIONY</h3>
                                <p>Our domain is registered for four (4) years with domain name lock to prevent malicious and hacker activities.</p>
                            </div>
                        </div>
                        <div className="advanteage__box__1 advan__box">
                            <div className="Advanteage__inner__box__1">
                            <i class="fas fa-phone fa-4x"></i>
                            </div>
                            <div className="Advanteage__inner__box__2">
                                <h3>24/7 CUSTOMER SUPPORT</h3>
                                <p>Taking care of our customers is important at axcellus.cc. So we've made 24/7 online support.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='reffer__main'>
                    <div className="reffer__me__now">
                        <i class="fas fa-people-arrows fa-8x"></i>
                        <div className="reff__box">
                            <h1><span>5%</span></h1>
                            <h4>REFERRAL COMMISSIO</h4>
                        </div>
                        <div className="refferText">
                            <p>You've got the opportunity to invite your friends, family, or other groups to enjoy our Invest plans and benefit from our lucrative affiliate program.</p>
                            <p>For each Invest of plans, one of your referrals makes, you'll gain an instant 5% commission. This alone can help you build a constant cash-flow.</p>
                        </div>
                    </div>
                </section>
            </div>
         );
    }
}
 
export default Home;