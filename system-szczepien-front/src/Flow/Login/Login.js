import './Login.css'
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import axios from "axios";
import React from "react";
import './Login.css';
import instance from '../../Axios';

function Login() {

  const [formValue, setformValue] = React.useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  //CZY ZALOGOWANY
  const [isAuthenticated, setAuthenticated] = useState(() => {
    const token = localStorage.getItem("access");
    if(token !== null) console.log("zalogowany")
    else console.log("wylogowany")
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const loginData = new FormData();
    loginData.append("email", formValue.email)
    loginData.append("password", formValue.password)

    try {
      const response = await instance({
        method: "post",
        url: "http://127.0.0.1:8000/szczepienia/token/",
        data: loginData,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {     
        localStorage["access"]=res.data.access
        localStorage["refresh"]=res.data.refresh
        navigate('/patientProfile');
  });
    } catch(error) {
      console.log(error)
    }

  }

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

    
  return (
    <div className="Login">
    <h1>Zaloguj się</h1>

    <form className='loginForm' onSubmit={handleSubmit}>
      <label> Adres email:
        <input type="text" name="email"  onChange={handleChange}/>
      </label>
      <label> Hasło:
        <input type="password" name="password"  onChange={handleChange}/>
      </label>
        <input type="submit" className='submitbtn' value="Wyślij" />
    </form>

    <p>Nie jesteś zarejestrowanym pacjentem?</p><Link  to='/register'><i className="fa fa-fw fa-user"></i>Zarejestruj się</Link>
  </div>
    )
}

export default Login;