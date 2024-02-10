import React,{memo} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import currentUserAction from '../store/mainPage/currentUser/currentUserActions';
import { RootState } from '../store/reducer';
import { RxCross1 } from "react-icons/rx";
import axios from '../axios/createAxios';
import addDelActions from '../store/mainPage/popAddDelForms/addDelFormsActions';
import cookies from '../components/Cookie';


const DelUserForm:React.FC=()=>{
    const dispatch=useDispatch();
    const cookie=cookies()
    const delKeyword=useSelector((state:RootState)=>state.currentUser.deleteKeyword);
    const handleKeywordDelSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const response=await axios.post('/deleteKeyword',{keywordToDel:delKeyword,admin_user:cookie.getUserCookie()});
        if(response.status===200){
            dispatch(addDelActions.popDelKeyword())
        }
    }

    const handleDelKeywordChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        dispatch(currentUserAction.setDelKeyword(e.target.value));
    }   

    return(
        <div className="signupBlock addDelBlock">
            <div className='addDelBlock__cross'>   
                <div  onClick={()=>{dispatch(addDelActions.popDelKeyword())}}>< RxCross1/></div>
            </div>
            
            <form className="signupBlock__form" onSubmit={handleKeywordDelSubmit}> 
                <input placeholder='Type keyword' className="signupBlock__form__input" value={delKeyword} onChange={handleDelKeywordChange}/>
                <button className="btn btn-outline-primary" type='submit'>DEL</button>
            </form>
        </div>
    );
};

export default memo(DelUserForm);