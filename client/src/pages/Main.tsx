import React,{memo} from 'react';
import Cookie from '../components/Cookie';
import PersonsCommunity from '../components/PersonsCommunity';
import Logo from '../components/Logo';
import CurrentPerson from '../components/CurrentPerson';

const Main:React.FC=()=>{
    const cookie=Cookie();
    


    return(
        <div className=''>
            <Logo/>
            <div className='alignMainsCompo'>
                <CurrentPerson/>
                <PersonsCommunity/>

            </div>
        </div>
    );
}

export default memo(Main);