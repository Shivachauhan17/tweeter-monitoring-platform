import React,{memo} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import currentUserAction from '../store/mainPage/currentUser/currentUserActions';
import { RootState } from '../store/reducer';
import { RxCross1 } from "react-icons/rx";
import axios from '../axios/createAxios';
import addDelActions from '../store/mainPage/popAddDelForms/addDelFormsActions';

const DelUserForm:React.FC=()=>{
    const dispatch=useDispatch();
    const delUser=useSelector((state:RootState)=>state.currentUser.deleteUser);
    const handleUserDelSubmit=async()=>{
        await axios.post('/deleteUser',{userToDel:delUser});
    }

    const handleDelUserChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        dispatch(currentUserAction.setDelUser(e.target.value));
    }   

    return(
        <div className="signupBlock addDelBlock">
            <div className='addDelBlock__cross'>   
                <div  onClick={()=>{dispatch(addDelActions.popDelUser())}}>< RxCross1/></div>
            </div>
            
            <form className="signupBlock__form" onSubmit={handleUserDelSubmit}> 
                <input placeholder='Type username' className="signupBlock__form__input" value={delUser} onChange={handleDelUserChange}/>
                <button className="btn btn-outline-primary" type='submit'>DEL</button>
            </form>
        </div>
    );
};

export default memo(DelUserForm);