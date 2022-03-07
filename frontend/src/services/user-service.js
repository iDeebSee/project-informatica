import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/users';
class UserService {
    getPublicContent() {
        return axios.get(API_URL);
    }
    getUserBoard(id) {
        return axios.get(API_URL + `${id}`, { headers: authHeader() });
    }
    //   getModeratorBoard() {
    //     return axios.get(API_URL + 'mod', { headers: authHeader() });
    //   }
    //   getAdminBoard() {
    //     return axios.get(API_URL + 'admin', { headers: authHeader() });
    //   }
}
export default new UserService();