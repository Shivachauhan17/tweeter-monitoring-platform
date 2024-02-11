import currentUserActionTypes from "./currentUserActionTypes.";

export interface SingleTweet{
    label:string,
    tweet:string,
    profile_pic:string,
    tweet_id:string
};

export interface CurrentUser{
    addUser:string,
    deleteUser:string,
    addKeyword:string,
    deleteKeyword:string,
    data:SingleTweet[],
    page:number,
    allKeywords:string[],
    violentPercentage:number,
    nViolentPercentage:number,
    isUserMonitor:Boolean
};

export interface currentUserAction{
    type:String,
    payload:string| SingleTweet[] | SingleTweet | number 
};

const initialState:CurrentUser={
    addUser:"",
    deleteUser:"",
    addKeyword:"",
    deleteKeyword:"",
    data:[],
    page:1,
    allKeywords:[],
    violentPercentage:50,
    nViolentPercentage:50,
    isUserMonitor:true
};

const currentUserReducer=(state:CurrentUser=initialState,action:currentUserAction):CurrentUser=>{
    switch(action.type){
        
        case "currentUser/setData":
            const newdata:SingleTweet[]=Array.isArray(action.payload) ? action.payload : [action.payload] as SingleTweet[];
            return{
                ...state,
                data:newdata
            }
        
        case "currentUser/setAddUser":
            const setUser:string=typeof action.payload === 'string'?action.payload as string:state.addUser;
            return{
                ...state,
                addUser:setUser
            }        

        case "currentUser/setDelUser":
            const delUser:string=typeof action.payload === 'string'?action.payload as string:state.addUser;
            return{
                ...state,
                deleteUser:delUser
            }        
        
        case "currentUser/setAddKeyword":
            const setKeyword:string=typeof action.payload === 'string'?action.payload as string:state.addUser;
            return{
                ...state,
                addKeyword:setKeyword
            }        
    
        case "currentUser/setDelKeyword":
            const delKeyword:string=typeof action.payload === 'string'?action.payload as string:state.addUser;
            return{
                ...state,
                deleteKeyword:delKeyword
            }      
            
        case currentUserActionTypes.INCR_PAGE:
            return{
                ...state,
                page:state.page+1
            }
        
        case currentUserActionTypes.DCR_PAGE:
            if(state.page>1){
                return{
                    ...state,
                    page:state.page-1
                }
            }
            else return state
            
        case "currentUser/setAllKeywords":
            const myKeyword:string[]=Array.isArray(action.payload)?action.payload.map(item => item.label):[];
            return{
                ...state,
                // allKeywords:[...state.allKeywords,myKeyword]
                allKeywords:myKeyword
            }

        case "currentUser/setViolentPercentage":
            const value1:number=typeof action.payload === 'number'?action.payload as number:state.violentPercentage;
            return{
                ...state,
                violentPercentage:value1
            }
            
        case "currentUser/setNviolentPercentage":
            const value2:number=typeof action.payload === 'number'?action.payload as number:state.nViolentPercentage;
            return{
                ...state,
                nViolentPercentage:value2
            }
        
        case currentUserActionTypes.SET_USER_MONITOR_TRUE:
            return{
                ...state,
                isUserMonitor:true
            }
        case currentUserActionTypes.SET_USER_MONITOR_FALSE:
            return{
                ...state,
                isUserMonitor:false
            }
        
        default:
            return state
    }
}

export default currentUserReducer;