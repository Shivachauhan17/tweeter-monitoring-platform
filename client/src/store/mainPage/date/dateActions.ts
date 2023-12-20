import dateActionTypes from "./dateActionTypes";
import {DateAction} from './dateReducer';

const dateActions={
    setStartDate:(data:string):DateAction=>{
        return{
            type:dateActionTypes.SET_START_DATE,
            payload:data
        }
    },
    setEndDate:(data:string):DateAction=>{
        return{
            type:dateActionTypes.SET_END_DATE,
            payload:data
        }
    },
}

export default dateActions;