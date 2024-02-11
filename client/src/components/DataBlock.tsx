import React,{memo,useState,ChangeEvent, useEffect} from "react";
import { SlDislike,SlLike } from "react-icons/sl";
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../store/reducer";
import axios from "../axios/createAxios";
import dateActions from "../store/mainPage/date/dateActions";
import Cookie  from "../components/Cookie";
import currentUserActions  from '../store/mainPage/currentUser/currentUserActions';


const DataBlock:React.FC=()=>{
    const cookie=Cookie();
    const dispatch=useDispatch();
    const userdata=useSelector((state:RootState)=>state.currentUser.data);
    const startDate=useSelector((state:RootState)=>state.date.startDate);
    const endDate=useSelector((state:RootState)=>state.date.endDate);
    const page=useSelector((state:RootState)=>state.currentUser.page);
    const monitoringUser=useSelector((state:RootState)=>state.user.monitoringUser)
    const isUserMonitor=useSelector((state:RootState)=>state.currentUser.isUserMonitor)


    const [onlyViolents,setOnlyViolents]=useState(false)
    const handleStartDateChange=(e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(dateActions.setStartDate(e.target.value));

    };

    const handleEndDateChange=(e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(dateActions.setEndDate(e.target.value));

    };


    const handleFilterSubmit=async (e:React.FormEvent<HTMLFormElement>):Promise<void>=>{
        e.preventDefault();
        const response= await axios.post('/getDateFilteredTweets',
        {
            startDate:startDate,
            endDate:endDate,
            monitoringUser:monitoringUser,
            page:page,
            admin_user:cookie.getUserCookie()
        });

        // dispatch(currentUserActions.setData(response.data.data));

    };

    const handleViolentFilter=async ():Promise<void>=>{
        if(onlyViolents){

        const response= await axios.post('/violentFilterTweets',
        {
            isUserMonitor:isUserMonitor,
            monitoringUser:monitoringUser,
            page:page,
            admin_user:cookie.getUserCookie(),
            isViolent:onlyViolents
        });
        if(response.data.data!==null){
        dispatch(currentUserActions.setData(response.data.data));
        }
        else if(response.status===200){
            dispatch(currentUserActions.setData(response.data.data));
        }
        }
        else{
            const response=await axios.post('/getMyAllTweets',{isUserMonitor:isUserMonitor,page:page,monitoringUser:monitoringUser,admin_user:cookie.getUserCookie()});
        dispatch(currentUserActions.setData(response.data.data));
        }


    };

    useEffect(()=>{
        handleViolentFilter()
    },[onlyViolents,page])

    return(
    <div>
        <div className="dataPageNavigation">
            <div style={{border:'1px solid gainsboro',borderRadius:'4px',boxShadow:'2px 2px 10px gainsboro'}} onClick={()=>{dispatch(currentUserActions.dcrPage())}}>
            <IoIosArrowBack style={{fontSize:'2rem',fontWeight:'bolder'}} />
            </div>
            <div style={{border:'1px solid gainsboro',borderRadius:'4px',boxShadow:'2px 2px 10px gainsboro'}} onClick={()=>{dispatch(currentUserActions.incrPage())}}>
            <IoIosArrowForward style={{fontSize:'2rem',fontWeight:'bolder'}}  />
            </div>
        </div>
        <div className="mainBlock">
            <div className="mainBlock__filterBar">
                <button className="mainBlock__filterBar__vFilter"
                    onClick={()=>{setOnlyViolents(onlyViolents=>!onlyViolents)}}
                >
                    See Only Violents
                </button>
                {/* <form className="mainBlock__filterBar__dateFilter" onSubmit={handleFilterSubmit}>
                    <input 
                    placeholder="Start-Date"
                    type="datetime-local"
                    onChange={handleStartDateChange}
                    />
                    <input 
                    placeholder="End-Date"
                    type="datetime-local"
                    onChange={handleEndDateChange}
                    />
                    <button type="submit" className="mainBlock__filterBar__dateFilterButton">Filter</button>
                </form> */}
            </div>
            <ul className="mainBlock__contentArea">{
                userdata.map((item,index)=>{
                    return(
                        <li key={index} className="dataItem"> 
                            <div className="dataItem__nvLabel">
                                {
                                    item?.label=="violent"?
                                    (<h5 className="dataItem__nvLabel__vio">VIOLENT</h5>)
                                    :(<h5 className="dataItem__nvLabel__nvio">NON VIOLENT</h5>)
                                }
                            </div>
                            <div className="dataItem__tweet">
                                <p >{item?.tweet}</p>
                            </div>
                            <div className="dataItem__likeUnlike">
                                <SlLike className="dataItem__likeUnlike__l"  
                                onClick={
                                    async()=>{
                                        console.log('SlLike clicked');
                                        await axios.post('/right4al',{id:item.tweet_id});
                                    }
                                        }/>
                                <SlDislike className="dataItem__likeUnlike__l" onClick={
                                    async()=>{
                                        console.log('DisLike clicked');
                                        await axios.post('/reverse4al',{id:item.tweet_id});
                                    }
                                    }/>
                            </div>
                        </li>
                    )
                })
            
            }
            </ul>
        </div>
    </div>
    );
};


export default memo(DataBlock);