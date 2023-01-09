import requests from "../../Requests";
import instance from "../../Axios";
import AdminHeader from "../../Components/Header/AdminHeader";
import './AdminStyle.css';
import { Map, Draggable, Marker } from "pigeon-maps";
import React, { useState, useEffect } from "react";
import {useParams, useNavigate} from 'react-router-dom';


function EditPunkt() {
    const navigate = useNavigate();

    const { idPunkt } = useParams();
    const [punktData, setPunktData] = useState({});

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

    useEffect(() => {
        instance.get(`${requests.punktDetails}${idPunkt}` , {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem("access")
            }
          })
        .then(response => {
        setPunktData(response.data);
        setAnchor([response.data.centerX, response.data.centerY]);
        setformValue(
            {
                nazwa: response.data.nazwa,
                miasto: response.data.miasto,
                ulica: response.data.ulica,
                numer: response.data.numer,
                centerX: response.data.centerX.toFixed(4) - 0.0002,
                centerY: response.data.centerY.toFixed(4) - (-0.0001),
            }
        )
        });
    }, []);

    const handleSubmit = async() => {
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
            method: "put",
            url: `${requests.editPunkt}${idPunkt}`,
            data: punktData,
            headers: { "Content-Type": "application/json", "Authorization":  'Bearer ' + sessionStorage.getItem("access") },
        });
        } catch(error) {
        console.log(error)
        }
    }

    const handleChange = (event) => {
        setformValue({
        ...formValue,
        [event.target.name]: event.target.value
        });
    }

    const handleDelete = () => {
        instance.delete(`${requests.editPunkt}${idPunkt}`, {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem("access")
            }
          })
        navigate('/punkt');
    }

  return (
    <div>
      <AdminHeader/>
      <h1 className="headerEditPunkt">Edytuj punkt szczepień</h1>
      <div className="AddPunkt">

        {punktData &&
            <form onSubmit={handleSubmit}>
            <label> Nazwa punktu:
                <input type="text" name="nazwa" defaultValue={punktData.nazwa} onChange={handleChange}/>
            </label>

            <label> Miasto:
                <input type="text" name="miasto" defaultValue={punktData.miasto} onChange={handleChange}/>
            </label>

            <label> Ulica:
                <input type="text" name="ulica" defaultValue={punktData.ulica} onChange={handleChange}/>
            </label>

            <label> Numer budynku:
                <input type="text" name="numer" defaultValue={punktData.numer} onChange={handleChange}/>
            </label>

            <label> Koordynaty X punktu:
                <input type="text" name="centerX" onChange={handleChange} value={anchor[0].toFixed(4)}/>
            </label>

            <label> Koordynaty Y punktu:
                <input type="text" name="centerY" onChange={handleChange}  value={anchor[1].toFixed(4)}/>
            </label>

            <input className="submitbtnPunkt" type="submit" value="Wyślij" />
            <button className="deletebtnPunkt" onClick={handleDelete}>Usuń punkt </button>
            </form>
        }
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

export default EditPunkt;
