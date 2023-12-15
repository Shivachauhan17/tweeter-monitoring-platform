export interface LoginFormState{
    username:string,
    password:string
}


export interface LoginFormAction{
    type: string,
    payload: string
}


const initialState:LoginFormState={
    username:"",
    password:"",
};


const loginForm=(state:LoginFormState=initialState,action:LoginFormAction):LoginFormState=>{
    switch(action.type){
        case 'loginForm/setUserName':
            return{
                ...state,
                username:action.payload
            }

        case 'loginForm/setPassword':
            return{
                ...state,
                password:action.payload
            }
        
        default:
            return state
    };
};

export default loginForm;