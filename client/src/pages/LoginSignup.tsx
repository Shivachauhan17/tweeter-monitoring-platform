import React,{memo} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../assets/logo.jpg';

const LoginSignup:React.FC=()=>{



    return(
        <div className="loginSignupPage">
            
            <div className="lspage">
                <div className="lspage__logo">
                    <img className="lspage__logo__img" src={logo}/>
                    <h2 className="lspage__logo__title">JodView</h2>
                </div>
                <div className="lspage__lsBlock ">
                        <div className="">
                            <h3 className="">Login To Profile</h3>
                        </div>
                        <div className="lspage__buttons">
                            <a href='/login'><button type="button" className="btn btn-outline-primary" >Login</button></a>
                            <a href='/signup' > <button type="button" className="btn btn-outline-success">Signup</button></a>
                        </div>
                        
                        <div className="">
                            {/* <GoogleLoginButton /> */}
                        </div>
                </div>
            </div>
            
        </div>
    )

}

export default memo(LoginSignup);