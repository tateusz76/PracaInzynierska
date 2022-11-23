import Header from '../../Components/Header/Header';
import axios from "axios";
import React from "react";
import "./Register.css"
import { Link, useNavigate } from 'react-router-dom';
import instance from '../../Axios';

function Register() {

  const navigate = useNavigate();

  const [formValue, setformValue] = React.useState({
    email: '',
    password: '',
  });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const registerData = new FormData();
    registerData.append("username", formValue.username)
    registerData.append("first_name", formValue.first_name)
    registerData.append("last_name", formValue.last_name)
    registerData.append("email", formValue.email)
    registerData.append("password", formValue.password)

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
    {/* <Header></Header> */}
    <h1>Zaloguj się</h1>

    <form className='RegisterForm' onSubmit={handleSubmit}>
    {/* <div className='formContainer'> */}
      <label> Nazwa użytkownika:
        <input type="text" name="username"  onChange={handleChange}/>
      </label>

      <label> Imię:
        <input type="text" name="first_name"  onChange={handleChange}/>
      </label>

      <label> Nazwisko:
        <input type="text" name="last_name"  onChange={handleChange}/>
      </label>

      <label> Adres Email:
        <input type="email" name="email"  onChange={handleChange}/>
      </label>

      <label> Hasło
        <input type="password" name="password"  onChange={handleChange}/>
      </label>

      <input type="submit" className='registerbtn' value="Wyślij" />
    {/* </div> */}
    </form>
  </div>
    )
}

export default Register;