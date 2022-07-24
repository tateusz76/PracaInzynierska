import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PatientProfile from '../PatientProfile/PatientProfile';

const PatientFlow = () => {

    return (
        <div className='clientFlow'>
            <Routes >
                <Route path="*" element={<PatientProfile />} />
                <Route path='/' element={<PatientProfile />} />
                <Route exact path='/patientProfile' element={<PatientProfile />} />
            </Routes>
        </div>
    )
  }
  
  export default PatientFlow;