import axios from 'axios';
import httpsCommon from './https-common';
import authHeader from './auth-header';
// import http from "./https-common";
const baseUrl = 'http://localhost:8080/kredietaanvragen';

class KredietAanvraagService {
    getAll() {
        return httpsCommon.get(`${baseUrl}`);
    }

    get(id) {
        return httpsCommon.get(`${baseUrl}/${id}`);
    }

    getByUserID(id) {
        return httpsCommon.get(`${baseUrl}/user/${id}`);
    }

    getByName(name) {
        return httpsCommon.get(`${baseUrl}/naam/${name}`);
    }
    getByStatus(status) {
        return httpsCommon.get(`${baseUrl}/status/${status}`);
    }


    create(userID, lening, termijn, file, naam, verantwoording, eigenvermogen, categorie) {

        let formdata = new FormData();
        formdata.append('userID', userID);
        formdata.append('lening', lening);
        formdata.append('looptijd', termijn);
        formdata.append('file', file);
        formdata.append('naam', naam);
        formdata.append('verantwoording', verantwoording);
        formdata.append('eigenVermogen', eigenvermogen);
        formdata.append('categorie', categorie)

        if (file != undefined) {
            file.array.forEach(file => {
                formdata.append('files', file);

            });
        }

        const config =
        {
            headers:
                { "Content-Type": "multipart/form-data" }

        }
        return httpsCommon.post(`${baseUrl}`, formdata, config
        );



    }


    // update(lening, termijn, naam, verantwoording, eigenvermogen, categorie,id) {
    //     let formdata = new FormData();
    //     formdata.append('lening', lening);
    //     formdata.append('looptijd', termijn);
    //     //formdata.append('file',bestand);
    //     formdata.append('naam', naam);
    //     formdata.append('verantwoording', verantwoording);
    //     formdata.append('eigenVermogen', eigenvermogen);
    //     formdata.append('categorie', categorie)
    //     // if(bestand==undefined)
    //     // {
    //     //     bestand.array.forEach(bestand => {
    //     //         formdata.append('files',bestand);

    //     //     });
    //     // }

    //     const config =
    //     {
    //         headers:
    //             { "Content-Type": "multipart/form-data" }

    //     }


    //     return httpsCommon.put(`${baseUrl}/${id}`);
    // }

    delete(id) {
        return httpsCommon.delete(`${baseUrl}/${id}`, { headers: authHeader() });
    }

    update(id, lening, termijn, naam, verantwoording, eigenvermogen, categorie) {
        return axios.put(`${baseUrl}/${id}`,
            {
                id,
                lening,
                termijn,
                naam,
                verantwoording,
                eigenvermogen,
                categorie
            },
            { headers: authHeader() }
        )
    }

    updateStatus(id, status) {
        return axios.put(`${baseUrl}/status/${id}`,
            {
                id,
                status
            },
            { headers: authHeader() }
        )
    }
}
export default new KredietAanvraagService();
