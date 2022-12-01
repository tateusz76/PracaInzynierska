import React from "react";
import { useContext, useState, useEffect } from 'react';
import requests from '../../Requests';
import instance from '../../Axios';
import {useParams} from 'react-router-dom';
import Header from "../Header/Header";
import { Map, Marker } from "pigeon-maps"

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

    const [hue, setHue] = useState(0)
    const color = `hsl(${hue % 360}deg 39% 70%)`

    const [center, setCenter] = useState([53.7764, 20.4786])
    const [zoom, setZoom] = useState(11)

    return (
        <div className="Punkt">
            <Header></Header>
            <h1>{punktData.nazwa} {punktData.miasto} {punktData.ulica} {punktData.numer}</h1><br/>

            <Map height={500} width={500} defaultCenter={center} defaultZoom={zoom}>
                <Marker 
                    width={50}
                    anchor={[53.7764, 20.4786]} 
                    color={color} 
                    onClick={() => setHue(hue + 20)} 
                />
            </Map>
        </div>
    );
}

export default PunktDetails;