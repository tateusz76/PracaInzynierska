import React from "react";
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import { useContext, useState } from 'react';
import './Header.css';


const AdminHeader = () => {
    
    const logout = () => {
        sessionStorage.removeItem('access');
        sessionStorage.removeItem('refresh');
        sessionStorage.removeItem('isAdmin');
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
            <Link  to='/patientProfile' className='navLink'><i className="fa fa-fw fa-user"></i> Profil</Link>
            <Link  to='/punktAdd' className='navLink'><i className="fa fa-fw fa-syringe"></i> Dodaj punkt szczepień</Link>
            <Link  to='/szczepionkaAdd' className='navLink'><i className="fa fa-fw fa-syringe"></i> Dodaj szczepionkę</Link>
            <Link  to='/punkt' className='navLink'><i className="fa fa-fw fa-user"></i> Punkty szczepień</Link>
            
            {isLoggedIn == false ? 
                <Link  to='/login' className='navLink'><i className="fa-solid fa-right-to-bracket"></i> Zaloguj się</Link> :
                <Link onClick={logout}  to='/login' className='navLink'><i className="fa-solid fa-right-from-bracket"></i>Wyloguj się</Link>}
        </div>
    </div>
    )
}

export default AdminHeader