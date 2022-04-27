import axios from 'axios';
import httpsCommon from './https-common';

import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/role';

class RoleService {
    getAll() {
        return httpsCommon.get(API_URL);
    }
    getRole(id) {
        return axios.get(API_URL + "/" + `${id}`, { headers: authHeader() });
    }
    update(id, rol) {

        return axios.put(API_URL + "/" + `${id}`,
            {
                rol                

           });
    }

}
export default new RoleService();