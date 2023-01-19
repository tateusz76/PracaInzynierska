import React from "react";
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { HiMail, HiUser, HiCalendar} from 'react-icons/hi';
import { RiHospitalFill, RiSyringeFill} from 'react-icons/ri';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import './Header.css';


const Header = () => {
    
    const logout = () => {
        sessionStorage.removeItem('access');
        sessionStorage.removeItem('refresh');
        sessionStorage.removeItem('isAdmin');
        sessionStorage.removeItem('isPracownik');
        sessionStorage.removeItem('punkt');
      };

    let [isLoggedIn, setLoggedStatus] = useState(false);

    if(sessionStorage.getItem("access"))
    {
        isLoggedIn = true;
    }
    

    return (
    <div>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"></link>
        <div className='navLinks'>
            <Link  to='/contact' className='navLink'><HiMail /> Kontakt</Link>
            <Link  to='/patientProfile' className='navLink'><HiUser/> Profil</Link>
            <Link  to='/punkt' className='navLink'><RiHospitalFill/> Punkty szczepień</Link>
            <Link  to='/szczepienieList' className='navLink'><HiCalendar/> Historia szczepień</Link>
            <Link  to='/rejestracjaSzczepienie' className='navLink'><RiSyringeFill/> Zarejestruj szczepienie</Link>
            {isLoggedIn == false ? 
                <Link  to='/login' className='navLink'><BiLogIn/> Zaloguj się</Link> :
                <Link onClick={logout}  to='/login' className='navLink'><BiLogOut/> Wyloguj się</Link>}
        </div>
    </div>
    )
}

export default Header