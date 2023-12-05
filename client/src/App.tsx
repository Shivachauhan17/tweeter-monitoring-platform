import React from 'react'
import {Route,Routes,BrowserRouter} from "react-router-dom";
import LoginSignup from './pages/LoginSignup';
import Login from './pages/Login';
import './scss/main.scss';

const App:React.FC=()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
