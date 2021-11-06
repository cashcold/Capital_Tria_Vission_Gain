import React, { Component } from 'react';
import './style.css'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_Name: '',
            password: ''
          }

          this.handleChange = this.handleChange.bind(this)
          this.ToggloPassword = this.ToggloPassword.bind(this)
          this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }
    ToggloPassword = ()=>{
        const x = document.querySelector('.passwordValue')
        const y = document.querySelector('.password_icon_1')
        const z = document.querySelector('.password_icon_2')

        if(x.type === 'password'){
            x.type = "text";
            y.style.display = "block";
            z.style.display = "none";
        }else{
            x.type = "password";
            y.style.display = "none";
            z.style.display = "block";
        }
    }
    
    onSubmit = (event)=>{

        const userLogin = {
            user_Name: this.state.user_Name,
            password: this.state.password
        }
        if(!userLogin.user_Name){
            toast.warning('Enter User Name ')
            return false;
        }
        if(!userLogin.password){
            toast.warning('Enter Password')
             return false;
        }
        event.preventDefault()
        axios.post( "/users/login",userLogin).then(res => { 
            sessionStorage.setItem('x-access-token',JSON.stringify(res.data))
            return res.data;
        }).then(res => {toast.success("Login Successful !", setTimeout(()=>{
            toast.success("LOADING ACCOUNT") 
        },4000),{
            
            });}).then(res => window.location="/dashboard" ).catch(err => {toast.error(err.response.data, {
            position: toast.POSITION.TOP_RIGHT
         });
        });
        
    }
    componentDidMount(){
        
    }
    render() { 
        return ( 
            <div className='loginMain'>
                <ToastContainer/>
                <section className='login__box__login'>
                         <h1>MEMBER <span>LOG IN</span></h1>    
                        <div className='formMain_login'>
                            <form>
                                <table className='formTable_login'>
                                    <tr>
                                        <td><label>Your Username: </label></td>
                                        <td><input  className='LoginInput' type='text' name='user_Name'  onChange={this.handleChange('user_Name')}/></td>
                                    </tr>
                                    <br/>
                                    <tr> 
                                        <td><label>Your Password: </label></td>
                                        <div className="loginPassword">
                                            <td className='password__flow'>
                                                <input  className='passwordValue' type='password' name='password'  onChange={this.handleChange('password')} />
                                                <div className="passwordIcons password__flow" onClick={this.ToggloPassword}>
                                                    <i class="fas fa-eye fa-2x password_icon_1"></i><i class="fas fa-eye-slash fa-2x password_icon_2"></i>
                                                </div>
                                            </td>
                                        </div>
                                    </tr>
                                </table>
                            </form>
                         
                            <div className="a_Links">
                                <a href='/forgotpassword' className='btn btn-warning'>Forgot Password</a>
                                <a href='#'  className='btn btn-danger' onClick={this.onSubmit}>Login</a>
                            </div>
                        </div>
                </section>
            </div>
         );
    }
}
 
export default Login;