import React from "react";
import { useNavigate } from 'react-router-dom';
import './Punkty.css';


const GetPunkty= ({id, nazwa, miasto, ulica, numer}) => {      
  
  const navigate = useNavigate();

  const openPunktDetails = () => { 
    navigate(`/punktDetails/${id}`);
  };


  return (
    <div className="punktDiv"  onClick={openPunktDetails}>
        <h1 className="punktH1">{nazwa} </h1>
        <h1 className="punktH1">Miasto: {miasto}</h1>
        <h1 className="punktH1">Lokalizacja: ul. {ulica} {numer}</h1>
    </div>
  );
}

export default GetPunkty;