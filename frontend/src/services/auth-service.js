import axios from "axios";
const API_URL = "http://localhost:8080/auth/";
class AuthService {
    login(email, password) {
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
    register(email, password) {
        return axios.post(API_URL + "signup", {
            email,
            password
        });
    }
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
    isLoggedIn() {
        if(JSON.parse(localStorage.getItem('user') != null)){
            return true;
        }
        return false;
    }
}
export default new AuthService();