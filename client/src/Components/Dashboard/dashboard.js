import React, { Component } from 'react';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { BrowserRouter as Router, Switch, Route, useParams, useRouteMatch, Link } from 'react-router-dom';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import AccountRouter from '../InnerRouter/accountRouter/accountRouter';
import Account from '../InnerRouter/accountRouter/accountRouter';
import EditMainRouter from '../Edit/edit';
import WithdrawMain from '../Withdraw/withdraw';
import './style.css';
import TotalTransaction from '../Transacttion/transaction';
import DepositMain from '../Deposit/depsoit';
import WithdrawalTransaction from '../Transacttion/withdrawalTransaction';
import DepositTransaction from '../Transacttion/depositTransaction';
import EarningTransaction from '../Transacttion/earningTransaction';
import ConfirmDeposit from '../ConnfirmDeposit/confirmDeposit';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: '',
      user_balance: ''
    };
    this.LogoutNow = this.LogoutNow.bind(this);
  }

  LogoutNow = () => {
    sessionStorage.removeItem('x-access-token');
    sessionStorage.clear();
  };

  componentDidMount() {

    const token = sessionStorage.getItem('x-access-token')
    const decoded = jwt_decode(token)
     JSON.stringify( sessionStorage.setItem('user_id',decoded.user_id))
    this.setState({
        user_id: decoded.user_id,
     })

     const id = decoded.user_id

      
     axios.post('/users/user_balance',{id}).then(data => this.setState({
       user_balance: data.data.activetDeposit

       
    }))


    const user_id = sessionStorage.getItem('user_id');

    this.setState({
      user_id,
    });

    const RefreshToken = sessionStorage.getItem('RefreshToken');
    setTimeout(() => {
      if (RefreshToken) {
        sessionStorage.removeItem('x-access-token');
        sessionStorage.setItem('x-access-token', RefreshToken);
      }
    }, 1000);
  }

  render() {

    const { user_balance } = this.state



    return (
      <div className='dashboard__main'>
        <section className='dashboard__section_box__1'>
          <DropdownButton className='dashboard_bot_drop' id='dropdown-item-button' title='MY DASHBOARD'>
            <Dropdown.Item href='/dashboard/account'>ACCOUNT</Dropdown.Item>
            {user_balance <= 1 && <Dropdown.Item href='/dashboard/deposit'>DEPOSIT</Dropdown.Item>}
            <Dropdown.Item href='/dashboard/transaction/total_transaction'>TRANSACTION</Dropdown.Item>
            <Dropdown.Item href='/dashboard/edit'>EDIT</Dropdown.Item>
            <Dropdown.Item href='/' onClick={this.LogoutNow}>
              SIGN-OUT
            </Dropdown.Item>
          </DropdownButton>
        </section>
        <section className='dashboard__section_box__2'>
          <ul className='dashboard_a'>
            <li>
              <a href='/dashboard/account'>ACCOUNT</a>
            </li>
            <li>  {user_balance <= 1 && <li><a href='/dashboard/deposit'>DEPOSIT</a></li>}</li>

            <li>
              <a href='/dashboard/transaction/total_transaction'>TRANSACTION</a>
            </li>
            <li>
              <a href={`/dashboard/edit`}>EDIT</a>
            </li>
            <li>
              <a href='/' onClick={this.LogoutNow}>
                SIGN-OUT
              </a>
            </li>
          </ul>
        </section>
        <Switch>
          <Route path='/dashboard/edit' exact component={EditMainRouter} />
          <Route path='/dashboard' exact component={AccountRouter} />
          <Route path='/dashboard/account' exact component={AccountRouter} />
          <Route path='/dashboard/withdraw/:id' exact component={WithdrawMain} />
          <Route path='/dashboard/deposit' exact component={DepositMain} />
          <Route path='/dashboard/confirm_deposit' exact component={ConfirmDeposit} />
          <Route path='/dashboard/transaction/total_transaction' exact component={TotalTransaction} />
          <Route path='/dashboard/transaction/total_withdrawal' exact component={WithdrawalTransaction} />
          <Route path='/dashboard/transaction/total_deposit' exact component={DepositTransaction} />
          <Route path='/dashboard/transaction/total_earning' exact component={EarningTransaction} />
        </Switch>
      </div>
    );
  }
}

export default Dashboard;
