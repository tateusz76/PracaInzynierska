import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import axios from "axios";
import React from "react";
import requests from '../../Requests';
import './Szczepienie.css';
import instance from '../../Axios';

const Szczepienie = () => {

    const [patientData, setPatientData] = useState({});

    //pobranie danych pacjenta
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
      
      // pobranie listy szczepionek
      const [szczepionki, setSzczepionki] = useState([]);
      
      useEffect(() => {
        instance.get(requests.szczepionki , {
           headers: {
             Authorization: 'Bearer ' + sessionStorage.getItem("access")
            }
          })
         .then(function (response) {
           setSzczepionki(response.data);
           setSzczepionkaSelected(response.data[0].nazwaSzczepionki);
           setformValue(prevValue => ({...prevValue, szczepionka: response.data[0].nazwaSzczepionki}))
          })
       }, []);

       // pobranie listy punktów szczepień
     const [punkty, setPunkty] = useState([]);
 
     useEffect(() => {
       instance.get(requests.getPunkty , {
           headers: {
             Authorization: 'Bearer ' + sessionStorage.getItem("access")
           }
         })
         .then(function (response) {
           setPunkty(response.data);
           setPunktSelected(response.data[0].nazwa);
           setformValue(prevValue => ({...prevValue, punkt: response.data[0].nazwa}))
         })
       }, []);

      const [szczepionkaSelected, setSzczepionkaSelected] = useState();
      const [punktSelected, setPunktSelected] = useState();

    //blank dane do formularza
    const [formValue, setformValue] = React.useState({
        dataSzczepienia: '',
        szczepionka: '',
        punkt: '',
    });

    //handle submit do formularza
    const handleSubmit = (e) => {
        e.preventDefault();
        const szczepienieData = new FormData();
        szczepienieData.append("pacjent", patientData.username)
        szczepienieData.append("dataSzczepienia", formValue.dataSzczepienia)
        szczepienieData.append("szczepionka", formValue.szczepionka)
        szczepienieData.append("punkt", formValue.punkt)

        const secondDate = new Date(formValue.dataSzczepienia);
        secondDate.setDate(secondDate.getDate() + 14);
        const szczepienieSecond = new FormData();
        szczepienieSecond.append("pacjent", patientData.username)
        szczepienieSecond.append("dataSzczepienia", formatDate(secondDate))
        szczepienieSecond.append("szczepionka", formValue.szczepionka)
        szczepienieSecond.append("punkt", formValue.punkt)

        const thirdDate = new Date(formValue.dataSzczepienia);
        thirdDate.setDate(thirdDate.getDate() + 28);
        const szczepienieThird = new FormData();
        szczepienieThird.append("pacjent", patientData.username)
        szczepienieThird.append("dataSzczepienia", formatDate(thirdDate))
        szczepienieThird.append("szczepionka", formValue.szczepionka)
        szczepienieThird.append("punkt", formValue.punkt)

        //request do wysłania formularza
        try {
        const response = instance({
            method: "post",
            url: requests.rejestracjaSzczepienie,
            data: szczepienieData,
            headers: { "Content-Type": "application/json", Authorization: 'Bearer ' + sessionStorage.getItem("access") },
            
        })
        } catch(error) {
        console.log();
        }

        try {
          const response = instance({
              method: "post",
              url: requests.rejestracjaSzczepienie,
              data: szczepienieSecond,
              headers: { "Content-Type": "application/json", Authorization: 'Bearer ' + sessionStorage.getItem("access") },
              
          })
          } catch(error) {
          console.log();
          }

          try {
            const response = instance({
                method: "post",
                url: requests.rejestracjaSzczepienie,
                data: szczepienieThird,
                headers: { "Content-Type": "application/json", Authorization: 'Bearer ' + sessionStorage.getItem("access") },
                
            })
            } catch(error) {
            console.log();
            }
    }
 
    const handleChange = (event) => {
      setSzczepionkaSelected(event.target.value);
      setPunktSelected(event.target.value);
      setformValue({
      ...formValue,
      [event.target.name]: event.target.value
      });
  }

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  return (
    <div className="szczepienie">
      <Header></Header>
      <div className="szczepienieRegister">
        <h1>Zarejestruj się na szczepienie</h1>
        <form className='szczepienieForm' onSubmit={handleSubmit}>
          <label> Data szczepienia:
            <input type="date" name="dataSzczepienia" onChange={handleChange}/>
          </label>

          <label> Szczepionka:
          <select name='szczepionka' value={szczepionkaSelected} onChange={handleChange}>
              {szczepionki.map(e => (
                <option key={e.nazwaSzczepionki} value={e.nazwaSzczepionki} >
                  {e.nazwaSzczepionki}
                </option>
              ))}
            </select>
          </label>

          <label> Punkt Szczepień:
          <select name='punkt'  value={punktSelected} onChange={handleChange}>
              {punkty.map(e => (
                <option key={e.nazwa} value={e.nazwa}>
                  {e.nazwa}
                </option>
              ))}
            </select>
            
            {/* <input type="text" name="punkt"  onChange={handleChange}/> */}
          </label>
            <input type="submit" className='submitbtn' value="Wyślij" />
        </form>
      </div>
    </div>
    )
}

export default Szczepienie;