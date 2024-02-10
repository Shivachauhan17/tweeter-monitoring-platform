import React,{memo} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import currentUserAction from '../store/mainPage/currentUser/currentUserActions';
import { RootState } from '../store/reducer';
import { RxCross1 } from "react-icons/rx";
import axios from '../axios/createAxios';
import addDelActions from '../store/mainPage/popAddDelForms/addDelFormsActions';
import cookies from '../components/Cookie';

const AddKeywordForm:React.FC=()=>{
    const cookie=cookies();
    const dispatch=useDispatch();
    const value=useSelector((state:RootState)=>state.currentUser.addKeyword);
    const addKeyword=useSelector((state:RootState)=>state.currentUser.addKeyword);
    const handleKeywordAddSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const response=await axios.post('/addKeyword',{keywordToAdd:addKeyword,admin_user:cookie.getUserCookie()});
        if(response.status===200)
            dispatch(addDelActions.popAddKeyword())
    }

    const handleAddKeywordChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        e.preventDefault();
        dispatch(currentUserAction.setAddKeyword(e.target.value));
    }   

    return(
        <div className="signupBlock addDelBlock">
            <div className='addDelBlock__cross'>   
                <div  onClick={()=>{dispatch(addDelActions.popAddKeyword())}}>< RxCross1/></div>
            </div>
            
            <form className="signupBlock__form" onSubmit={handleKeywordAddSubmit}> 
                <input placeholder='Type Keyword' className="signupBlock__form__input" value={value} onChange={handleAddKeywordChange}/>
                <button className="btn btn-outline-primary" type='submit'>ADD</button>
            </form>
        </div>
    );
};

export default memo(AddKeywordForm);