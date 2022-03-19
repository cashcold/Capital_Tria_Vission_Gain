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
                            <h1>LINKS</h1>
                            <div className="quick__lick">
                                <ul>
                                    <li><a href=''>HOME</a></li>
                                    <li><a href=''>ABOUT US</a></li>
                                    <li><a href=''>FAQ</a></li>
                                </ul>
                                <ul>
                                    <li><a href=''>SUPPORT</a></li>
                                    <li><a href=''>TERMS & CONDITIONS</a></li>
                                    <li><a href=''>AFFILIATES</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="foot__box3">
                            <h1>CONTACTS:</h1>
                            <p><i class="fas fa-envelope-square"></i>Support<br/>@CapitalGainManagement.COM</p>
                            <p><i class="fas fa-map-marker-alt"></i>58 Union Terrace,<br/> LONDON, UNITED KINGDOM, E15 6NY</p>
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