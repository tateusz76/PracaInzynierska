import React from "react";
import {BrowserRouter as Router, Route, Routes, Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { HiMail, HiUser} from 'react-icons/hi';
import { RiHospitalFill, RiSyringeFill} from 'react-icons/ri';
import { BiLogIn, BiLogOut } from 'react-icons/bi';
import './Header.css';


const AdminHeader = () => {
    
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
            {/* <Link  to='/' className='navLink'> <i className="fa fa-fw fa-home"></i> Strona główna</Link> */}
            <Link  to='/patientProfile' className='navLink'><HiUser/> Profil</Link>
            <Link  to='/punktAdd' className='navLink'><RiHospitalFill/> Dodaj punkt szczepień</Link>
            <Link  to='/punkt' className='navLink'><RiHospitalFill/> Edytuj punkty szczepień</Link>
            <Link  to='/szczepionkaAdd' className='navLink'><RiSyringeFill/> Dodaj szczepionkę</Link>
            
            {isLoggedIn == false ? 
                <Link  to='/login' className='navLink'><BiLogIn/> Zaloguj się</Link> :
                <Link onClick={logout}  to='/login' className='navLink'><BiLogOut/> Wyloguj się</Link>}
        </div>
    </div>
    )
}

export default AdminHeader