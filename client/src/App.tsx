import React from 'react'
import {Route,Routes,BrowserRouter} from "react-router-dom";
import LoginSignup from './pages/LoginSignup';
import './scss/main.scss';

const App:React.FC=()=> {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginSignup/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
