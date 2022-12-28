import React from "react";
import requests from "../../Requests";
import instance from "../../Axios";
import AdminHeader from "../../Components/Header/AdminHeader";
import './AdminStyle.css';


function AddSzczepionka() {

  const [formValue, setformValue] = React.useState({
    nazwaSzczepionki: '',
    dawka: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const vaccineData = new FormData();
    vaccineData.append("nazwaSzczepionki", formValue.nazwaSzczepionki)
    vaccineData.append("dawka", formValue.dawka)

    console.log(formValue);

    try {
      const response = instance({
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

  const handleDawkaChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: parseInt(event.target.value)
    });
  }

  console.log(typeof formValue.dawkaSzczepionki);

  return (
    <div>
      <AdminHeader/>
      <div className="AddSzczepionka">
      <h1>Dodaj szczepionkę</h1>
        <form onSubmit={handleSubmit}>
          <label> Nazwa szczepionki:
            <input type="text" name="nazwaSzczepionki"  onChange={handleChange}/>
          </label>
          <label> Ilość dawek:
            <input className="dawki" type="number" name="dawka"  onChange={handleDawkaChange}/>
          </label>
          <input className="submitbtn" type="submit" value="Wyślij" />
        </form>
      </div>
    </div>
  );
}

export default AddSzczepionka;
