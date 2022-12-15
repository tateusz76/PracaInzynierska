import './App.css';
import React from "react";
import {useState } from 'react';
import AddSzczepionka from './Flow/AdminFlow/AddSzczepionka';
import {BrowserRouter as Router, Route, Routes, Link, useNavigate, useParams} from 'react-router-dom';
import Login from './Flow/Login/Login';
import Register from './Flow/Register/Register';
import Logout from './Flow/Login/Logout';
import PatientProfile from './Flow/PatientProfile/PatientProfile';
import PatientEditProfile from './Flow/PatientProfile/PatientProfileEdit/PatientProfileEdit';
import Punkt from './Flow/Punkty/Punkt';
import Szczepienie from './Flow/SzczepienieFlow/Szczepienie';
import SzczepienieLista from './Flow/SzczepienieFlow/SzczepienieLista/SzczepienieLista';
import PunktDetails from './Components/Punkt/PunktDetails';
import AddPunkt from './Flow/AdminFlow/AddPunkt';



function App() {
  let [isLoggedIn, setLoggedStatus] = useState();

    if(sessionStorage.getItem("access"))
    {
        isLoggedIn = true;
    }
    else
    {
      isLoggedIn = false;
    }
   

  

  return (
    <div className="App">
      <Routes>
            {isLoggedIn == false ? 
                <Route exact path="/*" element={<Login/>} /> :
                <Route path="/" element={<PatientProfile />} />}
            {/* <Route path="*" element={<MainPage />} />
            <Route exact path="/" element={<MainPage />} /> */}
            <Route exact path="login" element={<Login/>} />
            <Route exact path="register" element={<Register/>} />
            <Route exact path="logout" element={<Logout/>} />
            <Route exact path="patientProfile" element={<PatientProfile/>} />
            <Route exact path="patientEditProfile" element={<PatientEditProfile/>} />
            <Route exact path="punkt" element={<Punkt/>} />
            <Route exact path="rejestracjaSzczepienie" element={<Szczepienie/>} />
            <Route exact path="szczepienieList" element={<SzczepienieLista/>} />
            <Route exact path="punktDetails/:idPunkt" element={<PunktDetails/>} />

            {/* ADMIN */}
            <Route exact path="szczepionkaAdd" element={<AddSzczepionka/>} />
            <Route exact path="punktAdd" element={<AddPunkt/>} />

      </Routes>
    </div>
  );
}

export default App;