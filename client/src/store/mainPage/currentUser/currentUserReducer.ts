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
    allUsers:string[],
    allKeywords:string[],
    violentPercentage:number,
    nViolentPercentage:number
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
    allUsers:[],
    allKeywords:[],
    violentPercentage:50,
    nViolentPercentage:50
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
            
        case "currentUser/incrPage":
            return{
                ...state,
                page:state.page+1
            }
        
        case "currentUser/setAllUsers":
            const myUser:string=typeof action.payload === 'string'?action.payload as string:state.addUser;
            return{
                ...state,
                allUsers:[...state.allUsers,myUser]
            }
        
        case "currentUser/setAllKeywords":
            const myKeyword:string=typeof action.payload === 'string'?action.payload as string:state.addUser;
            return{
                ...state,
                allUsers:[...state.allUsers,myKeyword]
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
        
        default:
            return state
    }
}

export default currentUserReducer;