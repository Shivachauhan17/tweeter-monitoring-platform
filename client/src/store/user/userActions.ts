import actionTypes from "./actionTypes";
import {HomeAction} from './userReducer'

export const setUsername=(userName:string):HomeAction=>{
    return{
        type:actionTypes.SET_USERNAME,
        payload:userName
    };
};


export const setBio=(bio:string):HomeAction=>{
    return{
        type:actionTypes.SET_BIO,
        payload:bio
    };
};

export const setMonitoringUser=(muser:string):HomeAction=>{
    return{
        type:actionTypes.SET_MONITORING_USER,
        payload:muser
    };
};