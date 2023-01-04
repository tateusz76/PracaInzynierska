import axios from "axios";
import React from "react";
import Header from "../../Components/Header/Header";
import { useEffect, useState } from 'react';
import requests from "../../Requests";
import { Link, Navigate } from 'react-router-dom';
import './PatientProfile.css';
import instance from '../../Axios';
import AdminHeader from "../../Components/Header/AdminHeader";
import PracownikHeader from "../../Components/Header/PracownikHeader";
import CzyZaszczepiony from "../../Components/CzyZaszczepiony/CzyZaszczepiony";


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


    {patientData.is_staff == true
      ? sessionStorage.setItem("isAdmin", "admin")
      : sessionStorage.setItem("isAdmin", "user")
    }

  useEffect(() => {
    instance.get(requests.pracownikList , {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem("access")
        }
      })
      .then(function (response) {
        {response.data && response.data.length == 1
          ? sessionStorage.setItem("isPracownik", "pracownik")
          : sessionStorage.setItem("isPracownik", "user")
        }
        sessionStorage.setItem("punkt", response.data[0].punkt);
      })
    }, []);


  return (
    <div className="PatientProfile">
      {sessionStorage.getItem("isAdmin") == "admin"
        ? <AdminHeader/>
        : 
        sessionStorage.getItem("isPracownik") == "pracownik"
        ? <PracownikHeader/>
        : <Header/>
      }
      
      <div className="profileContainer">
        <h1 className='PatientProfile--header'>Witaj na swoim profilu  {patientData.username}</h1>

        <h3>{patientData.first_name} {patientData.last_name}</h3>

        <Link  to='/patientEditProfile' className='navLink'><h2>Zmień nazwę użytkownika</h2></Link>
      </div>
      <CzyZaszczepiony/>
    </div>
  );
}

export default PatientProfile;