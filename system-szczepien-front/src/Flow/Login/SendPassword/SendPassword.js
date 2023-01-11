import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../../../Components/Header/Header";
import AdminHeader from "../../../Components/Header/AdminHeader";
import PracownikHeader from "../../../Components/Header/PracownikHeader";


function SendPassword() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/passwordSendInfo");
    }

    return (
        <div className="SendPassword">
            {
                sessionStorage.getItem("access") !== null
                ? sessionStorage.getItem("isAdmin") === "admin"
                ? <AdminHeader/>
                : sessionStorage.getItem("isPracownik") === "pracownik"
                    ? <PracownikHeader/>
                    : <Header/>
                : null   
            }
            <h1>Proszę podać adres email, na który wysłany zostanie link do zresetowania hasła</h1>
            <form className='loginForm' onSubmit={handleSubmit}>
            <label className='labelForm'> Adres email:
                <input type="text" name="email"/>
            </label>
                <input type="submit" className='submitbtn' value="Wyślij" />
            </form>
        </div>
    );
}

export default SendPassword;