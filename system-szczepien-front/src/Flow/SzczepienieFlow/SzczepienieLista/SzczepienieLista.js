import axios from "axios";
import React from "react";
import Header from "../../../Components/Header/Header";
import { useEffect, useState } from 'react';
import requests from "../../../Requests";
import { Link, Navigate } from 'react-router-dom';
import instance from "../../../Axios";
import GetSzczepienie from "../../../Components/GetSzczepienie/GetSzczepienie";

const SzczepienieLista= () => {

  const [szczepienieData, setSzczepienieData] = useState([]);
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
        })
      }, []);

      const pastSzczepienia = szczepienieData ? szczepienieData.filter(e => {
        return e.dataSzczepienia < date;
      }) : null

      const nextSzczepienia = szczepienieData ? szczepienieData.filter(e => {
        return e.dataSzczepienia >= date;
      }) : null

      console.log(date);

    const displaySzczepienie = pastSzczepienia.map(e => {
        return <GetSzczepienie key={e.id} data={e.dataSzczepienia} szczepionka={e.szczepionka} punkt={e.punkt}/>
    });
            
    const displayNext = nextSzczepienia.map(e => {
        return <GetSzczepienie key={e.id} data={e.dataSzczepienia} szczepionka={e.szczepionka} punkt={e.punkt}/>
    });
        

  return (
    <div className="Punkt">
        <Header></Header>
        {displaySzczepienie.length > 0 && <h1>Historia Twoich szczepień</h1>}
        {displaySzczepienie.length > 0 ? displaySzczepienie : <h1>Brak historii szczepień</h1>}

        {displayNext.length > 0 && <h1>Nadchodzące szczepienie:</h1>}
        {displayNext.length > 0 ? displayNext : <h1>Brak nadchodzących szczepień</h1>}
        
    </div>
  );
}

export default SzczepienieLista;