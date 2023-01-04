import React from "react";
import './SzczepieniaPunkt.css';

const SzczepieniaPunkt= ({id, pacjent, data, szczepionka, punkt}) => {

    return (
        <div className="szczepienieSingle">
            <h1>Pacjent: {pacjent} </h1>
            <h1>Data szczepienia: {data} </h1>
            <h1>Wybrana szczepionka: {szczepionka} </h1><br/>
              
        </div>
    );
}

export default SzczepieniaPunkt; 