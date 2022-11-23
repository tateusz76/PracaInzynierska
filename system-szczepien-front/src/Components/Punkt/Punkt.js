import axios from "axios";
import React from "react";
import Header from "../../Components/Header/Header";
import { useEffect, useState } from 'react';
import requests from "../../Requests";
import { Link, Navigate } from 'react-router-dom';
import GetPunkt from "./GetPunkt";


const Punkt= () => {

    const [punktData, setPunktData] = useState({});

    useEffect(() => {
        axios.get(requests.getPunkty)
        .then(response => setPunktData(response.data));
      }, [])
 
      console.log(punktData);

    const punktList = punktData.map(punkt => {
        return <GetPunkt key={punkt.id} id={punkt.id} nazwa={punkt.nazwa}/>
      })

  return (
    <div className="Punkt">
        <Header></Header>
        <p className='punktNazwa'></p>
        {punktList}
    </div>
  );
}

export default Punkt;