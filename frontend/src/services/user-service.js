import axios from 'axios';
import authHeader from './auth-header';
const API_URL = 'http://localhost:8080/users';
class UserService {
    getAll() {
        return axios.get(API_URL, { headers: authHeader() });

    }
    getUser(id) {
        return axios.get(API_URL + "/" + `${id}`, { headers: authHeader() });
    }
    update(id, firstName, lastName, email, password, role, vat) {

        return axios.put(API_URL + "/" + `${id}`,
            {
                firstName,
                lastName,
                email,
                password,
                role,
                vat
            },
            { headers: { 'Content-Type': 'application/json' } });
    }
    updateNoPass(id, firstName, lastName, email, enable, role, vat) {

        return axios.put(API_URL + "/" + `${id}`,
            {
                firstName,
                lastName,
                email,
                enable,
                role,
                vat
            },
            { headers: { 'Content-Type': 'application/json' } });
    }
    updateComplete(id, firstName, lastName, email, password, enabled, role, vat) {

        console.log("user service role: ", role)
        return axios.put(API_URL + "/" + `${id}`,
            {
                firstName,
                lastName,
                email,
                password,
                enabled,
                role,
                vat
            });
    }
    create(email, naam, voornaam, role) {



        return axios.post(`${API_URL}`, { email, naam, voornaam, role }, { headers: authHeader() }
        );



    }
    delete(id) {
        return axios.delete(`${API_URL}/${id}`, { headers: authHeader() });
    }


}
export default new UserService();