import {combineReducers,Reducer} from "redux";
import userReducer,{userState,HomeAction} from './user/userReducer';
import loginFormReducer,{LoginFormState,LoginFormAction} from './loginForm/loginFormReducer';
import signupReducer,{SignupFormAction,SignupFormState} from './signupForm/signupReducer';

export interface RootState {
    user: userState, // Add more properties if you have additional reducers
    loginForm:LoginFormState,
    signupForm:SignupFormState
};

const rootReducer:Reducer<RootState,HomeAction | LoginFormAction | SignupFormAction>=combineReducers({
    user:userReducer,
    loginForm:loginFormReducer,
    signupForm:signupReducer
})

export default rootReducer;
