import Header from '../../Components/Header/Header';
import axios from "axios";
import React from "react";
import "./Register.css"
import { Link, useNavigate } from 'react-router-dom';
import instance from '../../Axios';
import { useContext, useState, useEffect } from 'react';

function Register() {

  const navigate = useNavigate();

  const [formValue, setformValue] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  });

  const [errorUsername,setErrorUsername] = useState();
  const [errorFirst,setErrorFirst] = useState();
  const [errorLast,setErrorLast] = useState();
  const [errorEmail,setErrorEmail] = useState();
  const [errorPassword,setErrorPassword] = useState();

  const handleSubmit = async(e) => {
    e.preventDefault();
    const registerData = new FormData();
    registerData.append("username", formValue.username)
    registerData.append("first_name", formValue.first_name)
    registerData.append("last_name", formValue.last_name)
    registerData.append("email", formValue.email)
    registerData.append("password", formValue.password)

    if(registerData.username == undefined)
      {
        setErrorUsername('Nazwa użytkownika może zawierać litery, cyfry i znaki @ . + - _');
      }
      else setErrorUsername('');

    if(registerData.first_name == undefined)
      {
        setErrorFirst('Proszę poprawnie podać swoje imię');
      }
      else setErrorFirst(''); 
    
    if(registerData.last_name == undefined)
      {
        setErrorLast('Proszę poprawnie podać swoje nazwisko');
      }
      else setErrorLast(''); 

    if(registerData.email == undefined)
      {
        setErrorEmail('Proszę podać poprawny adres email');
      }
      else setErrorEmail(''); 

    if(registerData.password == undefined)
      {
        setErrorPassword('Hasło musi składać się z 8 znaków oraz zawierać litery i cyfry');
      }
      else setErrorPassword(''); 

    try {
      const response = await instance({
        method: "post",
        url: "http://127.0.0.1:8000/szczepienia/users/",
        data: registerData,
        headers: { "Content-Type": "application/json" },
      }).then(() => {     
        navigate('/login');
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
    <div className="Register">
    <h1>Zarejestruj się</h1>

    <form className='RegisterForm' onSubmit={handleSubmit}>
    {/* <div className='formContainer'> */}
      <label> Nazwa użytkownika:
      {errorUsername?<label className='errorRegister'>{errorUsername}</label>:null} 
        <input type="text" name="username"  onChange={handleChange}/>
      </label>

      <label> Imię:
      {errorFirst?<label className='errorRegister'>{errorFirst}</label>:null} 
        <input type="text" name="first_name"  onChange={handleChange}/>
      </label>

      <label> Nazwisko:
      {errorLast?<label className='errorRegister'>{errorLast}</label>:null} 
        <input type="text" name="last_name"  onChange={handleChange}/>
      </label>

      <label> Adres Email:
      {errorEmail?<label className='errorRegister'>{errorEmail}</label>:null} 
        <input type="email" name="email"  onChange={handleChange}/>
      </label>

      <label> Hasło
      {errorPassword?<label className='errorRegister'>{errorPassword}</label>:null} 
        <input type="password" name="password"  onChange={handleChange}/>
      </label>

      <input type="submit" className='registerbtn' value="Wyślij" />
    {/* </div> */}
    </form>
  </div>
    )
}

export default Register;