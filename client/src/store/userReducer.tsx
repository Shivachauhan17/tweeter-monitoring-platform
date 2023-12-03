export interface userState{
    username:string
}



interface HomeAction {
    type: string,
    payload: string
}


const initialState:userState={
    username:"dummy"
};


const userReducer=(state:userState=initialState,action:HomeAction):userState=>{

switch(action.type){

    case "user/setUserName":
        return{
            ...state,
            username:action.payload
        }

    default:
        return state

}

}

export default userReducer;