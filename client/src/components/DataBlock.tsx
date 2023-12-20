import React,{memo,useState,ChangeEvent} from "react";
import { SlDislike,SlLike } from "react-icons/sl";
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../store/reducer";
import axios from "../axios/createAxios";
import dateActions from "../store/mainPage/date/dateActions";

const DataBlock:React.FC=()=>{
    const dispatch=useDispatch();
    const [vioFilter,setVioFilter]=useState(false);
    const userdata=useSelector((state:RootState)=>state.currentUser.data);
    const startDate=useSelector((state:RootState)=>state.date.startDate);
    console.log(startDate);
    const endDate=useSelector((state:RootState)=>state.date.endDate);
    console.log(endDate);

    const handleStartDateChange=(e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(dateActions.setStartDate(e.target.value));

    }

    const handleEndDateChange=(e:ChangeEvent<HTMLInputElement>)=>{
        dispatch(dateActions.setEndDate(e.target.value));

    }
    return(
    <div>
        <div className="dataPageNavigation">
            <IoIosArrowBack/>
            <IoIosArrowForward/>
        </div>
        <div className="mainBlock">
            <div className="mainBlock__filterBar">
                <button className="mainBlock__filterBar__vFilter"
                    onClick={()=>{setVioFilter(!vioFilter)}}
                >
                    {vioFilter?("See Only Non-Vio.."):"See Only Violents"}
                </button>
                <form className="mainBlock__filterBar__dateFilter">
                    <input 
                    placeholder="Start-Date"
                    value={startDate}
                    type="date"
                    onChange={handleStartDateChange}
                    />
                    <input 
                    placeholder="End-Date"
                    value={endDate}
                    type="date"
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