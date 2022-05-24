import axios from 'axios';
import httpsCommon from './https-common';
import authHeader from './auth-header';
// import http from "./https-common";
const baseUrl = 'http://localhost:8080/kbo';

class KBOservice {
    getAll() {
        return axios.get(`${baseUrl}`);
    }

    
    
    getByVat(vat) {
       
       
        return axios.get(`${baseUrl}/${vat}`);

    }

   
 

   

}
export default new KBOservice();
