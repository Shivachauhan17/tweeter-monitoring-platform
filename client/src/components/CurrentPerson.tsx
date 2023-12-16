import React,{memo} from 'react';
import {Pie,PieChart,Tooltip} from 'recharts';
import { RiAddBoxLine,RiDeleteBinLine } from "react-icons/ri";


const CurrentPerson:React.FC=()=>{

      const data= [{ name:"Violent",value:30},{name:"Non Violent",value:70}]
      const user="jerry"
    return(
        <div className='pcContainer'>
          <div className='CurrentUserName'>
            <h2>{user} 's Stats</h2>
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