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
  const page=useSelector((state:RootState)=>state.currentUser.page);
  const vioPercentage=useSelector((state:RootState)=>state.currentUser.violentPercentage);
  const nViolentPercentage=useSelector((state:RootState)=>state.currentUser.nViolentPercentage);
  const tweetData=useSelector((state:RootState)=>state.currentUser.data);

  const data= [{ name:"Violent",value:vioPercentage},{name:"Non Violent",value:nViolentPercentage}];
  const monitoringUser=cookie.getMonitoringUserCookie();

  const fetchMonitoringUserData=async():Promise<void>=>{
    const response=await axios.post('/getMyAllTweets',{page:page,monitoringUser:monitoringUser});
    dispatch(currentUserActions.setData(response.data.data));

  }

  const vNvPercentage=async()=>{
    const response=await axios.post('/get_vNvPercentage',{monitoringUser:monitoringUser}) ;
    dispatch(currentUserActions.setViolentPercentage(response.data.violent));
    dispatch(currentUserActions.setNviolentPercentage(response.data.nViolent));
  }

  useEffect(()=>{
    fetchMonitoringUserData();
    vNvPercentage();
  },[]);


  return(
      <div className='pcContainer'>
        <div className='CurrentUserName'>
          <h2>{monitoringUser} 's Stats</h2>
        </div>
        <div className='vNvStats'>
          <PieChart width={180} height={180}>
            <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data}
                  cx={85}
                  cy={80}
                  outerRadius={45}
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