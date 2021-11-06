import React, { Component } from 'react';
import './style.css'
class AboutMain extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='aboutMain'>
                <section className='about_box__1'>
                  <div className="allAboutInfo">
                  <h1>ABOUT</h1>
                    <div className="otherAboutText">
                        <p>Capital Gain Management Co. is at heart a cryptocurrency investment company. However, we are opportunistic and are looking at other financial resource opportunities that present a favorable upside. The Company is well financed and management has a wealth of experience in all aspects of cryptocurrency investment and development.
                        </p>
                        <p>Capital Gain Management Co. is also a place to invest and earn profits with stable percent. The company employ the uttermost skills, experiences and professional tactics in stock, Forex traders and gold trading. Our focus is to offer to individuals an exclusive funds management service. We are looking forward to have a long-term relationship with the investors and in turn we will do our best to provide quality services to our members. Our opinion about Investing, as a rule, is all about managing risks. For us, it means also, to provide our clients fast returns and payouts on time, and so share profits together and as a result, earn up more. The only way to guarantee our growth is to ensure that our investors grows first and this is the reason why we care about investors and their investment.</p>
                        <h3>COMPANY LEGAL</h3>
                        <p>Capital Gain Management Co. was registered on 11 May 2016 The "Capital Gain Management Co." is the official and duly registered trade mark of Capital Gain Management Co. Who are authorised and regulated by the United Kingdom Company House Authority under firm reference number 10173512.</p>
                        <p>Capital Gain Management Co. is registered in LONDON No.  10873519. Registered office, 58 Union Terrace, UNITED KINGDOM,  E15 6NY</p>
                    </div>
                  </div>
                </section>
            </div>
         );
    }
}
 
export default AboutMain;