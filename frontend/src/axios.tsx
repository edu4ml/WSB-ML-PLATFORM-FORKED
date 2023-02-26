import axios from 'axios';
import Cookies from 'js-cookie';

const API_ENDPOINT = 'http://127.0.0.1:8000';

const axiosService = axios.create({
    withCredentials: true,
    baseURL: API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken'),
    },
});

axios.defaults.baseURL = API_ENDPOINT;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

export default axiosService;
