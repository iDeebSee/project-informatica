import axios from 'axios';
import httpsCommon from './https-common';
import authHeader from './auth-header';
// import http from "./https-common";
const baseUrl = 'http://localhost:8080/contract';

class ContractService {
    getAll() {
        return httpsCommon.get(`${baseUrl}`, { headers: authHeader() });
    }

    get(id) {
        return httpsCommon.get(`${baseUrl}/${id}`, { headers: authHeader() });
    }

    create(id) {
        return httpsCommon.post(`${baseUrl}/${id}`, { headers: authHeader() });
    }

    update(id, handtekening) {

        return axios.put(`${baseUrl}/${id}`, { handtekening }, { headers: authHeader() });
    }

    uploadFile(id, bestand) {

        const config =
        {
            headers:
                { "Content-Type": "multipart/form-data", authHeader }

        }

        const formData = new FormData();
        formData.append('bestand', bestand);
        console.log("id en bestand: ", id, bestand);
        return axios.put(`${baseUrl}/upload/${id}`, formData, config);
    }

    // delete(id) {
    //     return httpsCommon.delete(`${baseUrl}/${id}`, { headers: authHeader() });
    // }



}
export default new ContractService();
