import React, { Component } from 'react';
import './style.css'
class FooterMain extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='footer__main'>
                <section className='footer__class'>
                    <div className="footer">
                        <div className="foot__box2">
                            <h1> FAST LINKS</h1>
                            <div className="quick__lick">
                                <ul>
                                    <li><a href='/'>HOME</a></li>
                                    <li><a href='/about-us'>ABOUT US</a></li>
                                    <li><a href='/faqs'>FAQ</a></li>
                                </ul>
                                <ul>
                                    <li><a href='/contact-us'>SUPPORT</a></li>
                                    <li><a href='/faqs'>TERMS & CONDITIONS</a></li>
                                   
                                </ul>
                            </div>
                        </div>
                        <div className="foot__box3">
                            <h1>CONTACTS:</h1>
                            <p>📍 Address: Capital Gain Co, HQ
                            📞 Support: +1 234 567 890
                            📞 Support: +447459184400
                            ✉️ Email: support@capgainco.com
                            🌐 Website: www.capgainco.com</p>
                        </div>
                        
                        <div className="foot__box1">
                             <h1>Capital Gain<br/> Management Co.</h1>
                            <p>COPYRIGHT 2021. Capital Gain Management Co.</p>
                        </div>
                    </div>
                </section>
            </div>
         );
    }
}
 
export default FooterMain;