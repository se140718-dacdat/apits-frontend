import axios from "axios";

export default axios.create({
    baseURL: 'https://fu-apits-be.azurewebsites.net/'
    // baseURL: 'http://localhost:8080/'
});