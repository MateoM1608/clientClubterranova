import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './views/Login/Login'
import Inicio from './views/Inicio/Inicio';

function App() {



  return (
    <div className="App">

    <Routes>

      <Route path="/login"  element={<Login/>}/>
      <Route path="/*"  element={<Inicio/>}/>

    </Routes>

    </div>
  );
}

export default App;
