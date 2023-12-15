import SignupFormTypes from "./actionTypes";
import {SignupFormAction} from './signupReducer';

export const signupFormSetUsername=(userName:string):SignupFormAction=>{
    return{
        type:SignupFormTypes.SET_SIGNUP_USERNAME,
        payload:userName
    }
}

export const signupFormSetPassword=(pass:string):SignupFormAction=>{

    return{
        type:SignupFormTypes.SET_SIGNUP_PASSWORD,
        payload:pass
    }

}

export const signupFormSetConfirmPass=(cpass:string):SignupFormAction=>{
    return{
        type:SignupFormTypes.SET_SIGNUP_CONFIRMPASSWORD,
        payload:cpass
    }
}