import React,{memo,useEffect} from "react";
import {useSelector} from 'react-redux';
import { useNavigate,Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Logo from '../components/Logo'; 
import {RootState} from '../store/reducer';
import cookie from '../components/Cookie';

export interface UserResponse{
    user:string
}

const LoginSignup:React.FC=()=>{
    const username=useSelector((state:RootState)=>state.user.username);
    console.log(username)
    const cookies=cookie();
    const navigate=useNavigate();

    useEffect(()=>{
        if(cookies.getUserCookie()!==null && cookies.getUserCookie()!==undefined){
            navigate('/home_');
        }
    },[])
    

    // useEffect(()=>{
    //     const fetchUser=async()=>{
    //         let response:AxiosResponse=await axios.get<UserResponse>("http://localhost:8000/",{withCredentials: true});

    //         console.log(response.data)
            
    //         if(response.data.user!==""){
    //             dispatch(setUsername(response.data.user));
    //             cookies.setUserCookie(response.data.user);
    //         }
            
    //     }
    //     fetchUser();
    // },[]);

    return(
        <div className="loginSignupPage">
            
            <div className="lspage">
                <Logo/>
                <div className="lspage__lsBlock ">
                        <div className="">
                            <h3 className="">Login To Profile</h3>
                        </div>
                        <div className="lspage__buttons">
                            <Link to='/login_'><button type="button" className="btn btn-outline-primary" >Login</button></Link>
                            <Link to='/signup_' > <button type="button" className="btn btn-outline-success">Signup</button></Link>
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