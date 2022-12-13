import React from "react";
import { useNavigate } from 'react-router-dom';


const GetSzczepienie= ({id, data, szczepionka, punkt}) => {  

  const navigate = useNavigate();

  const goEdit = () => { 
    navigate(`/editDate/${id}`);
  };

  return (
    <div className="Szczepienie" onClick={goEdit}>
        <h1 className="szczepienie">{id} {data} {szczepionka} {punkt}</h1><br/>
    </div>
  );
}

export default GetSzczepienie;