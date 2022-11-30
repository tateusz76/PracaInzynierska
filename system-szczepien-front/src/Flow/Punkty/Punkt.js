import axios from "axios";
import React from "react";
import Header from "../../Components/Header/Header";
import { useEffect, useState } from 'react';
import requests from "../../Requests";
import { Link, Navigate } from 'react-router-dom';
import instance from '../../Axios';
import GetPunkty from "../../Components/Punkt/GetPunkty";

const Punkt= () => {

  const [punktData, setPunktData] = useState([]);

    useEffect(() => {
      instance.get(requests.getPunkty , {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem("access")
          }
        })
        .then(function (response) {
          setPunktData(response.data);
        })
      }, []);

  const displayPunkty = punktData.map(e => {
    return <GetPunkty key={e.id} id={e.id} nazwa={e.nazwa} miasto={e.miasto} ulica={e.ulica} numer={e.numer}/>
  });
        

  return (
    <div className="Punkt">
        <Header></Header>
        {displayPunkty.length > 0 && <h1>Punkty</h1>}
        {displayPunkty.length > 0 ? displayPunkty : <h1>Brak dostępnych punktów w Twojej okolicy</h1>}
        
    </div>
  );
}

export default Punkt;