import axios from "axios";
import React from "react";
import { useEffect, useState } from 'react';
import requests from "../../../Requests";
import instance from "../../../Axios";
import AdminHeader from "../../../Components/Header/AdminHeader";
import Header from "../../../Components/Header/Header";
import PracownikHeader from "../../../Components/Header/PracownikHeader";
import PacjentListComponent from "../../../Components/PacjentListComponent/PacjentListComponent";
import './PacjentList.css';

const PacjentList= () => {

    const [pacjentData, setPacjentData] = useState([]);

    useEffect(() => {
        instance.get(requests.pacjentList , {
            headers: {
              Authorization: 'Bearer ' + sessionStorage.getItem("access")
            }
          })
          .then(function (response) {
            setPacjentData(response.data);
            })
    }, []);

    const displayPacjenci = pacjentData.map(e => {
        return <PacjentListComponent key={e.id} username={e.username} first_name={e.first_name} last_name={e.last_name} email={e.email}/>
    });

    return (
        <div className="PacjentListMain">
            {sessionStorage.getItem("isAdmin") == "admin"
                ? <AdminHeader/>
                : 
                    sessionStorage.getItem("isPracownik") == "pracownik"
                        ? <PracownikHeader/>
                        : <Header/>
            }
            <div className="PacjentList">
                {displayPacjenci.length > 0 && <u><h1>Lista pacjentów</h1></u>}
                {displayPacjenci.length > 0 ? displayPacjenci : <u><h1>Brak pacjentów</h1></u>}
            </div>
        </div>
    );
}

export default PacjentList; 