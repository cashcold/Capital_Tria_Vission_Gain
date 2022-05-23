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
import moment from 'moment';
import Moment from 'react-moment';

class TotalTransaction extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            id: '',
            totalDeposit: [],
            withdrawTotal: [],
            total_transaction_history: [],
            total_transaction_checkAmount_all: [],
            startDate: new Date(),
            endDate: new Date()
         }
         
         this.handleChange = this.handleChange.bind(this)
         this.handleChangeStartDate = this.handleChangeStartDate.bind(this)
         this.handleChangeEndDate = this.handleChangeEndDate.bind(this)
         this.onSubmit = this.onSubmit.bind(this)
    }
    handleChange = input => (date)=>{
        this.setState({[input]: date.target.date.value})
    }

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
       componentDidMount(){
        const id =  sessionStorage.getItem('user_id')

        axios.post('/users/depositInfo',{id}).then(data => this.setState({
          totalDeposit: data.data.map(data => data.depositAmount)
      }))
      axios.post('/users/withdrawInfo',{id}).then(data => this.setState({
        withdrawTotal: data.data.map(data => data.WithdrawAmount)
    }))

        this.setState({
          id
        })
      }


      onSubmit = (event)=>{
        event.preventDefault()
        
        const checkTotalTransaction = {
          id: this.state.id,
          fromDate: this.state.startDate,
          endDate: this.state.endDate
        }

        axios.post('/users/total_transaction_history',checkTotalTransaction).then(data => this.setState({
          total_transaction_history: data.data
      }))
     
      
      //   axios.post('/users/total_transaction_checkAmount_all',checkTotalTransaction).then(data => this.setState({
      //     total_transaction_checkAmount_all: data
      // }))
        
        
        
      }

     
    render() { 
      const Total_all_amount = Number(this.state.totalDeposit ) + Number(this.state.withdrawTotal)
        return ( 
            <div className='total_transaction'>
              <ToastContainer/>
                <section className='total__box__1'>
                    <h1><span>TOTAL</span> TRANSACTION <span>HISTORY</span></h1>
                </section>
              <section className='total__transac__box__1'>
                  <div className="totalTransaction__box_1">
                    <DropdownButton  id="dropdown-basic-button" title="SELECT TRANSACTION ">
                        <Dropdown.Item href="/dashboard/transaction/total_transaction">Total Transaction</Dropdown.Item>
                        <Dropdown.Item href="/dashboard/transaction/total_deposit">Deposit</Dropdown.Item>
                        <Dropdown.Item href="/dashboard/transaction/total_withdrawal">Withdrawal</Dropdown.Item>
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
                      <div className="all_transaction_chat all_transaction_chat_mobile__version">
                          <div className="total_tra__box_1 plan">
                            <h4><span>Type</span></h4>
                            {this.state. total_transaction_history.map(recentApi =>{
                            return(
                                <div className=''>
                                   <h5>{recentApi.fixedDepositAmount}{recentApi.type}</h5>
                                 </div>
                            )
                        })}
                          </div>
                          <div className="total_tra__box_1 depositAmount">
                            <h4><span>Amount</span></h4>
                            {this.state. total_transaction_history.map(recentApi =>{
                            return(
                                <div className=''>
                                   <h5>$ {recentApi.depositAmount}{recentApi.activetDeposit}</h5>
                                 </div>
                            )
                        })}
                            
                          </div>
                      <div className="total_tra__box_1 date">
                        <h4><span>Date</span></h4>
                        {this.state. total_transaction_history.map(recentApi =>{
                            return(
                                <div className='dateMe'>
                                  <h5>{moment(recentApi.createdAt).format('LLL')}</h5>
                                 </div>
                            )
                        })}
                      </div>
                    </div>
                    <p className='NoTransaction_P'></p>
                      <div className="last__transac">
                      <p className="transac_left">Total Transaction:</p>
                          <p className="transac_right">$ {Total_all_amount}.00</p>
                      </div>
                   </section>
            </div>
         );
    }
}
 
export default TotalTransaction;