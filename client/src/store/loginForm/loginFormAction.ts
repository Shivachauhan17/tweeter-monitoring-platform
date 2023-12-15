import loginFormTypes from "./loginFormTypes";
import {LoginFormAction} from './loginFormReducer';

export const loginFormSetUsername=(userName:string):LoginFormAction=>{
    return{
        type:loginFormTypes.SET_LOGIN_USERNAME,
        payload:userName
    }
}

export const loginFormSetPassword=(pass:string):LoginFormAction=>{

    return{
        type:loginFormTypes.SET_LOGIN_PASSWORD,
        payload:pass
    }

}