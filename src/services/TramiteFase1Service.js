import axios from 'axios';
//const API_URL = `https://ttrcontrolescolar2020.herokuapp.com/api/appstart/v2/TramiteFase1/`;
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

  getTramiteFase1(pk) {
    const url = `${API_URL}${pk}`;
    return axios.get(url).then(response => response.data);
  }

  deleteTramiteFase1(tramiteFase1) {
    const url = `${API_URL}${tramiteFase1.usuario.id}`;
    return axios.delete(url);
  }

  deleteTramiteFase1ById(id) {
    const url = `${API_URL}${id}`;
    return axios.delete(url);
  }
  
  createTramiteFase1(tramite) {
    const url = `${API_URL}`;
    return axios.post(url, tramite);
  }

  /*
  updateTramiteFase1(tramiteFase1) {
    // console.log('In updateTramiteFase1: ', tramiteFase1);
    const url = `${API_URL}${tramiteFase1.usuario.id}`;
    return axios.put(url, tramiteFase1);
  }
  */
}

