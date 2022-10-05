import axios from "axios";
import React from "react";
import Header from "../../Components/Header/Header";
import { useEffect, useState } from 'react';
import requests from "../../Requests";


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
        <h1 className='PatientProfile--header'>Witaj na swoim profilu  {patientData.first_name}</h1>
    </div>
  );
}

export default PatientProfile;