import React from "react";
import { useContext, useState, useEffect } from 'react';
import requests from '../../Requests';
import instance from '../../Axios';
import {useParams} from 'react-router-dom';

const PunktDetails= () => {       
    
    const { idPunkt } = useParams();

    const [punktData, setPunktData] = useState({});

    useEffect(() => {
        instance.get(`${requests.punktDetails}${idPunkt}` , {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem("access")
            }
          })
        .then(response => {
        setPunktData(response.data);
        });
    }, []);

    return (
        <div className="Punkt">
            <h1>{punktData.nazwa} {punktData.miasto} {punktData.ulica} {punktData.numer}</h1><br/>
        </div>
    );
}

export default PunktDetails;