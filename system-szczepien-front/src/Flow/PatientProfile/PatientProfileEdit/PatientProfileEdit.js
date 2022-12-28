import axios from "axios";
import React from "react";
import Header from "../../../Components/Header/Header";
import AdminHeader from "../../../Components/Header/AdminHeader";
import requests from "../../../Requests";
import instance from '../../../Axios';
import '../PatientProfile.css';

const PatientEditProfile= () => {

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
                : <Header/>
            }
        <div className="EditForm">
          <h1 className='PatientEditProfile--header'>Edycja profilu</h1>
          <form onSubmit={handleSubmit}>
              <label> Nazwa użytkownika:
                  <input type="text" name="username"  onChange={handleChange}/>
              </label>
              <input type="submit" className='submitbtn' value="Wyślij" />
          </form>
        </div>
    </div>
  );

}

export default PatientEditProfile;