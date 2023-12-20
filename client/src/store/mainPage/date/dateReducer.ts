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
            return{
                ...state,
                startDate:action.payload
            }

        case 'date/setEndDate':
            return{
                ...state,
                endDate:action.payload
            }

        default:
            return state
    }
}

export default dateReducer;