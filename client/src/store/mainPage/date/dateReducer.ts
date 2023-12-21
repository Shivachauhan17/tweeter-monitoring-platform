import { format } from 'date-fns';

export interface DATE{
    startDate:string,
    endDate:string
};

const initialState:DATE={
    startDate:"",
    endDate:""
}
export interface DateAction{
    type:string,
    payload:string
}

const dateReducer=(state:DATE=initialState,action:DateAction):DATE=>{
    switch(action.type){

        case 'date/setStartDate':
            const mydate=format(new Date(action.payload),"yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            
            return{
                ...state,
                startDate:mydate
            }

        case 'date/setEndDate':
            const myEndDate=format(new Date(action.payload),"yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
           
            return{
                ...state,
                endDate:myEndDate
            }

        default:
            return state
    }
}

export default dateReducer;