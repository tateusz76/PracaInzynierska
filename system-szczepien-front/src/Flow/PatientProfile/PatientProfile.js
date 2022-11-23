import axios from "axios";
import React from "react";
import Header from "../../Components/Header/Header";
import { useEffect, useState } from 'react';
import requests from "../../Requests";
import { Link, Navigate } from 'react-router-dom';
import './PatientProfile.css';
import instance from '../../Axios';


const PatientProfile= () => {

  const [patientData, setPatientData] = useState({});

  useEffect(() => {
    instance.get(requests.patientProfileGet , {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("access")
        }
      })
      .then(function (response) {
        console.log(response.data);
        setPatientData(response.data[0]);
      })
    }, []);
      

  return (
    <div className="PatientProfile">
      <Header></Header>
      <div className="profileContainer">
        <h1 className='PatientProfile--header'>Witaj na swoim profilu  {patientData.username}</h1>

        <h3>{patientData.first_name} {patientData.last_name}</h3>

        <Link  to='/patientEditProfile' className='navLink'><h2>Zmień nazwę użytkownika</h2></Link>
      </div>
    </div>
  );
}

export default PatientProfile;