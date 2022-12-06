import React from "react";
import { useState, useEffect } from 'react';
import requests from '../../Requests';
import instance from '../../Axios';
import {useParams} from 'react-router-dom';
import Header from "../Header/Header";
import MapComponent from "./MapComponent";

const PunktDetails= () => {       
    
    const { idPunkt } = useParams();

    const [punktData, setPunktData] = useState({});

    const [center, setCenter] = useState();

    useEffect(() => {
        instance.get(`${requests.punktDetails}${idPunkt}` , {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem("access")
            }
          })
        .then(response => {
        setPunktData(response.data);
        setCenter([response.data.centerX, response.data.centerY])
        });
    }, []);

    return (
        <div className="Punkt">
            <Header></Header>
            <h1>{punktData.nazwa} {punktData.miasto} {punktData.ulica} {punktData.numer}</h1><br/>

            <MapComponent center = {center}/>
        </div>
    );
}

export default PunktDetails;