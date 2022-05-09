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
    update(id, firstName, lastName, email, password, status) {

        return axios.put(API_URL + "/" + `${id}`,
            {
                firstName,
                lastName,
                email,
                password,
                status
            },
            { headers: { 'Content-Type': 'application/json' } });
    }
    updateComplete(id, firstName, lastName, email, password, enabled, role) {

        console.log("user service role: ", role)
        return axios.put(API_URL + "/" + `${id}`,
            {
                firstName,
                lastName,
                email,
                password,
                enabled,
                role
            });
    }
    create(email, naam, voornaam, role) {



        return axios.post(`${API_URL}`, { email, naam, voornaam, role }
        );



    }
    delete(id) {
        return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
    }


}
export default new UserService();