import './App.css';
import axios from "axios";
import React from "react";
import AddSzczepionka from './Components/AddSzczepionka';
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import MainPage from './Components/MainPage';
import Login from './Flow/Login/Login';
import Register from './Flow/Register/Register';
import Logout from './Flow/Login/Logout';
import PatientProfile from './Flow/PatientProfile/PatientProfile';
import PatientEditProfile from './Flow/PatientProfile/PatientProfileEdit/PatientProfileEdit';
import Punkt from './Components/Punkt/Punkt';
import Szczepienie from './Flow/SzczepienieFlow/Szczepienie';



function App() {
  return (
    <div className="App">
      <Routes>
            <Route path="*" element={<MainPage />} />
            <Route exact path="/" element={<MainPage />} />
            <Route exact path="dodajSzczepionke" element={<AddSzczepionka/>} />
            <Route exact path="login" element={<Login/>} />
            <Route exact path="register" element={<Register/>} />
            <Route exact path="logout" element={<Logout/>} />
            <Route exact path="patientProfile" element={<PatientProfile/>} />
            <Route exact path="patientEditProfile" element={<PatientEditProfile/>} />
            <Route exact path="punkt" element={<Punkt/>} />
            <Route exact path="rejestracjaSzczepienie" element={<Szczepienie/>} />
      </Routes>
    </div>
  );
}

export default App;