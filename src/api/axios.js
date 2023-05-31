import axios from "axios";

export default axios.create({
    baseURL: 'https://apits-befu.azurewebsites.net/'
    // baseURL: 'http://localhost:8080/'
});