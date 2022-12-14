import Header from "../../Components/Header/Header";
import axios from "axios";
import React from "react";
import requests from "../../Requests";
import instance from "../../Axios";
import AdminHeader from "../../Components/Header/AdminHeader";


function AddPunkt() {


  const [formValue, setformValue] = React.useState({
    nazwa: '',
    miasto: '',
    ulica: '',
    numer: '',
    centerX: '',
    centerY: '',
  });

  const handleSubmit = async() => {
    const punktData = new FormData();
    punktData.append("nazwa", formValue.nazwa)
    punktData.append("miasto", formValue.miasto)
    punktData.append("ulica", formValue.ulica)
    punktData.append("numer", formValue.numer)
    punktData.append("centerX", formValue.centerX)
    punktData.append("centerY", formValue.centerY)

    try {
      const response = await instance({
        method: "post",
        url: requests.punkt,
        data: punktData,
        headers: { "Content-Type": "application/json", "Authorization":  'Bearer ' + sessionStorage.getItem("access") },
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
    <div className="AddPunkt">
      <AdminHeader/>
      <h1>Dodaj punkt szczepień</h1>

      <form onSubmit={handleSubmit}>
        <label> Nazwa punktu:
          <input type="text" name="nazwa"  onChange={handleChange}/>
        </label>

        <label> Miasto:
          <input type="text" name="miasto"  onChange={handleChange}/>
        </label>

        <label> Ulica:
          <input type="text" name="ulica"  onChange={handleChange}/>
        </label>

        <label> Numer budynku:
          <input type="text" name="numer"  onChange={handleChange}/>
        </label>

        <label> Koordynaty X punktu:
          <input type="text" name="centerX"  onChange={handleChange}/>
        </label>

        <label> Koordynaty Y punktu:
          <input type="text" name="centerY"  onChange={handleChange}/>
        </label>

        <input type="submit" value="Wyślij" />
      </form>
    </div>
  );
}

export default AddPunkt;
