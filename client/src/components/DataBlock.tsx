import React,{memo,useState,ChangeEvent} from "react";
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
            monitoringUser:cookie.getMonitoringUserCookie(),
            page:page
        });

        dispatch(currentUserActions.setData(response.data.data));

    };

    const handleViolentFilter=async ():Promise<void>=>{
        const response= await axios.post('/violentFilterTweets',
        {

            monitoringUser:cookie.getMonitoringUserCookie(),
            page:page
        });

        dispatch(currentUserActions.setData(response.data.data));

    };

    return(
    <div>
        <div className="dataPageNavigation">
            <IoIosArrowBack/>
            <IoIosArrowForward/>
        </div>
        <div className="mainBlock">
            <div className="mainBlock__filterBar">
                <button className="mainBlock__filterBar__vFilter"
                    onClick={handleViolentFilter}
                >
                    See Only Violents
                </button>
                <form className="mainBlock__filterBar__dateFilter" onSubmit={handleFilterSubmit}>
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
                </form>
            </div>
            <ul className="mainBlock__contentArea">{
                userdata.map((item,index)=>{
                    return(
                        <li key={index} className="dataItem"> 
                            <div className="dataItem__nvLabel">
                                {
                                    item.label=="violent"?
                                    (<h5 className="dataItem__nvLabel__vio">VIOLENT</h5>)
                                    :(<h5 className="dataItem__nvLabel__nvio">NON VIOLENT</h5>)
                                }
                            </div>
                            <div className="dataItem__tweet">
                                <p >{item.tweet}</p>
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