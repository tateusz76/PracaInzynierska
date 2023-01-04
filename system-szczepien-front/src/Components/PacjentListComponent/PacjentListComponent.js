import React from "react";
import './PacjentListComponent.css';

const PacjentListComponent= ({id, username, first_name, last_name, email}) => {

    return (
        <div className="pacjentSingle">
            <h1>Pacjent: {username} </h1>
            <h1>Imię i nazwisko: {first_name} {last_name}</h1>
            <h1>Adres e-mail: {email} </h1><br/>
              
        </div>
    );
}

export default PacjentListComponent; 