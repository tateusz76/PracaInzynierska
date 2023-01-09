import axios from "axios";
import React from "react";
import Header from "../../../Components/Header/Header";
import { useEffect, useState } from 'react';
import requests from "../../../Requests";
import { Link, useNavigate } from 'react-router-dom';
import instance from "../../../Axios";
import GetSzczepienie from "../../../Components/GetSzczepienie/GetSzczepienie";

const SzczepienieLista= () => {

  const navigate = useNavigate();

  const [szczepienieData, setSzczepienieData] = useState([]);
  const [firstDose, setFirstDose] = useState();
  const today = new Date();
  const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;


    useEffect(() => {
      instance.get(requests.getSzczepienie , {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem("access")
          }
        })
        .then(function (response) {
            setSzczepienieData(response.data);
            setFirstDose(response.data[0].id)
        })
      }, []);

      const pastSzczepienia = szczepienieData.filter(e => {
        return new Date(e.dataSzczepienia) < new Date(date);
      }) 

      const nextSzczepienia = szczepienieData.filter(e => {
        return new Date(e.dataSzczepienia) >= new Date(date);
      })
      

      const displaySzczepienie = pastSzczepienia.sort((a, b) => new Date(a.dataSzczepienia) - new Date(b.dataSzczepienia)).map(e => {
          return <GetSzczepienie key={e.id} data={e.dataSzczepienia} szczepionka={e.szczepionka} punkt={e.punkt}/>
      });
              
      const displayNext = nextSzczepienia.sort((a, b) => new Date(a.dataSzczepienia) - new Date(b.dataSzczepienia)).map(e => {
          return <GetSzczepienie key={e.id} data={e.dataSzczepienia} szczepionka={e.szczepionka} punkt={e.punkt}/>
      });

      const handleDelete = () => {
        instance.delete(`${requests.szczepienieDetail}${firstDose}`, {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem("access")
          }
        })
        instance.delete(`${requests.szczepienieDetail}${firstDose+1}`, {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem("access")
          }
        })
        instance.delete(`${requests.szczepienieDetail}${firstDose+2}`, {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem("access")
          }
        })

        navigate('/patientProfile');
        
    }


  return (
    <div className="Punkt">
        <Header></Header>
        <div className="SzczepieniaLista">
          {displaySzczepienie.length > 0 && <u><h1>Historia Twoich szczepień</h1></u>}
          {displaySzczepienie.length > 0 ? displaySzczepienie : <u><h1>Brak historii szczepień</h1></u>}

          {displayNext.length > 0 && <u><h1>Nadchodzące szczepienia:</h1></u>}
          {displayNext.length > 0 ? displayNext : <u><h1>Brak nadchodzących szczepień</h1></u>}
          
          {displaySzczepienie.length <= 0 && displayNext.length > 0 && <p>Jeśli nie otrzymałeś jeszcze pierwszej dawki, możesz anulować szczepienie w celu ponownej rejestracji lub wycofania się ze szczepienia.</p>}
          {displaySzczepienie.length <= 0 && displayNext.length > 0 && <button className="submitbtn" onClick={handleDelete}>Anuluj zapis na szczepienie</button>}
        </div>
    </div>
  );
}

export default SzczepienieLista;