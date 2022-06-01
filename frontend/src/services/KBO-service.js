import axios from 'axios';
import httpsCommon from './https-common';
import authHeader from './auth-header';
// import http from "./https-common";
const baseUrl = 'http://localhost:8080/kbo';

class KBOservice {
    getAll() {
        return axios.get(`${baseUrl}`, { headers: authHeader() });
    }

    getByVat(vat) {


        return axios.get(`${baseUrl}/${vat}`, { headers: authHeader() });

    }
    searchByNameOrVat(value) {
        const auth = {
            headers: {
               
                "Authorization": authHeader(),
            }
        }
        return axios.get(`${baseUrl}/search/${value}`, auth);
    }


}
export default new KBOservice();
