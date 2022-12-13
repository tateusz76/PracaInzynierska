import React from "react";
import { Map, Marker } from "pigeon-maps"
import { useState, useEffect } from 'react';

const MapComponent= ({center}) => {       

    const [hue, setHue] = useState(0)
    const color = `hsl(${hue % 360}deg 39% 70%)`

    return (
        <div className="Mapa">
            <Map height={500} width={500} center={center} defaultZoom={18}>
                <Marker 
                    width={50}
                    anchor={center} 
                    color={color} 
                />
            </Map>
        </div>
    );
}

export default MapComponent;