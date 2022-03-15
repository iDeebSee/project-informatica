import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/users';
class UserService {
    getAll() {
        return axios.get(API_URL);
    }
    getUser(id) {
        return axios.get(API_URL + "/" + `${id}`, { headers: authHeader() });
    }
    update(id, firstName, lastName, email, password) {

        return axios.put(API_URL + "/" + `${id}`,
            {
                firstName,
                lastName,
                email,
                password
            });
    }

}
export default new UserService();