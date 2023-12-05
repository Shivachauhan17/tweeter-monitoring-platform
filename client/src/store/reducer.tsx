import {combineReducers,Reducer} from "redux";
import userReducer,{userState} from './userReducer';

export interface RootState {
    user: userState // Add more properties if you have additional reducers
  }

const rootReducer:Reducer<RootState>=combineReducers<RootState>({
    user:userReducer,
})

export default rootReducer;
