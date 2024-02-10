import React,{memo,useEffect} from 'react';
import Cookie from '../components/Cookie';
import axios from '../axios/createAxios';
import {useSelector,useDispatch} from 'react-redux';
import { RootState } from '../store/reducer';
import allMActions from '../store/mainPage/allMusers/allMuserActions';
import {setMonitoringUser} from '../store/user/userActions'
import currentUserAction from '../store/mainPage/currentUser/currentUserActions';

const PersonsCommunity:React.FC=()=>{
    
    const dispatch=useDispatch();
    const persons=useSelector((state:RootState)=>state.allM.allUsers);
    const keywords=useSelector((state:RootState)=>state.currentUser.allKeywords)
    console.log(keywords)
    const cookie=Cookie()

    const getMyMonitoringUsers=async()=>{
        const response=await axios.post('/getMyMonitoringUsers',{admin_user:cookie.getUserCookie()});
        dispatch(allMActions.setAllUsers(response.data.data));
    };

    const getAllMyKeywords=async()=>{
        const response=await axios.post('/getAllKeywords',{admin_user:cookie.getUserCookie()})
        if(response.data.data!==null){
            dispatch(currentUserAction.setAllKeywords(response.data.data))
        }

    }

    useEffect(()=>{
        getMyMonitoringUsers();
        getAllMyKeywords()
    },[]);

    



    return(
        <div>

            <div className='pcContainer' >
                <div className='pcContainer__headBlock'>
                    <h2 className='pcHeading'>
                        Persons
                    </h2>
                    <ul className='pcList1'>
                    {
                    persons.map((item,index)=>{
                        return(
                            <li onClick={()=>{dispatch(setMonitoringUser(item?.person))}}  key={index} className='pcList1__item'>
                                <img className="pcList1__img" src={item?.profile}/>
                                <h4  className='pcList1__name'>{item.person}</h4>
                            </li>
                        )
                    })
                        }
                    </ul>
                </div>
                
                <div className='pcContainer__headBlock' style={{overflowY:'auto'}}>
                    <h2 className='pcHeading'>
                        Keywords
                    </h2>
                    <ul className='pcList2' style={{margin:'0 auto'}}>{
                        keywords.map((item,index)=>{
                            return(
                                <li key={index} className='pcList2__item'>
                                    <h4>{item}</h4>
                                </li>
                            )
                        })
                    }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default memo(PersonsCommunity);