import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import axios from "axios";
import React from "react";
import requests from '../../Requests';
import './Szczepienie.css';
import instance from '../../Axios';
import MapComponent from '../../Components/Punkt/MapComponent';

const Szczepienie = () => {

    const navigate = useNavigate();

    const [patientData, setPatientData] = useState({});
    const [szczepionkaSelected, setSzczepionkaSelected] = useState();
    const [punktSelected, setPunktSelected] = useState();
    let [center, setCenter] = useState();
    const [errorMessage,setError]=useState();

    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

    const twoDose = ["AstraZeneca", "Novavax"];

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
           setformValue(prevValue => ({...prevValue, punkt: response.data[0].nazwa}));
           setCenter([response.data[0].centerX, response.data[0].centerY]);
         })
       }, []);

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
        if(formValue.dataSzczepienia < date)
        {
          setError('Wystąpił błąd. Upewnij się, że wybrałeś poprawną datę.');
        }
        else
        {
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

          if(formValue.dataSzczepienia == '')
          {
            setError('Wystąpił błąd. Upewnij się, że wybrałeś poprawną datę.');
          }
          else 
          {
            setError('');
            navigate('/szczepienieList');
          }

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

          if(!twoDose.includes(formValue.szczepionka))
          {
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
      }
    }
 
    const handleChange = (event) => {
      setSzczepionkaSelected(event.target.value);
      setformValue({
      ...formValue,
      [event.target.name]: event.target.value
      });
  }

    const handlePunktchange = (event) => {
      setPunktSelected(event.target.value);
      setformValue({
      ...formValue,
      [event.target.name]: event.target.value
      });

      let result = punkty.filter(e => {
        return e.nazwa === event.target.value;
      })

      setCenter([result[0].centerX, result[0].centerY])
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
      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>Zarejestruj się na szczepienie</h1>
      <div className="szczepienieRegister">
        <form className='szczepienieForm' onSubmit={handleSubmit}>
          <label><h3> Data szczepienia:</h3>
            <input className='formInput' type="date" name="dataSzczepienia" onChange={handleChange}/>
          </label>

          <label> <h3>Szczepionka:</h3>
          <select className='formInput' name='szczepionka' value={szczepionkaSelected} onChange={handleChange}>
              {szczepionki.map(e => (
                <option key={e.nazwaSzczepionki} value={e.nazwaSzczepionki} >
                  {e.nazwaSzczepionki}
                </option>
              ))}
            </select>
          </label>

          <label> <h3>Punkt Szczepień:</h3>
          <select className='formInput' name='punkt'  value={punktSelected} onChange={handlePunktchange}>
              {punkty.map(e => (
                <option key={e.nazwa} value={e.nazwa}>
                  {e.nazwa + " " + e.miasto + " ul. " + e.ulica + " " + e.numer}
                </option>
              ))}
            </select>
          </label>
            <input type="submit" className='submitbtn' value="Wyślij" />
            {errorMessage?<label className='error'>{errorMessage}</label>:null} 
            <h3>Szczepionka: {szczepionkaSelected}</h3>
            {twoDose.includes(szczepionkaSelected)
          ? <h3>Szczepienie będzie składało się<br/> z <u>dwóch</u> dawek szczepionki</h3>
          : <h3>Szczepienie będzie składało się<br/> z <u>trzech</u> dawek szczepionki</h3>
        }
        </form>
      </div>
      <div className='punktData'>
      <h3>Twój wybrany punkt szczepień: {punktSelected}</h3>
        <MapComponent center = {center}/>
      </div>
    </div>
    )
}

export default Szczepienie;