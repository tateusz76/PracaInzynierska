import React from "react";
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import { useContext, useState } from 'react';
import './Header.css';

const Header = () => {
    
    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
      };

    return (
        <div className="navbar">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"></link>
                <a href="/"><i className="fa fa-fw fa-home"></i> Strona główna</a> 
                <a href="/dodajSzczepionke"><i className="fa-solid fa-syringe"></i> Dodaj szczepionkę</a> 
                <a href="/patientProfile"><i className="fa fa-fw fa-user"></i> Profil</a> 
                <a href="/login"><i className="fa-solid fa-right-to-bracket"></i> Zaloguj się</a>
                <a href="/logout" className="logoutBtn" onClick={logout}><i className="fa-solid fa-right-from-bracket"></i>Wyloguj się</a>
        </div>
    )
}

export default Header