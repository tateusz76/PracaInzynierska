import Header from "../../Components/Header/Header";
import axios from "axios";
import React from "react";
import requests from "../../Requests";
import instance from "../../Axios";
import AdminHeader from "../../Components/Header/AdminHeader";



function AddSzczepionka() {


  const [formValue, setformValue] = React.useState({
    nazwaSzczepionki: '',
    dawkaSzczepionki: '',
  });

  const handleSubmit = async() => {
    const vaccineData = new FormData();
    vaccineData.append("nazwaSzczepionki", formValue.nazwaSzczepionki)
    vaccineData.append("dawkaSzczepionki", formValue.dawkaSzczepionki)

    try {
      const response = await instance({
        method: "post",
        url: requests.szczepionka,
        data: vaccineData,
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
    <div className="AddSzczepionka">
      <AdminHeader/>
      <h1>Dodaj szczepionkę</h1>

      <form onSubmit={handleSubmit}>
        <label> Nazwa szczepionki:
          <input type="text" name="nazwaSzczepionki"  onChange={handleChange}/>
        </label>
        <label> Ilość dawek:
          <input type="number" name="dawkaSzczepionki"  onChange={handleChange}/>
        </label>
        <input type="submit" value="Wyślij" />
      </form>
    </div>
  );
}

export default AddSzczepionka;
