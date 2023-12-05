import React,{memo,useEffect} from "react";
import Logo from '../components/Logo'; 
import {useSelector,useDispatch} from 'react-redux';
import { RootState } from "../store/reducer";

const Login:React.FC=()=>{
    const dispatch=useDispatch();
    const data=useSelector((state:RootState)=>state.user)

    console.log(data)
    useEffect(()=>{
        dispatch({type:"user/setUserName",payload:"itsme"});
    },[]);
    
    console.log(data)
    return(
        <div>
            <Logo/>
        </div>
    );
};

export default memo(Login);

