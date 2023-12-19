import React,{memo} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import currentUserAction from '../store/mainPage/currentUser/currentUserActions';
import { RootState } from '../store/reducer';
import { RxCross1 } from "react-icons/rx";
import axios from '../axios/createAxios';
import addDelActions from '../store/mainPage/popAddDelForms/addDelFormsActions';

const DelUserForm:React.FC=()=>{
    const dispatch=useDispatch();
    const addKeyWord=useSelector((state:RootState)=>state.currentUser.addKeyword);
    const handleKeyWordAddSubmit=async()=>{
        await axios.post('/addKeyword',{keywordToAdd:addKeyWord});
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
            
            <form className="signupBlock__form" onSubmit={handleKeyWordAddSubmit}> 
                <input placeholder='Type username' className="signupBlock__form__input" value={addKeyWord} onChange={handleAddKeywordChange}/>
                <button className="btn btn-outline-primary" type='submit'>ADD</button>
            </form>
        </div>
    );
};

export default memo(DelUserForm);