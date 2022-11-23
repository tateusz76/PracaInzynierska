import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import axios from "axios";
import React from "react";
import requests from '../../Requests';

const Szczepienie = () => {

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


    const [formValue, setformValue] = React.useState({
        dataSzczepienia: '',
        szczepionka: '',
        punkt: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const szczepienieData = new FormData();
        szczepienieData.append("pacjent", patientData.username)
        szczepienieData.append("dataSzczepienia", formValue.dataSzczepienia)
        szczepienieData.append("szczepionka", formValue.szczepionka)
        szczepienieData.append("punkt", formValue.punkt)

        try {
        const response = await axios({
            method: "post",
            url: requests.rejestracjaSzczepienie,
            data: szczepienieData,
            headers: { "Content-Type": "application/json", Authorization: 'Bearer ' + localStorage.getItem("access") },
            
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
    <div className="szczepienieRegister">
    <Header></Header>
    <h1>Zarejestruj się na szczepienie</h1>

    <form onSubmit={handleSubmit}>
      <label> Data szczepienia:
        <input type="date" name="dataSzczepienia"  onChange={handleChange}/>
      </label>
      <label> Szczepionka:
        <input type="text" name="szczepionka"  onChange={handleChange}/>
      </label>
      <label> Punkt Szczepień:
        <input type="text" name="punkt"  onChange={handleChange}/>
      </label>
        <input type="submit" className='submitbtn' value="Wyślij" />
    </form>
  </div>
    )
}

export default Szczepienie;