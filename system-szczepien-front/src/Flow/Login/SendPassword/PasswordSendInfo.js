import React from "react";
import { Link } from 'react-router-dom';
import Header from "../../../Components/Header/Header";
import AdminHeader from "../../../Components/Header/AdminHeader";
import PracownikHeader from "../../../Components/Header/PracownikHeader";

function PasswordSendInfo() {

    console.log(sessionStorage.getItem("access"));

    return (
        <div className="PasswordSendInfo">
            {
                sessionStorage.getItem("access") !== null
                ? sessionStorage.getItem("isAdmin") === "admin"
                ? <AdminHeader/>
                : sessionStorage.getItem("isPracownik") === "pracownik"
                    ? <PracownikHeader/>
                    : <Header/>
                : null   
            }
            <h1>Na podany adres email wysłany został link do resetowania hasła, proszę sprawdzić skrzynkę mailową</h1>
            {sessionStorage.getItem("access") !== null
                    ? null
                    : <Link  to='/login'>Powrót do logowania</Link>
            }
            
        </div>
    );
}

export default PasswordSendInfo;