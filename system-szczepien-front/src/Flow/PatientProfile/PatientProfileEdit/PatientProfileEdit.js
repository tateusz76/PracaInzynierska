import React from "react";
import Header from "../../../Components/Header/Header";
import AdminHeader from "../../../Components/Header/AdminHeader";
import PracownikHeader from "../../../Components/Header/PracownikHeader";
import requests from "../../../Requests";
import instance from '../../../Axios';
import { Link, useNavigate } from 'react-router-dom';
import '../PatientProfile.css';

const PatientEditProfile= () => {
    const navigate = useNavigate();

    const [formValue, setformValue] = React.useState({
        username: '',
      });

      const handleSubmit = async(e) => {
        e.preventDefault();
        const userData = new FormData();
        userData.append("username", formValue.username)
    
        try {
          const response = await instance({
            method: "put",
            url: requests.editPatientProfile,
            data: userData,
            headers: { "Content-Type": "application/json", "Authorization":  'Bearer ' + sessionStorage.getItem("access") },
          })
        } catch(error) {
          console.log(error)
        }

        navigate("/patientProfile");
      }

    const handleChange = (event) => {
        setformValue({
          ...formValue,
          [event.target.name]: event.target.value
        });
    }
      

  return (
    <div className="PatientProfileEdit">
        {sessionStorage.getItem("isAdmin") == "admin"
        ? <AdminHeader/>
        : 
        sessionStorage.getItem("isPracownik") == "pracownik"
        ? <PracownikHeader/>
        : <Header/>
      }
        <div className="EditForm">
          <h1 className='PatientEditProfile--header'>Edycja profilu</h1>
          <form onSubmit={handleSubmit}>
              <label className="editLabel"> Zmień nazwę użytkownika:
                  <input type="text" name="username"  onChange={handleChange}/><br/>
              </label>
              <input type="submit" className='submitbtn' value="Wyślij" />
          </form>
          <Link  to='/sendPassword'><h1>Zmień hasło</h1></Link>
        </div>
    </div>
  );

}

export default PatientEditProfile;