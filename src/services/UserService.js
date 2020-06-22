import axios from 'axios';
const API_URL = `https://ttrcontrolescolar2020.herokuapp.com/api/appstart/v2/`;

export default class UserService {

  getUsuarios() {
    const url = `${API_URL}Usuario/`;
    return axios.get(url).then(response => response.data);
  }
  getUsuariosByURL(link) {
    const url = `${API_URL}${link}`;
    return axios.get(url).then(response => response.data);
  }
  getUsuario(pk) {
    const url = `${API_URL}Usuario/${pk}`;
    return axios.get(url).then(response => response.data);
  }
  deleteUsuario(usuario) {
    const url = `${API_URL}Usuario/${usuario.id}`;
    return axios.delete(url);
  }
  createUsuario(usuario) {
    const url = `${API_URL}Usuario/`;
    return axios.post(url, usuario);
  }
  updateUsuario(usuario) {
    const url = `${API_URL}Usuario/${usuario.id}`;
    return axios.put(url, usuario);
  }
}

