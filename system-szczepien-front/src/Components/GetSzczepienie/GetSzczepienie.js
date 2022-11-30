import React from "react";



const GetSzczepienie= ({id, data, szczepionka, punkt}) => {        

  return (
    <div className="Szczepienie">
        <h1>{id} {data} {szczepionka} {punkt}</h1><br/>
      
    </div>
  );
}

export default GetSzczepienie;