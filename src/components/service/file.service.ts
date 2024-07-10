import axios from 'axios';
import User from '../../models/User';
import { url } from 'inspector';
import { type } from 'os';
import { error, log } from "console";

const BASE_URL = "http://localhost:5000";
export default new class FileService {

    getAllDiscussions() {
        return axios.get(`${BASE_URL}/discussion`);
    }
    getAllUsers() {
        return axios.get(`${BASE_URL}/users`);
    }
    getAllCases() {
        return axios.get(`${BASE_URL}/cases`);
    }
    getUserById(id: any) {
        return axios.get(`${BASE_URL}/users/${id}`);
    }
    createUser(user: User) {
        console.log(`${BASE_URL}/users`, user)
        return axios.post(`${BASE_URL}/users`, user);
    }
    getUserByIdAndPwd(first_name: any, last_name: any, password: any) {
        console.log(first_name, last_name, password)
        return axios.get(`${BASE_URL}/users/${first_name}/${last_name}/${password}`);
    }
    deleteUser(id: any) {
        return axios.delete(`${BASE_URL}/users/${id}`);
    }
    updateUser(user: User) {
        return axios.put(`${BASE_URL}/users`, user);
    }
    getUserCases(id: any) {
        console.log(`${BASE_URL}/cases/userId/${id}`)
        return axios.get(`${BASE_URL}/cases/userId/${id}`);
    }
    async sendPdf(file: any[]) {
        try {
            console.log(file[0])
            let reader = new FileReader();
            reader.readAsDataURL(file[0])
            let formData = new FormData();
            formData.append('pdf_file', file[0]);

            const res = await axios.post(BASE_URL + '/files/upload', reader, { headers: { "Content-Type": "multipart/form-data" } });
            console.log(res.data);
            return res.data;

        } catch (err) {
            console.log("error", err);
            throw err;
        }
    }
    async getPdfById(id: any) {
        axios.get(`${BASE_URL}/files/getFileById/${id}`).then((res: any) => {
            console.log(res.data[0])
            console.log(typeof (res.data))
            const blob = new Blob([res.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            console.log('url in service')
            console.log(url)
            return url;
        })
    }
}

