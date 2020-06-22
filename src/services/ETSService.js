import axios from 'axios';
const API_URL = `https://ttrcontrolescolar2020.herokuapp.com/api/appstart/v2/ETS/`;

export default class UserService {

  getETSs() {
    const url = `${API_URL}`;
    return axios.get(url).then(response => response.data);
  }

  getETSsByURL(link) {
    const url = `${API_URL}${link}`;
    return axios.get(url).then(response => response.data);
  }

  getETS(pk) {
    const url = `${API_URL}ETS/${pk}`;
    return axios.get(url).then(response => response.data);
  }

  deleteETS(ETS) {
    const url = `${API_URL}ETS/${ETS.id}`;
    return axios.delete(url);
  }

  deleteETSById(id) {
    const url = `${API_URL}ETS/${id}`;
    return axios.delete(url);
  }

  createETS(ETS) {
    const url = `${API_URL}`;
    return axios.post(url, ETS);
  }

  updateETS(ETS) {
    const url = `${API_URL}ETS/${ETS.id}`;
    return axios.put(url, ETS);
  }

}

