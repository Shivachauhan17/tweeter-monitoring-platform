import React,{memo,useEffect,useState} from 'react';
import {Pie,PieChart,Tooltip} from 'recharts';
import { RiAddBoxLine,RiDeleteBinLine } from "react-icons/ri";
import {useSelector,useDispatch} from 'react-redux';
import {CurrentUser} from '../store/mainPage/currentUser/currentUserReducer';
import {RootState} from '../store/reducer';
import currentUserActions  from '../store/mainPage/currentUser/currentUserActions';
import cookies from '../components/Cookie';
import axios from '../axios/createAxios';
import AddDelNew from './AddDelNew';
import {setMonitoringUser} from '../store/user/userActions'


const CurrentPerson:React.FC=()=>{
  const cookie=cookies();
  const dispatch=useDispatch();
  const page=useSelector((state:RootState)=>state.currentUser.page);
  console.log(page)
  const vioPercentage=useSelector((state:RootState)=>state.currentUser.violentPercentage);
  const nViolentPercentage=useSelector((state:RootState)=>state.currentUser.nViolentPercentage);
  const data= [{ name:"Violent",value:vioPercentage},{name:"Non Violent",value:nViolentPercentage}];
  const monitoringUser=useSelector((state:RootState)=>state.user.monitoringUser)
  const getAllUser=async():Promise<void>=>{
    const response= await axios.post('/getAllUser',{username:cookie.getUserCookie()})
    if(response.data.data.length>0){
      dispatch(setMonitoringUser(response.data.data[0]))

    }
  }

  const fetchMonitoringUserData=async():Promise<void>=>{
    const response=await axios.post('/getMyAllTweets',{page:page,monitoringUser:monitoringUser,admin_user:cookie.getUserCookie()});
    dispatch(currentUserActions.setData(response.data.data));

  }

  const vNvPercentage=async()=>{
    const response=await axios.post('/get_vNvPercentage',{monitoringUser:monitoringUser,admin_user:cookie.getUserCookie()}) ;
    if(response.data.violent!==null && response.data.nViolent!==null){
      dispatch(currentUserActions.setViolentPercentage(response.data.violent));
      dispatch(currentUserActions.setNviolentPercentage(response.data.nViolent));
    }

  }

 
  useEffect(()=>{
    getAllUser();
  },[])

  useEffect(()=>{
    fetchMonitoringUserData()
    vNvPercentage()
  },[monitoringUser,page])



  return(
      <div className='pcContainer'>
        <div className='CurrentUserName'>
          <h4>{monitoringUser} 's Stats</h4>
        </div>
        <div className='vNvStats'>
          <PieChart width={150} height={150}>
            <Pie
                  dataKey="value"
                  isAnimationActive={false}
                  data={data}
                  cx={85}
                  cy={70}
                  outerRadius={37}
                  fill='#6F00FF'
                  label
                />
              <Tooltip/>
          </PieChart>
          <div className='currentUserDefaut'>
            <h6>user Stats in last 24hrs</h6>
          </div>
          
        </div>
        <AddDelNew/>
          
      </div>
  )
}

export default memo(CurrentPerson);