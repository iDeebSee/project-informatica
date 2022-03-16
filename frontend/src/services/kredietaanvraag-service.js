import axios from 'axios';
import httpsCommon from './https-common';
import authHeader from './auth-header';
// import http from "./https-common";
const baseUrl = 'http://localhost:8080/kredietaanvragen';

class KredietAanvraagService {
    getAll() {
        return httpsCommon.get(`${baseUrl}`);
    }

    // get(id) {
    //     return http.get(`${baseUrl}/${id}`);
    // }


    create(lening, termijn, naam, verantwoording, eigenvermogen, categorie) {

        let formdata = new FormData();
        formdata.append('lening', lening);
        formdata.append('looptijd', termijn);
        //formdata.append('file',bestand);
        formdata.append('naam', naam);
        formdata.append('verantwoording', verantwoording);
        formdata.append('eigenVermogen', eigenvermogen);
        formdata.append('categorie', categorie)
        // if(bestand==undefined)
        // {
        //     bestand.array.forEach(bestand => {
        //         formdata.append('files',bestand);

        //     });
        // }

        const config =
        {
            headers:
                { "Content-Type": "multipart/form-data" }

        }
        return httpsCommon.post(`${baseUrl}`, formdata, config
        );



    }


    // update(id) {
    //     return http.put(`${baseUrl}/${id}`);
    // }

    delete(id) {
        return httpsCommon.delete(`${baseUrl}/${id}`, { headers: authHeader() });
    }
}
export default new KredietAanvraagService();
