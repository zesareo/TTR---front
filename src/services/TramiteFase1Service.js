import axios from 'axios';
//const API_URL = `https://ttrcontrolescolar2020.herokuapp.com/api/appstart/v2/Alumno/`;
const API_URL = `http://localhost:8000/api/appstart/v2/TramiteFase1/`;

export default class TramiteFase1Service {

  getTramiteFase1s() {
    const url = `${API_URL}`;
    return axios.get(url).then(response => response.data);
  }

  getTramiteFase1sByURL(link) {
    const url = `${API_URL}${link}`;
    return axios.get(url).then(response => response.data);
  }

  /*
  getAlumno(pk) {
    const url = `${API_URL}${pk}`;
    return axios.get(url).then(response => response.data);
  }

  deleteAlumno(alumno) {
    const url = `${API_URL}${alumno.usuario.id}`;
    return axios.delete(url);
  }

  deleteAlumnoById(id) {
    const url = `${API_URL}${id}`;
    return axios.delete(url);
  }
  */
  createTramiteFase1(tramite) {
    const url = `${API_URL}`;
    return axios.post(url, tramite);
  }

  /*
  updateAlumno(alumno) {
    // console.log('In updateAlumno: ', alumno);
    const url = `${API_URL}${alumno.usuario.id}`;
    return axios.put(url, alumno);
  }
  */
}

