import React from "react";
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import App from "../../App";
import AddSzczepionka from "../AddSzczepionka";
import './Header.css';

const Header = () => {

    const navigate = useNavigate();
    
    return (
        <div className="navbar">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"></link>
                <a href="/"><i class="fa fa-fw fa-home"></i> Strona główna</a> 
                <a href="/dodaj_szczepionke"><i class="fa-solid fa-syringe"></i> Dodaj szczepionkę</a> 
                <a href="/login"><i class="fa fa-fw fa-user"></i> Zaloguj się</a>
        </div>
    )
}

export default Header