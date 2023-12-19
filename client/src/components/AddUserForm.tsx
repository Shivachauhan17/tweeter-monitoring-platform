import React,{memo} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import currentUserAction from '../store/mainPage/currentUser/currentUserActions';
import { RootState } from '../store/reducer';
import { RxCross1 } from "react-icons/rx";
import axios from '../axios/createAxios';
import addDelActions from '../store/mainPage/popAddDelForms/addDelFormsActions';

const AddUserForm:React.FC=()=>{
    const dispatch=useDispatch();
    const value=useSelector((state:RootState)=>state.currentUser.addUser);
    const addUser=useSelector((state:RootState)=>state.currentUser.addUser);
    const handleUserAddSubmit=async()=>{
        await axios.post('/addUser',{userToAdd:addUser});
    }

    const handleAddUserChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        dispatch(currentUserAction.setAddUser(e.target.value));
    }   

    return(
        <div className="signupBlock addDelBlock">
            <div className='addDelBlock__cross'>   
                <div  onClick={()=>{dispatch(addDelActions.popAddUser())}}>< RxCross1/></div>
            </div>
            
            <form className="signupBlock__form" onSubmit={handleUserAddSubmit}> 
                <input placeholder='Type username' className="signupBlock__form__input" value={value} onChange={handleAddUserChange}/>
                <button className="btn btn-outline-primary" type='submit'>ADD</button>
            </form>
        </div>
    );
};

export default memo(AddUserForm);