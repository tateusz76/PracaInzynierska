import axios from "axios";
import React from "react";
import Header from "../Header/Header";
import { useEffect, useState } from 'react';
import requests from "../../Requests";
import { Link, useNavigate } from 'react-router-dom';
// import { Tooltip } from '@mui/material/';


const GetPunkt= ({nazwa, id}) => {

    const navigate = useNavigate();

    const openPunktData = () => { 
        sessionStorage.setItem('currentPunkt', id);
        //navigate('/punktDetails');
    };

  return (
    <div className="Punkt">
        <Header></Header>
        {/* <Tooltip title={`Wyświetl informacje o punkcie szczepień ${nazwa}`}> */}
      <div className='punktDataContainer' onClick={openPunktData}>
        <div className='punktMapa'>
          {
            //tu mapa
          }
        </div>
        <p className='punktNazwa'>{nazwa}</p>
      </div>
      {/* </Tooltip> */}
        
    </div>
  );
}

export default GetPunkt;