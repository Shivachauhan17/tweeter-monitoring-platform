import React,{memo} from 'react';
import Cookie from '../components/Cookie';
import PersonsCommunity from '../components/PersonsCommunity';
import Logo from '../components/Logo';
import CurrentPerson from '../components/CurrentPerson';
import DataBlock from '../components/DataBlock';

const Main:React.FC=()=>{
    const cookie=Cookie();
    


    return(
        <div className=''>
            <Logo/>
            <div className='alignMainsCompo'>
                <CurrentPerson/>
                <DataBlock/>

                <PersonsCommunity/>
            </div>
        </div>
    );
}

export default memo(Main);