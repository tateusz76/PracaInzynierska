const requests = {
    //patientProfileGet: `http://127.0.0.1:8000/szczepienia/users/`,
    patientProfileGet: `http://127.0.0.1:8000/szczepienia/userList`,
    editPatientProfile: 'http://127.0.0.1:8000/szczepienia/edit',
    getPunkty: 'http://127.0.0.1:8000/szczepienia/getPunkty',
    punktDetails: 'http://127.0.0.1:8000/szczepienia/getPunkty/',
    rejestracjaSzczepienie: "http://127.0.0.1:8000/szczepienia/szczepienie",
    getSzczepienie: 'http://127.0.0.1:8000/szczepienia/getSzczepienie',
    szczepionkaGet: 'http://127.0.0.1:8000/szczepienia/szczepionkaGet',
    szczepienieDetail: 'http://127.0.0.1:8000/szczepienia/szczepienie/',

    //ADMIN 
    szczepionka: 'http://127.0.0.1:8000/szczepienia/szczepionka',
    punkt: 'http://127.0.0.1:8000/szczepienia/punkt',
    
  }
  
  export default requests;