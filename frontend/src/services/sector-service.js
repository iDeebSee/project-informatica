import axios from 'axios';
import httpsCommon from './https-common';
import authHeader from './auth-header';
const baseUrl = 'http://localhost:8080/sector';

class SectorService {
    getAll() {
        return httpsCommon.get(`${baseUrl}`, { headers: authHeader() });
    }

    get(id) {
        return axios.get(`${baseUrl}/${id}`, { headers: authHeader() });
    }


    create(naam, nacecode, isBlack) {

        const user = JSON.parse(localStorage.getItem('user'));


        const config =
        {
            headers: {
                "Content-Type": "application/json",
                "Authorization": 'Bearer ' + user.accessToken
            }


        }
        return axios.post(`${baseUrl}`, { naam, nacecode, isBlack }, config);
    }

    delete(id) {

        return axios.delete(`${baseUrl}/${id}`, { headers: authHeader() });
    }
}
export default new SectorService();
