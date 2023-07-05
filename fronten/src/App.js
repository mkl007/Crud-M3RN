// import React, { useState } from 'react'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Login } from './Components/Login';
import './index.css';


function App() {
  // const [isOnline, setIsOnline] = useState(false);
// 
  return (
    <div className='container'>
      <h1>Notes CRUD</h1>
      <Login/>
    </div>
  );
}

export default App;