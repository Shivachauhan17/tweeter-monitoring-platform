export interface SignupFormState{
    username:string,
    password:string,
    confirm_password:string
}


export interface SignupFormAction{
    type: string,
    payload: string
}


const initialState:SignupFormState={
    username:"",
    password:"",
    confirm_password:""
};


const loginForm=(state:SignupFormState=initialState,action:SignupFormAction):SignupFormState=>{
    switch(action.type){
        case 'signup/setUserName':
            return{
                ...state,
                username:action.payload
            }

        case 'signup/setPassword':
            return{
                ...state,
                password:action.payload
            }

        case 'signup/setConfirmPassword':
            return{
                ...state,
                confirm_password:action.payload
            }

        default:
            return state
    };
};

export default loginForm;