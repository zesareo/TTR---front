import axios from 'axios';
//const API_URL = `https://ttrcontrolescolar2020.herokuapp.com/api/appstart/v2/Alumno/`;
const API_URL = `http://localhost:8000/api/appstart/v2/Alumno/`;

export default class AlumnosService {

  getAlumnos() {
    const url = `${API_URL}`;
    return axios.get(url).then(response => response.data);
  }

  getAlumnosByURL(link) {
    const url = `${API_URL}${link}`;
    return axios.get(url).then(response => response.data);
  }

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

  createAlumno(alumno) {
    const url = `${API_URL}`;
    return axios.post(url, alumno);
  }

  updateAlumno(alumno) {
    // console.log('In updateAlumno: ', alumno);
    const url = `${API_URL}${alumno.usuario.id}`;
    return axios.put(url, alumno);
  }
}

