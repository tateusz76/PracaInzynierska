import axios from "axios";
import React from "react";
import { useEffect, useState } from 'react';
import requests from "../../Requests";
import instance from "../../Axios";
import AdminHeader from "../../Components/Header/AdminHeader";
import PracownikHeader from "../../Components/Header/PracownikHeader";
import Header from "../../Components/Header/Header";
import SzczepieniaPunkt from "../../Components/SzczepieniaPunkt/SzczepieniaPunkt";
import './SzczepieniaByPunkt.css';

const SzczepieniaToday= () => {

    const [szczepienieData, setSzczepienieData] = useState([]);
    const [pracownikData, setPracownikData] = useState([]);

    useEffect(() => {
        instance.get(requests.szczepienieByPunkt , {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem("access")
            }
          })
          .then(function (response) {
              setSzczepienieData(response.data);
            })
    }, []);

    useEffect(() => {
        instance.get(requests.pracownikList , {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem("access")
            }
          })
          .then(function (response) {
              setPracownikData(response.data);
            })
    }, []);


    const myPunkt = szczepienieData.filter(e => {
        console.log(new Date(e.dataSzczepienia));
        console.log(new Date())
        return e.punkt == sessionStorage.getItem("punkt") && new Date(e.dataSzczepienia).toISOString().split('T')[0] === new Date().toISOString().split('T')[0];
    })

    const displaySzczepienie = myPunkt.sort((a, b) => new Date(a.dataSzczepienia) - new Date(b.dataSzczepienia)).map(e => {
        return <SzczepieniaPunkt key={e.id} pacjent={e.pacjent} data={e.dataSzczepienia} szczepionka={e.szczepionka}/>
    });

    return (
        <div className="szczepieniaPunktMain">
            {sessionStorage.getItem("isAdmin") == "admin"
                ? <AdminHeader/>
                : 
                    sessionStorage.getItem("isPracownik") == "pracownik"
                        ? <PracownikHeader/>
                        : <Header/>
            }
            <div className="szczepieniaPunkt">
                {displaySzczepienie.length > 0 && <u><h1>Dzisiejsze szczepienia pacjentów</h1></u>}
                {displaySzczepienie.length > 0 ? displaySzczepienie : <u><h1>Brak szczepień</h1></u>}
            </div>
        </div>
    );
}

export default SzczepieniaToday; 