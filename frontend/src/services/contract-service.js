import axios from 'axios';
import httpsCommon from './https-common';
import authHeader from './auth-header';
// import http from "./https-common";
const baseUrl = 'http://localhost:8080/contract';

class ContractService {
    getAll() {
        return httpsCommon.get(`${baseUrl}`);
    }

    get(id) {
        return httpsCommon.get(`${baseUrl}/${id}`);
    }

    create(id) {
        return httpsCommon.post(`${baseUrl}/${id}`);
    }

    update(id, handtekening) {
        console.log("service",id, handtekening);
        return axios.put(`${baseUrl}/${id}`, { handtekening });
    }

    // delete(id) {
    //     return httpsCommon.delete(`${baseUrl}/${id}`, { headers: authHeader() });
    // }



}
export default new ContractService();
