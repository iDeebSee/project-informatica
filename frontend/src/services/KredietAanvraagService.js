import http from "./https-common";
const baseUrl = '/kredietaanvragen';

class KredietAanvragenService {
    getAll() {
        return http.get(`${baseUrl}/`);
    }

    get(id) {
        return http.get(`${baseUrl}/${id}`);
    }

    create() {
        return http.post(`${baseUrl}/`);
    }

    update(id) {
        return http.put(`${baseUrl}/${id}`);
    }

    delete(id) {
        return http.delete(`${baseUrl}/${id}`);
    }
}
