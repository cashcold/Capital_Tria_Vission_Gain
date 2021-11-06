import React, { Component } from 'react';
import './style.css'
// import 'animate.css'
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isLogin: false,
         }
    }
    componentDidMount(){
        if(sessionStorage.getItem('x-access-token') != null)  {
            this.setState({
                isLogin: true,
            })
        }
      

 
        const ToggleBtn = ()=>{
            const toggleBtn = document.querySelector('.toggle__bar')
            const links = document.querySelector('.nav__links')

            toggleBtn.addEventListener('click',()=>{
                if(links.style.display==='none'){
                    links.style.display='block';
                }
                else{
                    links.style.display='none'
                }
            })
            
        }
        ToggleBtn()

        const LogoRedirect = ()=>{
            document.querySelector('.logoImg').addEventListener('click',()=>{
                window.location = '/'
            })
        }
        LogoRedirect()
        }
        LogoutNow = ()=>{
            sessionStorage.removeItem('x-access-token');
            sessionStorage.clear(); 
        }
        render() { 
        if(this.state.isLogin){
            document.querySelector(".btn-login-in").style.display = "none"
            document.querySelector(".btn-join-us").style.display = "none"
            document.querySelector('.togglo__dash').style.display = 'block'
            
        }
        return ( 
            <div className=' navbarMain'>
              
               <section className='navMain'>
                   <nav>
                       <div className='logoImg animate__animated animate__slower animate__flash'>
                         <h1>Capital Gain Management Co.</h1>
                       </div>
                       <div className='nav__links animate__animated animate__slower animate__bounceInDown'>
                           <ul className='links'>
                               <li><a href='/' style={{color: "red"}}>HOME </a></li>
                               <li><a href='/about-us'>ABOUT US</a></li>
                               <li><a href='/faqs'>FAQS</a></li>
                               <li><a href='/contact-us'>SUPPORT</a></li>
                                <a href='/login' className='btn btn-login-in'>Login</a> 
                                <a href='/register' className='btn btn-join-us'>Register</a> 
                                <div className='togglo__dash'>
                                    <div className="dash__both">
                                        <a href='/dashboard' className='btn btn-login-in btn-login-in_account'>ACCOUNT</a> 
                                        <a href='/' className='btn btn-join-us' onClick={this.LogoutNow}>LOGOUT</a> 
                                    </div>
                                </div>
                           </ul>
                       </div>
                       <div className='aboyt__toggle '>
                            <div className='toggle__bar animate__animated animate__slower animate__zoomInDown'>
                                <div className='toggle'></div>
                                <div className='toggle'></div>
                                <div className='toggle'></div>
                            </div>
                     </div>
                     </nav>
                     
               </section>
            </div>
         );
    }
}
 
export default Navbar;