import React, { useState } from "react"
import { Map, Marker } from "pigeon-maps"

function MapTest() {

  const [hue, setHue] = useState(0)
  const color = `hsl(${hue % 360}deg 39% 70%)`

  const [center, setCenter] = useState([53.7764, 20.4786])
  const [zoom, setZoom] = useState(11)
  return (
    <Map height={500} width={500} defaultCenter={center} defaultZoom={zoom}>
      <Marker 
        width={50}
        anchor={[53.7764, 20.4786]} 
        color={color} 
        onClick={() => setHue(hue + 20)} 
      />
    </Map>

  )
}

export default MapTest;