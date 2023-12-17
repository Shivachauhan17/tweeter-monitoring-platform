import { SingleTweet,currentUserAction } from "./currentUserReducer";
import currentUserActionTypes from "./currentUserActionTypes.";
const currentUserActions={
    setData:(data:[SingleTweet]):currentUserAction=>{
        return{
            type:currentUserActionTypes.SET_DATA,
            payload:data
        }
    },
    setAddUser:(data:string):currentUserAction=>{
        return{
            type:currentUserActionTypes.SET_ADD_USER,
            payload:data
        }
    },
    setDelUser:(data:string):currentUserAction=>{
        return{
            type:currentUserActionTypes.SET_DEL_USER,
            payload:data
        }
    },
    setAddKeyword:(data:string):currentUserAction=>{
        return{
            type:currentUserActionTypes.SET_ADD_KEYWORD,
            payload:data
        }
    },
    setDelKeyword:(data:string):currentUserAction=>{
        return{
            type:currentUserActionTypes.SET_DEL_KEYWORD,
            payload:data
        }
    },
    incrPage:():currentUserAction=>{
        return{
            type:currentUserActionTypes.INCR_PAGE,
            payload:""
        }
    },
    setAllUsers:(data:string):currentUserAction=>{
        return{
            type:currentUserActionTypes.SET_ALL_USERS,
            payload:data
        }
    },
    setAllKeywords:(data:string):currentUserAction=>{
        return{
            type:currentUserActionTypes.SET_ALL_KEYWORDS,
            payload:data
        }
    },
    setViolentPercentage:(data:number):currentUserAction=>{
        return{
            type:currentUserActionTypes.SET_VIOLENT_PERCENTAGE,
            payload:data
        }
    },
    setNviolentPercentage:(data:number):currentUserAction=>{
        return{
            type:currentUserActionTypes.SET_NVIOLENT_PERCENTAGE,
            payload:data
        }
    }
}

export default currentUserAction;