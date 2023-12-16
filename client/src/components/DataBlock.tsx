import React,{memo,useState} from "react";
import { SlDislike,SlLike } from "react-icons/sl";
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";


const DataBlock:React.FC=()=>{
    const [vioFilter,setVioFilter]=useState(false);

    const userdata=[
        {
            tweet:"Among the billions of tweets, what manages to grab people’s attention the most?Below is a list of the 20 most retweeted tweets which tells us what tweeters love to share – the list even highlights some huge historical moments.            ",
            profile_pic:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.anychart.com%2Fblog%2Fwp-content%2Fuploads%2F2017%2F11%2Fjs-pie-chart.gif&tbnid=ETQq3uAtX0CFhM&vet=12ahUKEwiyjfXNq5SDAxUKcmwGHaiHBKIQMygCegQIARBR..i&imgrefurl=https%3A%2F%2Fwww.anychart.com%2Fblog%2F2017%2F12%2F06%2Fpie-chart-create-javascript%2F&docid=nUMD0S2wpxMVMM&w=945&h=468&q=make%20a%20pie%20chart%20in%20javascript%20medium&client=ubuntu-chr&ved=2ahUKEwiyjfXNq5SDAxUKcmwGHaiHBKIQMygCegQIARBR",
            tweet_id:"1",
            label:"violent"
        },
        {
            tweet:"Among the billions of tweets, what manages to grab people’s attention the most?Below is a list of the 20 most retweeted tweets which tells us what tweeters love to share – the list even highlights some huge historical moments.            ",
            profile_pic:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.anychart.com%2Fblog%2Fwp-content%2Fuploads%2F2017%2F11%2Fjs-pie-chart.gif&tbnid=ETQq3uAtX0CFhM&vet=12ahUKEwiyjfXNq5SDAxUKcmwGHaiHBKIQMygCegQIARBR..i&imgrefurl=https%3A%2F%2Fwww.anychart.com%2Fblog%2F2017%2F12%2F06%2Fpie-chart-create-javascript%2F&docid=nUMD0S2wpxMVMM&w=945&h=468&q=make%20a%20pie%20chart%20in%20javascript%20medium&client=ubuntu-chr&ved=2ahUKEwiyjfXNq5SDAxUKcmwGHaiHBKIQMygCegQIARBR",
            tweet_id:"1",
            label:"non_violent"
        },
        {
            tweet:"Among the billions of tweets, what manages to grab people’s attention the most?Below is a list of the 20 most retweeted tweets which tells us what tweeters love to share – the list even highlights some huge historical moments.            ",
            profile_pic:"https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.anychart.com%2Fblog%2Fwp-content%2Fuploads%2F2017%2F11%2Fjs-pie-chart.gif&tbnid=ETQq3uAtX0CFhM&vet=12ahUKEwiyjfXNq5SDAxUKcmwGHaiHBKIQMygCegQIARBR..i&imgrefurl=https%3A%2F%2Fwww.anychart.com%2Fblog%2F2017%2F12%2F06%2Fpie-chart-create-javascript%2F&docid=nUMD0S2wpxMVMM&w=945&h=468&q=make%20a%20pie%20chart%20in%20javascript%20medium&client=ubuntu-chr&ved=2ahUKEwiyjfXNq5SDAxUKcmwGHaiHBKIQMygCegQIARBR",
            tweet_id:"1",
            label:"non_violent"
        }
    ];

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
                    value=""
                    type="date"
                    />
                    <input 
                    placeholder="End-Date"
                    value=""
                    type="date"
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
                                <SlLike />
                                <SlDislike />
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