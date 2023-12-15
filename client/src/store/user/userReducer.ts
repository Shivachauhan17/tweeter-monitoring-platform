export interface userState{
    username:string,
    monitoringUser:string,
    bio:string
}


export interface HomeAction {
    type: string,
    payload: string
}


const initialState:userState={
    username:"",
    monitoringUser:"",
    bio:""
};


const userReducer=(state:userState=initialState,action:HomeAction):userState=>{

switch(action.type){

    case "user/setUserName":
        return{
            ...state,
            username:action.payload
        }
    
    case "user/setMonitoringUserName":
        return{
            ...state,
            monitoringUser:action.payload
        }
    
    case "user/setBio":
        return{
            ...state,
            bio:action.payload
        }

    default:
        return state

}

}

export default userReducer;