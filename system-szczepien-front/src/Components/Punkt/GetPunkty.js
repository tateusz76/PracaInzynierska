import React from "react";
import { useNavigate } from 'react-router-dom';
import './Punkty.css';


const GetPunkty= ({id, nazwa, miasto, ulica, numer}) => {      
  
  const navigate = useNavigate();

  const openPunktDetails = () => { 
    navigate(`/punktDetails/${id}`);
  };


  return (
    <div className="Punkt"  onClick={openPunktDetails}>
        <h1 className="punktH1">{nazwa} {miasto} {ulica} {numer}</h1><br/>
    </div>
  );
}

export default GetPunkty;