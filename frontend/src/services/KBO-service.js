import axios from 'axios';
import httpsCommon from './https-common';
import authHeader from './auth-header';
// import http from "./https-common";
const baseUrl = 'http://projectbus10.p.bletchley.cloud:8093/companydata';

class KBOservice {
    getAll() {
        return axios.get(`${baseUrl}`);
    }

    get(id) {
        return axios.get(`${baseUrl}/${id}`);
    }
    
    getByVat(vat) {
       
        const config = {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            }
          };
        return axios.get(`${baseUrl}/${vat}`,config);

    }

   
 

   

}
export default new KBOservice();
