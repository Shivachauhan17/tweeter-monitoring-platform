import React,{memo} from 'react';
import addDelActions from '../store/mainPage/popAddDelForms/addDelFormsActions';
import AddUserForm from './AddUserForm';
import DelUserForm from './DelUserForm';
import { RiAddBoxLine,RiDeleteBinLine } from "react-icons/ri";
import {useSelector,useDispatch} from 'react-redux';
import {RootState} from '../store/reducer';
import AddKeywordForm from './AddKeywordForm';
import DelKeywordForm from './DelKeywordForm';



const AddDelNew=()=>{
    const dispatch=useDispatch();
    
    const popAddUser=useSelector((state:RootState)=>state.addDel.popAddUser);
    const popDelUser=useSelector((state:RootState)=>state.addDel.popDelUser);
    const popAddKeyword=useSelector((state:RootState)=>state.addDel.popAddKeyword);
    const popDelKeyword=useSelector((state:RootState)=>state.addDel.popDelKeyword);
    return(
        <div className='userKeywordConfigure'>

    
        <div className='userKeywordConfigure__user'>
          <div>
            <RiAddBoxLine onClick={()=>{dispatch(addDelActions.popAddUser())}}/>
            <RiDeleteBinLine onClick={()=>{dispatch(addDelActions.popDelUser())}}/>
          </div>
          
          <p>Add/Delete user</p>
        </div>
        <div className='userKeywordConfigure__keyword'>
          <div>
            <RiAddBoxLine onClick={()=>{dispatch(addDelActions.popAddKeyword())}}/>
            <RiDeleteBinLine onClick={()=>{dispatch(addDelActions.popDelKeyword())}}/>
          </div>
          <p>Add/Delete key..</p>
        </div>
        {popAddUser?<AddUserForm/>:<p></p>}
        {popDelUser?<DelUserForm/>:<p></p>}
        {popAddKeyword?<AddKeywordForm/>:<p></p>}
        {popDelKeyword?<DelKeywordForm/>:<p></p>}
        {/* {popAddKeyword?<AddKeywordForm/>:<p></p>}
        {popDelKeyword?<DelKeywordForm/>:<p></p>} */}
      </div>
    );
}


export default memo(AddDelNew);