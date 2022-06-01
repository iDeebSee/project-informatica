import axios from "axios";
import { useJwt, decodeToken, isExpired } from "react-jwt";
import authHeader from './auth-header';
const API_URL = "http://localhost:8080/auth/";

class AuthService {
    
    login(email, password) {
        console.log(email, password)
        return axios
            .post(API_URL + "login", {
                email: email,
                password: password

            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(email, password, firstName, lastName, role,vat) {
        return axios.post(API_URL + "signup", {
            email,
            password,
            firstName,
            lastName,
            role,
            vat
        });
    }
    getCurrentUser() {

        return JSON.parse(localStorage.getItem('user'));
    }
    getLoggedUser() {
        return axios.get(API_URL + "loggedin", { headers: authHeader() })
    }
    isLoggedIn() {
        const currUser = JSON.parse(localStorage.getItem('user'));
        let token = ""
        if (currUser) {
            token = currUser.accessToken
        }

        const isMyTokenExpired = isExpired(token);

        if (JSON.parse(localStorage.getItem('user') != null) && !isMyTokenExpired) {
            return true;
        }
        return false;
    }
}
export default new AuthService();