import './App.css';
import React from "react";
import {useState } from 'react';
import AddSzczepionka from './Flow/AdminFlow/AddSzczepionka';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
import SzczepieniaByPunkt from './Flow/PracownikFlow/SzczepieniaByPunkt';
import PacjentList from './Flow/PracownikFlow/PacjentList/PacjentList';
import SzczepieniaToday from './Flow/PracownikFlow/SzczepieniaToday';
import EditPunkt from './Flow/AdminFlow/EditPunkt';
import SendPassword from './Flow/Login/SendPassword/SendPassword';
import PasswordSendInfo from './Flow/Login/SendPassword/PasswordSendInfo';
import Contact from './Flow/Contact/Contact';



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
            {/* All */}
            {isLoggedIn == false ? 
                <Route exact path="/*" element={<Login/>} /> :
                <Route path="/" element={<PatientProfile />} />}
            <Route exact path="login" element={<Login/>} />
            <Route exact path="register" element={<Register/>} />
            <Route exact path="logout" element={<Logout/>} />
            <Route exact path="sendPassword" element={<SendPassword/>} />
            <Route exact path="passwordSendInfo" element={<PasswordSendInfo/>} />
            <Route exact path="contact" element={<Contact/>} />

            {/* Pacjent */}
            <Route exact path="patientProfile" element={<PatientProfile/>} />
            <Route exact path="patientEditProfile" element={<PatientEditProfile/>} />
            <Route exact path="punkt" element={<Punkt/>} />
            <Route exact path="rejestracjaSzczepienie" element={<Szczepienie/>} />
            <Route exact path="szczepienieList" element={<SzczepienieLista/>} />
            <Route exact path="punktDetails/:idPunkt" element={<PunktDetails/>} />

            {/* ADMIN */}
            <Route exact path="szczepionkaAdd" element={<AddSzczepionka/>} />
            <Route exact path="punktAdd" element={<AddPunkt/>} />
            <Route exact path="punktEdit/:idPunkt" element={<EditPunkt/>} />

            {/* PRACOWNIK */}
            <Route exact path="szczepieniePunkt" element={<SzczepieniaByPunkt/>} />
            <Route exact path="szczepieniaToday" element={<SzczepieniaToday/>} />
            <Route exact path="pacjentList" element={<PacjentList/>} />

      </Routes>
    </div>
  );
}

export default App;