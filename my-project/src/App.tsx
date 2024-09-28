import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import BodyHome from './components/BodyHome';

function App() {
  
  return (
    <div>
      <Navbar/>
      <Search/>
      <BodyHome/>
    </div>
  );
}

export default App;
