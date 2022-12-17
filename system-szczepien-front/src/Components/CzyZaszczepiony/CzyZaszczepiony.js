import axios from "axios";
import React from "react";
import { useEffect, useState } from 'react';
import requests from "../../Requests";
import instance from "../../Axios";
import './CzyZaszczepiony.css';

const CzyZaszczepiony= () => {

    const [szczepienieData, setSzczepienieData] = useState([]);
    const [index, setIndex] = useState();
    const today = new Date();
    const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;

    useEffect(() => {
        instance.get(requests.getSzczepienie , {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem("access")
            }
          })
          .then(function (response) {
              setSzczepienieData(response.data);
            })
    }, []);

    useEffect(() => {
        for(let i in szczepienieData)
        {
            if(szczepienieData[i].czyOstatniaDawka == true)
            {
                setIndex(i);
                return;
            }
        }
    });

    szczepienieData.sort((a, b) => new Date(a.id) - new Date(b.id))

    return (
        <div className="czyZaszczepiony">
            {szczepienieData && szczepienieData[index] && szczepienieData[index].czyOstatniaDawka && szczepienieData[index].czyOstatniaDawka == true && szczepienieData[index].dataSzczepienia <  date && <h1 className="zaszczepiony">ZASZCZEPIONY</h1>}
            {szczepienieData && szczepienieData[index] && szczepienieData[index].czyOstatniaDawka && szczepienieData[index].czyOstatniaDawka == false && szczepienieData[index].dataSzczepienia <  date &&<h1 className="nieZaszczepiony">NIE ZASZCZEPIONY</h1>}
            {szczepienieData && szczepienieData[index] && szczepienieData[index].czyOstatniaDawka && szczepienieData[index].czyOstatniaDawka == true && szczepienieData[index].dataSzczepienia >  date &&<h1 className="nieZaszczepiony">NIE ZASZCZEPIONY</h1>}
            {szczepienieData && szczepienieData == '' && <h1 className="nieZaszczepiony">NIE ZASZCZEPIONY</h1>}
        </div>
    );
}

export default CzyZaszczepiony; 