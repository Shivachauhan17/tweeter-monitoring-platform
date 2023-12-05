import React,{memo} from "react";
import logo from '../assets/logo.jpg';


const Logo:React.FC=()=>{
    return(
        <div className="lspage__logo">
            <img className="lspage__logo__img" src={logo}/>
            <h2 className="lspage__logo__title">JodView</h2>
        </div>
    );
};

export default memo(Logo);

