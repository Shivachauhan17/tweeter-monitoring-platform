import allMUserTypes from "./allMuserActionTypes";
import {MyMUser} from './allMusersReducer';

const allMActions={

    setAllUsers:(payload:MyMUser)=>{
        return{
            type:allMUserTypes.SET_ALL_USERS,
            payload:payload
        }
    }

}

export default allMActions;