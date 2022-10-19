import axios from "axios";
import React from "react";
import Header from "../../Components/Header/Header";
import { useEffect, useState } from 'react';
import requests from "../../Requests";
import { Link, Navigate } from 'react-router-dom';


const PatientProfile= () => {

  const [patientData, setPatientData] = useState({});

  useEffect(() => {
    axios.get(requests.patientProfileGet , {
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
        <h1 className='PatientProfile--header'>Witaj na swoim profilu  {patientData.username}</h1>

        <h3>Imię {patientData.first_name}</h3>
        <h3>Nazwisko {patientData.last_name}</h3>

        <Link  to='/patientEditProfile' className='navLink'><h2>Edytuj profil</h2></Link>
    </div>
  );
}

export default PatientProfile;