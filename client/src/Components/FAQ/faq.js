import React, { Component } from 'react';
import {tourData} from '../tourList/tourlist'
import './style.css'
class FAQSMAIN extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            faqs: tourData,
            isShow: false
         }
    }
    handleInfo = ()=>{
        this.setState({
            isShow: ! this.state.isShow
        })
    }
    render() { 
        console.log(this.state.faqs)
        return (
            <div className='faqMain'>
                <section className='faqSection_1'>
                    <h1>FREQUENTLY <span>ASKED QUESTION</span></h1>
                    <section className='mainfaqs'>
                        {this.state.faqs.map(faqs =>{
                            return (
                            <div key={faqs.id} className='faqsState'>
                                <h2 onClick={this.handleInfo}><i class="fas fa-plus"></i> {faqs.title} </h2>
                                {this.state.isShow &&    <h5>{faqs.about}</h5>}
                              
                            </div>
                            )
                        })}
                    </section>
                </section>
            </div>
        );
    }
}
 
export default FAQSMAIN;