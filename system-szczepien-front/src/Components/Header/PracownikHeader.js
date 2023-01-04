import React from "react";
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import { useContext, useState } from 'react';
import './Header.css';


const PracownikHeader = () => {
    
    const logout = () => {
        sessionStorage.removeItem('access');
        sessionStorage.removeItem('refresh');
        sessionStorage.removeItem('isAdmin');
        sessionStorage.removeItem('isPracownik');
      };

    let [isLoggedIn, setLoggedStatus] = useState(false);

    if(sessionStorage.getItem("access"))
    {
        isLoggedIn = true;
    }

    const navigate = useNavigate();
    

    return (
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"></link>
        <div className='navLinks'>
            {/* <Link  to='/' className='navLink'> <i className="fa fa-fw fa-home"></i> Strona główna</Link> */}
            <Link  to='/szczepieniePunkt' className='navLink'><i className="fa fa-fw fa-user"></i> Lista szczepień w punkcie</Link>
            <Link  to='/szczepieniaToday' className='navLink'><i className="fa fa-fw fa-user"></i> Dzisiejsze szczepienia</Link>
            <Link  to='/pacjentList' className='navLink'><i className="fa fa-fw fa-user"></i> Lista pacjentów</Link>
            
            {isLoggedIn == false ? 
                <Link  to='/login' className='navLink'><i className="fa-solid fa-right-to-bracket"></i> Zaloguj się</Link> :
                <Link onClick={logout}  to='/login' className='navLink'><i className="fa-solid fa-right-from-bracket"></i>Wyloguj się</Link>}
        </div>
    </div>
    )
}

export default PracownikHeader