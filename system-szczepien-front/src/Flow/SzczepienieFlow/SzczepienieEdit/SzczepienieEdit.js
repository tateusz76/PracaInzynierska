import React from "react";
import { useEffect, useState } from 'react';
import requests from "../../../Requests";
import instance from "../../../Axios";

const SzczepienieEdit= () => {

    

    return (
        <div className="SzczepienieEdit">
            <form className='szczepienieEditForm' >
            <label><h3> Data szczepienia:</h3>
                <input className='formInput' type="date" name="dataSzczepienia" />
            </label>
            </form>
        </div>
    );
}

export default SzczepienieEdit;