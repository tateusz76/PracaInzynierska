import './App.css';
import axios from "axios";
import React from "react";
import AddSzczepionka from './Components/AddSzczepionka';
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import MainPage from './Components/MainPage';


function App() {
  return (
    <div className="App">
      <Routes>
            <Route path="*" element={<MainPage />} />
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="dodaj_szczepionke" element={<AddSzczepionka/>} />
      </Routes>
    </div>
  );
}

export default App;