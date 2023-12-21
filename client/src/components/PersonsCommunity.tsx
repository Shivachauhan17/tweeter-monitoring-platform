import React,{memo} from 'react';
import Cookie from '../components/Cookie';


const PersonsCommunity:React.FC=()=>{
    const persons=[
        {profile:"data:image/jpeg;base64,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",
        person:"jerry"
            },
            {profile:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREuDxna5eb_oEQ-DvVlAXnl8TYyhQvM2WnUw&usqp=CAU",
            person:"john"},
            
        ]

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