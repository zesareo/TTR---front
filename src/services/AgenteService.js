import axios from 'axios';
const API_URL = `https://ttrcontrolescolar2020.herokuapp.com/api/appstart/v2/Agente/`;

export default class AgenteService {

  getAgentes() {
    const url = `${API_URL}`;
    return axios.get(url).then(response => response.data);
  }

  getAgenteByURL(link) {
    const url = `${API_URL}${link}`;
    return axios.get(url).then(response => response.data);
  }

  getAgente(pk) {
    const url = `${API_URL}${pk}`;
    return axios.get(url).then(response => response.data);
  }

  deleteAgente(agente) {
    const url = `${API_URL}${agente.usuario.id}`;
    return axios.delete(url);
  }

  deleteAgenteById(id) {
    const url = `${API_URL}${id}`;
    return axios.delete(url);
  }

  createAgente(agente) {
    const url = `${API_URL}`;
    return axios.post(url, agente);
  }

  updateAgente(agente) {
    const url = `${API_URL}${agente.usuario.id}`;
    return axios.put(url, agente);
  }
}

