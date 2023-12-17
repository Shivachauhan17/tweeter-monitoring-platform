import React,{memo,useEffect} from 'react';
import {Pie,PieChart,Tooltip} from 'recharts';
import { RiAddBoxLine,RiDeleteBinLine } from "react-icons/ri";
import {useSelector,useDispatch} from 'react-redux';
import {CurrentUser} from '../store/mainPage/currentUser/currentUserReducer';
import {RootState} from '../store/reducer';
import currentUserActions  from '../store/mainPage/currentUser/currentUserActions';
import cookies from '../components/Cookie';
import axios from '../axios/createAxios';

const CurrentPerson:React.FC=()=>{
  const cookie=cookies();
  const dispatch=useDispatch();
  const vioPercentage=useSelector((state:RootState)=>state.currentUser.violentPercentage);
  const nViolentPercentage=useSelector((state:RootState)=>state.currentUser.nViolentPercentage);


  const data= [{ name:"Violent",value:vioPercentage},{name:"Non Violent",value:nViolentPercentage}];
  const user=cookie.getUserCookie();
  
  const fetchUsers=async():Promise<void>=>{
    let response=await axios.get('/getMyAllTweets');
    console.log(response)

  }

  useEffect(()=>{
    fetchUsers()
  },[]);


  return(
      <div className='pcContainer'>
        <div className='CurrentUserName'>
          <h2>{} 's Stats</h2>
        </div>
        <div className='vNvStats'>
          <PieChart width={180} height={180}>
            <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data}
                  cx={85}
                  cy={70}
                  outerRadius={50}
                  fill='#6F00FF'
                  label
                />
              <Tooltip/>
          </PieChart>
          <div className='currentUserDefaut'>
            <h4>user Stats in last 24hrs</h4>
          </div>
          
        </div>
        <div className='userKeywordConfigure'>
          <div className='userKeywordConfigure__user'>
            <div>
              <RiAddBoxLine />
              <RiDeleteBinLine />
            </div>
            
            <p>Add/Delete user</p>
          </div>
          <div className='userKeywordConfigure__keyword'>
            <div>
              <RiAddBoxLine />
              <RiDeleteBinLine />
            </div>
            <p>Add/Delete key..</p>
          </div>
        </div>
          
      </div>
  )
}

export default memo(CurrentPerson);