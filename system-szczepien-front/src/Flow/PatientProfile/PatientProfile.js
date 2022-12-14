import axios from "axios";
import React from "react";
import Header from "../../Components/Header/Header";
import { useEffect, useState } from 'react';
import requests from "../../Requests";
import { Link, Navigate } from 'react-router-dom';
import './PatientProfile.css';
import instance from '../../Axios';
import AdminHeader from "../../Components/Header/AdminHeader";


const PatientProfile= () => {

  const [patientData, setPatientData] = useState({});

  useEffect(() => {
    instance.get(requests.patientProfileGet , {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem("access")
        }
      })
      .then(function (response) {
        setPatientData(response.data[0]);  
      })
    }, []);

    //console.log(patientData);

    {patientData.is_staff == true
      ? sessionStorage.setItem("isAdmin", "admin")
      : sessionStorage.setItem("isAdmin", "user")
    }

  return (
    <div className="PatientProfile">
      {sessionStorage.getItem("isAdmin") == "admin"
        ? <AdminHeader/>
        : <Header/>
      }
      <div className="profileContainer">
        <h1 className='PatientProfile--header'>Witaj na swoim profilu  {patientData.username}</h1>

        <h3>{patientData.first_name} {patientData.last_name}</h3>

        <Link  to='/patientEditProfile' className='navLink'><h2>Zmień nazwę użytkownika</h2></Link>
      </div>
    </div>
  );
}

export default PatientProfile;