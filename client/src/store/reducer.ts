import {combineReducers,Reducer} from "redux";
import userReducer,{userState,HomeAction} from './user/userReducer';
import loginFormReducer,{LoginFormState,LoginFormAction} from './loginForm/loginFormReducer';
import signupReducer,{SignupFormAction,SignupFormState} from './signupForm/signupReducer';
import currentUserReducer,{CurrentUser,currentUserAction} from "./mainPage/currentUser/currentUserReducer";
import addDelReducer,{AddDelState,AddDelAction} from "./mainPage/popAddDelForms/addDelFormsReducer";
import dateReducer,{DateAction,DATE} from "./mainPage/date/dateReducer";
import allMusersReducer,{AllM,AllMAction} from './mainPage/allMusers/allMusersReducer';

export interface RootState {
    user: userState, // Add more properties if you have additional reducers
    loginForm:LoginFormState,
    signupForm:SignupFormState,
    currentUser:CurrentUser,
    addDel:AddDelState,
    date: DATE,
    allM:AllM
};

const rootReducer:Reducer<RootState, AllMAction | DateAction | AddDelAction | HomeAction | LoginFormAction | SignupFormAction | currentUserAction>=combineReducers({
    user:userReducer,
    loginForm:loginFormReducer,
    signupForm:signupReducer,
    currentUser:currentUserReducer,
    addDel:addDelReducer,
    date:dateReducer,
    allM:allMusersReducer
})

export default rootReducer;
