import axios from "axios";
import React from "react";
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import Header from "../../Components/Header/Header";


function PatientProfile() {
  return (
    <div className="PatientProfile">
        <Header></Header>
        <h1 className='PatientProfile--header'>NAME's profile</h1>
        <h2 className='PatientProfile--h2'>Andrzej</h2>   
        <h2 className='PatientProfile--h2'>Testowy</h2>
        <h2 className='PatientProfile--h2'>123456789</h2>   
        <h2 className='PatientProfile--h2'>Moderna</h2>
    </div>
  );
}

export default PatientProfile;