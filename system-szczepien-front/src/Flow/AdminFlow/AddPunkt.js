import requests from "../../Requests";
import instance from "../../Axios";
import AdminHeader from "../../Components/Header/AdminHeader";
import './AdminStyle.css';
import { Map, Draggable, Marker } from "pigeon-maps";
import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';


function AddPunkt() {
  const navigate = useNavigate();

  const [anchor, setAnchor] = useState([53.7633, 20.4847]);
  const [hue, setHue] = useState(0)
  const color = `hsl(${hue % 360}deg 39% 70%)`

  const [formValue, setformValue] = React.useState({
    nazwa: '',
    miasto: '',
    ulica: '',
    numer: '',
    centerX: '',
    centerY: '',
  });

  const handleSubmit = () => {
    formValue.centerX = (anchor[0].toFixed(4)) - 0.0002;
    formValue.centerY = (anchor[1].toFixed(4)) - (-0.0001);
    const punktData = new FormData();
    punktData.append("nazwa", formValue.nazwa)
    punktData.append("miasto", formValue.miasto)
    punktData.append("ulica", formValue.ulica)
    punktData.append("numer", formValue.numer)
    punktData.append("centerX", formValue.centerX)
    punktData.append("centerY", formValue.centerY)

    try {
      const response = instance({
        method: "post",
        url: requests.punkt,
        data: punktData,
        headers: { "Content-Type": "application/json", "Authorization":  'Bearer ' + sessionStorage.getItem("access") },
      });
    } catch(error) {
      console.log(error)
    }
    navigate('/punkt');
  }

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  return (
    <div>
      <AdminHeader/>
      <h1 className="headerAddPunkt">Dodaj punkt szczepień</h1>
      <div className="AddPunkt">

        <form onSubmit={handleSubmit}>
          <label> Nazwa punktu:
            <input type="text" name="nazwa"  onChange={handleChange}/>
          </label>

          <label> Miasto:
            <input type="text" name="miasto"  onChange={handleChange}/>
          </label>

          <label> Ulica:
            <input type="text" name="ulica"  onChange={handleChange}/>
          </label>

          <label> Numer budynku:
            <input type="text" name="numer"  onChange={handleChange}/>
          </label>

          <label> Koordynaty X punktu:
            <input type="text" name="centerX" onChange={handleChange} value={anchor[0].toFixed(4)}/>
          </label>

          <label> Koordynaty Y punktu:
            <input type="text" name="centerY" onChange={handleChange}  value={anchor[1].toFixed(4)}/>
          </label>

          <input className="submitbtn" type="submit" value="Wyślij" />
        </form>
        <div className="mapa">
          <Map  height={500} width={500} center={anchor} defaultZoom={18} maxZoom = {18} minZoom = {18}>
                <Draggable anchor={anchor}  onDragEnd={setAnchor}>
                    <Marker width={50} anchor={anchor} color={color} />
                </Draggable>
          </Map>
        </div>
      </div>
        
    </div>
  );
}

export default AddPunkt;
