import axios from "axios";
import React from "react";
import Header from "../Header/Header";
import { useEffect, useState } from 'react';
import requests from "../../Requests";
import { Link, Navigate } from 'react-router-dom';


const GetPunkty= ({id, nazwa, miasto, ulica, numer}) => {        

  return (
    <div className="Punkt">
        <h1>{id} {nazwa} {miasto} {ulica} {numer}</h1><br/>
    </div>
  );
}

export default GetPunkty;