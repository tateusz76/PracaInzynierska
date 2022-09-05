import React from "react";
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import App from "../App";
import AddSzczepionka from "./AddSzczepionka";

const Header = () => {

    const navigate = useNavigate();

    return (
        <div>
             <Link to='/' className='navLink'>Strona glowna</Link>
             <Link to='/dodaj_szczepionke' className='navLink'>Dodaj szczepionkę</Link>
        </div>
    )
}

export default Header