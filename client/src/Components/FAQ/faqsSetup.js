import React, { Component } from 'react';
import {tourData} from '../tourList/tourlist'
import FAQSMAIN from './faq';
import './style.css'
class FAQSETUP extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            faqs: tourData,
          
         }
    }
    handleInfo = ()=>{
      
    }
    render() { 
        const {faqs} = this.state;
     
        return (
            <div className='faqMain'>
                
                <section className='faqSection_1'>
                <h1>FREQUENTLY <span>ASKED QUESTION</span></h1>
                    <section className='mainfaqs'>
                       {faqs.map(data =>{
                            return (
                           <FAQSMAIN key={data.id} data={data}/>
                            )
                        })}
                    </section>
                </section>
            </div>
        );
    }
}
 
export default FAQSETUP;