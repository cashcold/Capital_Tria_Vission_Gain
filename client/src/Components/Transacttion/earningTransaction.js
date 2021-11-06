import React, { Component } from 'react';
import './style.css'
import {BrowserRouter as Router, Switch, Route, useParams ,useRouteMatch} from 'react-router-dom'
import {DropdownButton,Dropdown} from 'react-bootstrap'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import axios from 'axios'

class EarningTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            startDate: new Date(),
            endDate: new Date()
         }
         
        //  this.handleChange = this.handleChange.bind(this)
         this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
         this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
         this.onSubmit = this.onSubmit.bind(this)
    }
    // handleChange = input => (date)=>{
    //     this.setState({[input]: date.target.date.value})
    // }

    handleChangeStartDate(date) {
        this.setState({
          startDate: date,
        })
      }
    handleChangeEndDate(date) {
        this.setState({
          endDate: date,
        })
      }


      onSubmit = (event)=>{
        event.preventDefault()
        
        const checkTotalTransaction = {
          startDate: this.state.startDate,
          endDate: this.state.endDate
        }
        axios.post("/users/total_tansaction/",checkTotalTransaction).then(res => {toast.success("Transaction Successful")}).then(res => setTimeout(()=>{
         console.log(checkTotalTransaction)
      }),100).catch(err => {toast.error(err.response.data)})
      }
    render() { 
      
        return ( 
            <div className='total_transaction'>
              <ToastContainer/>
                <section className='total__box__1'>
                    <h1><span>TOTAL</span> EARNING <span>HISTORY</span></h1>
                </section>
              <section className='total__transac__box__1'>
                  <div className="totalTransaction__box_1">
                    <DropdownButton  id="dropdown-basic-button" title="SELECT TRANSACTION ">
                        <Dropdown.Item href="/dashboard/transaction/total_transaction">Total Transaction</Dropdown.Item>
                        <Dropdown.Item href="/dashboard/transaction/total_deposit">Deposit</Dropdown.Item>
                        <Dropdown.Item href="/dashboard/transaction/total_withdrawal">Withdrawal</Dropdown.Item>
                        <Dropdown.Item href="/dashboard/transaction/total_earning'">Earning</Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <div className="totalTransaction__box_1">
                      <div className="all__date">
                        <div className="from__toDate__box_1">
                            <h4 >FROM <span>DATE</span></h4>   <DatePicker className='datePicker__1' selected={this.state.startDate} onChange={this.handleChangeStartDate} name="startDate" dateFormat="dd/MM/yyyy"/>
                            </div>
                            <div className="from__toDate__box_1">
                                <h4>END <span>DATE</span></h4>
                                <DatePicker className='datePicker__2' selected={this.state.endDate} onChange={this.handleChangeEndDate} name="endDate" dateFormat="dd/MM/yyyy"/>
                            </div>
                      </div>
                      <h4 className='btn btn-warning' onClick={this.onSubmit}>Search</h4>
                     </div>
                   </section>
                   <section className='total__transaction__flow'>
                      <div className="all_transaction_chat">
                          <div className="total_tra__box_1"><h4><span>Type</span></h4></div>
                          <div className="total_tra__box_1"><h4><span>Amount</span></h4></div>
                      <div className="total_tra__box_1"><h4><span>Date</span></h4></div>
                    </div>
                    <p>No transactions found</p>
                      <div className="last__transac">
                          <p className="transac_left">Total:</p>
                          <p className="transac_right">$ 0.00</p>
                      </div>
                   </section>
            </div>
         );
    }
}
 
export default EarningTransaction;