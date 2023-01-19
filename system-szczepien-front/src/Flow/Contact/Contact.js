import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../Components/Header/Header";
import AdminHeader from "../../Components/Header/AdminHeader";
import PracownikHeader from "../../Components/Header/PracownikHeader";
import "./Contact.css"


function Contact() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/passwordSendInfo");
    }

    return (
        <div className="Contact">
            {
                sessionStorage.getItem("access") !== null
                ? sessionStorage.getItem("isAdmin") === "admin"
                ? <AdminHeader/>
                : sessionStorage.getItem("isPracownik") === "pracownik"
                    ? <PracownikHeader/>
                    : <Header/>
                : null   
            }
            
            <h1>Aplikacja wspomagająca rejestrację na szczepienia przeciwko COVID-19</h1>
            <h3>Mail kontaktowy do pomocy technicznej: admin@szczepienie.pl</h3>

            <h1 className="aboutUs">O nas</h1>
            <h3>Wykorzystane technologie:</h3>
            <div className="techs">
                <img className="django" src="https://www.django-rest-framework.org/img/logo.png"/>
                <img className="react" src="https://www.datocms-assets.com/45470/1631110818-logo-react-js.png"/>
                <img className="sass" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Sass_Logo_Color.svg/1200px-Sass_Logo_Color.svg.png"/>
            </div>
        </div>
    );
}

export default Contact;