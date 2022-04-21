import React, { Component } from 'react';
import {tourData} from '../tourList/tourlist'
import './style.css'
class FAQSMAIN extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            isShow: false,
         }
    }
    componentDidMount(){
      
    }
    handleInfo = ()=>{
        this.setState({
            isShow: ! this.state.isShow
        })
    }
    render() { 
        const {id,title,about} = this.props.data
     
        return (
            <div className='faqsState'>
                <section className='faqSection_1'>
                   
                    <section className='mainfaqs'>
                      <div>
                      <h2 onClick={this.handleInfo}><i class="fas fa-plus"></i>{ title}</h2><br/>
                      {this.state.isShow &&  <h5>{ about}</h5>}
                     
                      </div>

                    </section>
                </section>
            </div>
        );
    }
}
 
export default FAQSMAIN;