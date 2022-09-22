import Header from "./Header/Header";
import axios from "axios";
import React from "react";



function AddSzczepionka() {


  const [formValue, setformValue] = React.useState({
    nazwaSzczepionki: '',
  });

  const handleSubmit = async() => {
    const vaccineData = new FormData();
    vaccineData.append("nazwaSzczepionki", formValue.nazwaSzczepionki)

    try {
      const response = await axios({
        method: "post",
        url: "http://127.0.0.1:8000/szczepienia/szczepionka",
        data: vaccineData,
        headers: { "Content-Type": "application/json" },
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
      <Header></Header>
      <h1>Dodaj szczepionkę</h1>

      <form onSubmit={handleSubmit}>
        <label> Nazwa szczepionki:
          <input type="text" name="nazwaSzczepionki"  onChange={handleChange}/>
        </label>
        <input type="submit" value="Wyślij" />
      </form>
    </div>
  );
}

export default AddSzczepionka;
