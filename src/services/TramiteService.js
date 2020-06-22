import axios from 'axios';
//const API_URL = `https://ttrcontrolescolar2020.herokuapp.com/api/appstart/v2/Tramite/`;
const API_URL = `http://localhost:8000/api/appstart/v2/Tramite/`;

export default class TramiteService {

  getTramites() {
    const url = `${API_URL}`;
    return axios.get(url).then(response => response.data);
  }

  getTramitesByURL(link) {
    const url = `${API_URL}${link}`;
    return axios.get(url).then(response => response.data);
  }

  getTramite(pk) {
    const url = `${API_URL}${pk}`;
    return axios.get(url).then(response => response.data);
  }

  deleteTramite(tramite) {
    const url = `${API_URL}${tramite.id}`;
    return axios.delete(url);
  }

  deleteTramiteById(id) {
    const url = `${API_URL}${id}`;
    return axios.delete(url);
  }
  
  createTramite(tramite) {
    const url = `${API_URL}`;
    return axios.post(url, tramite);
  }

  
  updateTramite(tramite) {
    // console.log('In updateTramite: ', tramite);
    const url = `${API_URL}${tramite.id}`;
    return axios.put(url, tramite);
  }
  
}

