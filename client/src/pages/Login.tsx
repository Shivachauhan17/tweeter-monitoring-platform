import React,{memo,useEffect,ChangeEvent } from "react";
import Logo from '../components/Logo'; 
import {useSelector,useDispatch} from 'react-redux';
import { RootState } from "../store/reducer";
import { loginFormSetUsername,loginFormSetPassword } from "../store/loginForm/loginFormAction";
import Cookie from '../components/Cookie';
import {UserResponse} from './LoginSignup'
import axios,{AxiosResponse} from 'axios';
import { useNavigate } from "react-router-dom";

const Login:React.FC=()=>{
    const navigate=useNavigate()
    const cookie=Cookie();
    const {username,password}=useSelector((state:RootState)=>state.loginForm);
    const dispatch=useDispatch();


    const handleUsernameChange=(e:ChangeEvent<HTMLInputElement>):void=>{
        e.preventDefault();
        dispatch(loginFormSetUsername(e.target.value));
    };

    const handlePasswordChange=(e:ChangeEvent<HTMLInputElement>):void=>{
        e.preventDefault();
        dispatch(loginFormSetPassword(e.target.value));
    };



    const handleSubmit=async(e: React.FormEvent<HTMLFormElement>):Promise<void>=>{
        e.preventDefault();

        let response:AxiosResponse=await axios.post<UserResponse>('http://localhost:8000/login',{username:username,password:password},{withCredentials: true})
        console.log(response)
        if(response.data.user){
            cookie.setUserCookie(response.data.user)
            console.log(cookie.getUserCookie())
            navigate('/home')
        }
        else{
            navigate('/')
        }
        
    }
    
    return(
        <div>
            <Logo/>
            <div className="signupContainer">
                <div className="signupBlock"> 

                    <div className="signupBlock__imgbg">
                        <h2 style={{color:'white'}} className="signupBlock__head">Let's Explore</h2>
                        <h6 style={{color:'#563517'}} className="signupBlock__head2">Login! lets show you what's ahead</h6>
                    </div>
                    <form className="signupBlock__form" onSubmit={handleSubmit}>
                        <div className="signupBlock__form__inputBlock">
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
                                className="signupBlock__form__input"
                                id='exampleInputPassword1'
                                type="password"
                                name="password"
                                onChange={handlePasswordChange}
                                value={password}
                                autoComplete="current-password"
                            />
                        </div>
                        <button type="submit"  className="btn btn-outline-primary">LOGIN</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default memo(Login);

