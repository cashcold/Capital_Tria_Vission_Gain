import React, { Component } from 'react';
import './style.css'
class EditMainRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='edit__main'>
                <h1>ACCOUNT  Router<span>SETTINGS</span></h1>
                <section className='edit_now'>
                    <div className="edit__box__1">
                        <div className="edit__inner__box__1">
                            <h5>Account Name:</h5>
                        </div>
                        <div className="edit__inner__box__2">
                            <h5>	cashcold99</h5>
                        </div>
                    </div>
                    <div className="edit__box__1">
                        <div className="edit__inner__box__1">
                            <h5>Registration date:</h5>
                        </div>
                        <div className="edit__inner__box__2">
                            <h5>Jun-11-2020 05:49:55 AM</h5>
                        </div>
                    </div>
                    <div className="edit__box__1">
                        <div className="edit__inner__box__1">
                            <h5>Your Full Name:</h5>
                        </div>
                        <div className="edit__inner__box__2">
                            <h5><input placeholder='cashcold'/></h5>
                        </div>
                    </div>
                    <div className="edit__box__1">
                        <div className="edit__inner__box__1">
                            <h5>New Password:</h5>
                        </div>
                        <div className="edit__inner__box__2">
                            <h5><input /></h5>
                        </div>
                    </div>
                    <div className="edit__box__1">
                        <div className="edit__inner__box__1">
                            <h5>Retype Password:</h5>
                        </div>
                        <div className="edit__inner__box__2">
                            <h5><input /></h5>
                        </div>
                    </div>
                    <div className="edit__box__1">
                        <div className="edit__inner__box__1">
                            <h5>Your Bitcoin acc no:</h5>
                        </div>
                        <div className="edit__inner__box__2">
                            <h5><input placeholder='242hgchgbshfnjclj464ynv4hjkg'/></h5>
                        </div>
                    </div>
                    <div className="edit__box__1">
                        <div className="edit__inner__box__1">
                            <h5>Your E-mail address:</h5>
                        </div>
                        <div className="edit__inner__box__2">
                            <h5><input placeholder='cashcold99@gmail.com'/></h5>
                        </div>
                    </div>
                    <h5 className='update_h5'><a href=''>CHANGE ACCOUNT DATA</a></h5>
                </section>
            </div>
         );
    }
}
 
export default EditMainRouter;