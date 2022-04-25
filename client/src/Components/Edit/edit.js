import React, { Component } from 'react';
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import './style.css'

class EditMain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            full_Name: '',
            user_Name: '',
            ip_address: '',
            bitcoin: '',
            user_id: '',
            email: '',
            password: '',
            confirmPassword: '',
            register_date: '',
            user_profile_display: []
         }
         this.handleChange = this.handleChange.bind(this)
         this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange =input => (event)=>{
        event.preventDefault()
        this.setState({[input]:event.target.value })
    }

    componentDidMount(){
        console.log(this.state.user_profile_display)

        const Refres_profile_hToken = sessionStorage.getItem('Refres_profile_hToken')
        if(Refres_profile_hToken){
            sessionStorage.removeItem('x-access-token')
            sessionStorage.setItem('x-access-token',Refres_profile_hToken)
        }


        const token = sessionStorage.getItem('x-access-token')
        const decoded = jwt_decode(token) 
        const id = decoded.user_id
         JSON.stringify( sessionStorage.setItem('user_id',decoded.user_id))
         JSON.stringify( sessionStorage.setItem('email',decoded.email))
         JSON.stringify( sessionStorage.setItem('full_Name',decoded.full_Name))
         JSON.stringify( sessionStorage.setItem('user_Name',decoded.user_Name))
         JSON.stringify( sessionStorage.setItem('bitcoin',decoded.bitcoin))
         JSON.stringify( sessionStorage.setItem(' register_date',decoded.date))
         JSON.stringify( sessionStorage.setItem('ip_address',decoded.ip_address))
        this.setState({
            user_id: decoded.user_id,
            full_Name: decoded.full_Name,
            user_Name: decoded.user_Name,
            email: decoded.email,
            bitcoin: decoded.bitcoin,
            ip_address: decoded.ip_address,
            register_date: decoded.date
         })

         axios.post('/users/user_profile_display',{id}).then(data => this.setState({
            user_profile_display: data.data
         }))
    }

    onSubmit = (event)=>{
        event.preventDefault()
        const confirmPassword = this.state.confirmPassword
        const EditProfil = {
            full_Name: this.state.full_Name,
            password: this.state.password,
            bitcoin: this.state.bitcoin,
            email: this.state.email,

        }

        if(EditProfil.password != confirmPassword){
            {toast.warning('Password Do Not Match')}
            return false;
        }
        console.log(EditProfil)
        axios.post(  `http://localhost:8000/users/updateprofile/${this.state.user_id}`,EditProfil).then(res => { 
            sessionStorage.setItem('Refres_profile_hToken',JSON.stringify(res.data))
            return res.data;
        }).then(toast.success(" Update Successful")).then( setTimeout(()=>{
            window.location ="/edit"
        },3000)).catch(err => {toast.error(err.response.data, {
            position: toast.POSITION.TOP_RIGHT
        });
    });
    }
    render() { 
        console.log(this.state.user_profile_display)
        const {full_Name,bitcoin,email} = this.state.user_profile_display
        return ( 
            <div className='edit__main'>
                <ToastContainer/>
                <h1>ACCOUNT <span>SETTINGS</span></h1>
               
                <section className='edit_now'>
                    <div className="edit__box__1_main">
                        <div className="edit__inner__box__1">
                            <h5>User Name:</h5>
                        </div>
                        <div className="edit__inner__box__2">
                            <h5>{this.state.user_Name}</h5>
                        </div>
                    </div>
                    <div className="edit__box__1_main">
                        <div className="edit__inner__box__1">
                            <h5>Registration date:</h5>
                        </div>
                        <div className="edit__inner__box__2">
                            <h5>{this.state.register_date}</h5>
                        </div>
                    </div>
                    <div className="edit__box__1_main">
                        <div className="edit__inner__box__1">
                            <h5>IP Address:</h5>
                        </div>
                        <div className="edit__inner__box__2">
                            <h5>{this.state.ip_address}</h5>
                        </div>
                    </div>
                    <div className="edit__box__1_main">
                        <div className="edit__inner__box__1">
                            <h5>Your Full Name:</h5>
                        </div>
                        <div className="edit__inner__box__2">
                            <h5><input  name='full_Name' placeholder={full_Name} onChange={this.handleChange('full_Name')}/></h5>
                        </div>
                    </div>
                    <div className="edit__box__1_main">
                        <div className="edit__inner__box__1">
                            <h5>New Password:</h5>
                        </div>
                        <div className="edit__inner__box__2">
                            <h5><input name='password'  onChange={this.handleChange('password')} /></h5>
                        </div>
                    </div>
                    <div className="edit__box__1_main">
                        <div className="edit__inner__box__1">
                            <h5>Retype Password:</h5>
                        </div>
                        <div className="edit__inner__box__2">
                            <h5><input name='confirmPassword' onChange={this.handleChange('confirmPassword')} /></h5>
                        </div>
                    </div>
                    <div className="edit__box__1_main">
                        <div className="edit__inner__box__1">
                            <h5>Your Bitcoin acc no:</h5>
                        </div>
                        <div className="edit__inner__box__2">
                            <h5><input name='bitcoin' onChange={this.handleChange('bitcoin')} placeholder={bitcoin} /></h5>
                        </div>
                    </div>
                    <div className="edit__box__1_main">
                        <div className="edit__inner__box__1">
                            <h5>Your E-mail address:</h5>
                        </div>
                        <div className="edit__inner__box__2">
                            <h5><input name='email' onChange={this.handleChange('email')} placeholder={email} /></h5>
                        </div>
                    </div>
                    <h5 className='update_h5'><a href='#' onClick={this.onSubmit}>CHANGE ACCOUNT DATA</a></h5>
                </section>
            </div>
         );
    }
}
 
export default EditMain;