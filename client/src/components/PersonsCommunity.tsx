import React,{memo,useEffect} from 'react';
import Cookie from '../components/Cookie';
import axios from '../axios/createAxios';
import {useSelector,useDispatch} from 'react-redux';
import { RootState } from '../store/reducer';
import allMActions from '../store/mainPage/allMusers/allMuserActions';

const PersonsCommunity:React.FC=()=>{
    
    const dispatch=useDispatch();
    const persons=useSelector((state:RootState)=>state.allM.allUsers);

    const getMyMonitoringUsers=async()=>{
        const response=await axios.get('/getMyMonitoringUsers');
        dispatch(allMActions.setAllUsers(response.data.data));
    };

    useEffect(()=>{
        getMyMonitoringUsers();
    },[]);

    

    const communities=['web developer','data science']


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
                            <li key={index} className='pcList1__item'>
                                <img className="pcList1__img" src={item.profile}/>
                                <h4 className='pcList1__name'>{item.person}</h4>
                            </li>
                        )
                    })
                        }
                    </ul>
                </div>
                
                {/* <div className='pcContainer__headBlock'>
                    <h2 className='pcHeading'>
                        Keywords
                    </h2>
                    <ul className='pcList2'>{
                        communities.map((item,index)=>{
                            return(
                                <li key={index} className='pcList2__item'>
                                    <h4>{item}</h4>
                                </li>
                            )
                        })
                    }
                    </ul>
                </div> */}
            </div>
        </div>
    );
}

export default memo(PersonsCommunity);