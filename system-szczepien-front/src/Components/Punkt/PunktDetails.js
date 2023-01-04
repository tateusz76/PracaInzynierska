import React from "react";
import { useState, useEffect } from 'react';
import requests from '../../Requests';
import instance from '../../Axios';
import {useParams} from 'react-router-dom';
import Header from "../Header/Header";
import MapComponent from "../Maps/MapComponent";
import AdminHeader from "../../Components/Header/AdminHeader";
import './Punkty.css';

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
        <div className="PunktDetails">
            {sessionStorage.getItem("isAdmin") == "admin"
                ? <AdminHeader/>
                : <Header/>
            }
            <div className="PunktDetailsContent">
                <h1 className="punktDetailsH1"> {punktData.nazwa}</h1>
                <h1 className="punktDetailsH1"> Miasto: {punktData.miasto}</h1>
                <h1 className="punktDetailsH1"> Lokalizacja: ul. {punktData.ulica} {punktData.numer}</h1>

                <MapComponent center = {center}/>
            </div>
        </div>
    );
}

export default PunktDetails;