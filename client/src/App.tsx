import React from 'react'
import {Route,Routes,BrowserRouter} from "react-router-dom";
import LoginSignup from './pages/LoginSignup';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Main from './pages/Main';
import './scss/main.scss';

const App:React.FC=()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup/>} />
        <Route path="/login_" element={<Login/>} />
        <Route path='/signup_' element={<Signup/>}/>
        <Route path="/home_" element={<Main/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
