import axios from 'axios';

const API_URL = `https://ttrcontrolescolar2020.herokuapp.com/api/appstart/v2/token/`;

export default class AuthService {
  static login(user, pass) {

    const dataSend = {
      username: user,
      password: pass
    }

    return axios.post(`${API_URL}obtain/`, dataSend).then(resp => resp.data());
  }
}