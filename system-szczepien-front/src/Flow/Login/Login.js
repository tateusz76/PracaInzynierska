import './Login.css'
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../Components/Header/Header';
import axios from "axios";
import React from "react";

function Login() {

  const [formValue, setformValue] = React.useState({
    email: '',
    password: '',
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const loginData = new FormData();
    loginData.append("email", formValue.email)
    loginData.append("password", formValue.password)

    try {
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/szczepienia/token/",
        data: loginData,
        headers: { "Content-Type": "application/json" },
      })
      .then((res) => {     
        localStorage["access"]=res.data.access
        localStorage["refresh"]=res.data.refresh
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
    <Header></Header>
    <h1>Zaloguj się</h1>

    <form onSubmit={handleSubmit}>
      <label> Adres email:
        <input type="text" name="email"  onChange={handleChange}/>
      </label>
      <label> Hasło:
        <input type="password" name="password"  onChange={handleChange}/>
      </label>
      <input type="submit" value="Wyślij" />
    </form>
  </div>
    )
}

export default Login;