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
    const formData = new FormData();

    formData.append("tipo_tramite", tramite.tipo_tramite);
    formData.append("fecha_solicitud", tramite.fecha_solicitud);
    formData.append("ciclo_escolar", tramite.ciclo_escolar);
    formData.append("atributos_dictamen", tramite.atributos_dictamen);
    formData.append("estatus", tramite.estatus);
    formData.append("comentario", tramite.comentario);
    formData.append("qr", tramite.qr);
    formData.append("firma", tramite.firma);
    

    /*
    axios.post("http://localhost:8000/api/v1/reports/", formData, {
      headers: { Authorization: `Token ${token}` }
    });*/

    // console.log('In updateTramite: ', tramite);
    const url = `${API_URL}${tramite.id}`;
    //return axios.put(url, tramite);
    return axios.put(url, formData);
  }
  
}

