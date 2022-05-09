import axios from 'axios';
import httpsCommon from './https-common';
import authHeader from './auth-header';
const baseUrl = 'http://localhost:8080/sector';

class SectorService {
    getAll() {
        return httpsCommon.get(`${baseUrl}`);
    }

    get(id) {
        return axios.get(`${baseUrl}/${id}`);
    }


    create(naam,nasiCode,isBlack) {

        

        
        const config =
        {
            headers:
                { "Content-Type": "application/json" }

        }
        return axios.post(`${baseUrl}`, {naam,nasiCode,isBlack}, config
        );
}

delete(id) {
    return axios.delete(`${baseUrl}/${id}`, { headers: authHeader() });
}
}
export default new SectorService();
