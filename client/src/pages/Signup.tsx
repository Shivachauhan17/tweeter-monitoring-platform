import React,{memo,ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '../components/Logo'; 
import {useSelector,useDispatch} from 'react-redux';
import { RootState } from "../store/reducer";
import {signupFormSetUsername,signupFormSetPassword,signupFormSetConfirmPass} from '../store/signupForm/signupAction';

const Signup:React.FC=()=>{
    const navigate=useNavigate();
    const {username,password,confirm_password}=useSelector((state:RootState)=>state.signupForm);
    const dispatch=useDispatch();

    const handleUsernameChange=(e:ChangeEvent<HTMLInputElement>):void=>{
        e.preventDefault();
        dispatch(signupFormSetUsername(e.target.value));
    };

    const handlePasswordChange=(e:ChangeEvent<HTMLInputElement>):void=>{
        e.preventDefault();
        dispatch(signupFormSetPassword(e.target.value));
    };

    const handleConfirmPasswordChange=(e:ChangeEvent<HTMLInputElement>):void=>{
        e.preventDefault();
        dispatch(signupFormSetConfirmPass(e.target.value))
    }



    const handleSubmit=async(e: React.FormEvent<HTMLFormElement>):Promise<void>=>{
        e.preventDefault();

        let response=await fetch('https://tweeter-monitoring-backend.onrender.com/signup',{
            method:'POST',
            body:JSON.stringify({username:username,password:password,confirm_password:confirm_password}),
            headers:{
                'Content-Type':'application/json',

            },
            credentials:'include'
        })

        response=await response.json();

        if((response as any).error===null){
            navigate('/login');
        }
    }
    
    return(
        <div>
            <Logo/>

            <div className="signupContainer">
                <div className="signupBlock"> 
                    <div className="signupBlock__imgbg">
                        <h2 style={{color:'white'}} className="signupBlock__head">Get Started</h2>
                        <h6 style={{color:'#563517'}} className="signupBlock__head2">Lets us create you a account</h6>
                    </div>
                
                    <form className="signupBlock__form" onSubmit={handleSubmit}>
                        <div className="signupBlock__form__inputBlock" >
                            <label 
                                className="signupBlock__form__label"
                                htmlFor="exampleInputEmail1" 
                                >Username</label>
                            
                            <input
                                className="signupBlock__form__input"
                                type="text"
                                id='exampleInputEmail1'
                                name="username"
                                onChange={handleUsernameChange}
                                value={username}
                                autoComplete="username"
                            />
                        </div>
                        <div className="signupBlock__form__inputBlock">
                            <label 
                                className="signupBlock__form__label"
                                htmlFor="exampleInputPassword1">Password</label>
                            <input
                                id='exampleInputPassword1'
                                type="password"
                                name="password"
                                className="signupBlock__form__input"
                                onChange={handlePasswordChange}
                                value={password}
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="signupBlock__form__inputBlock">
                            <label 
                                className="signupBlock__form__label"
                                htmlFor="exampleInputPassword1">Confirm Password</label>
                            <input
                            id='exampleInputPassword2'
                                type="password"
                                name="confirm_password"
                                className="signupBlock__form__input"
                                onChange={handleConfirmPasswordChange}
                                value={confirm_password}
                                autoComplete="confirm-password"
                            />
                        </div>
                        <button type="submit"  className="btn btn-outline-primary">SIGNUP</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default memo(Signup);

