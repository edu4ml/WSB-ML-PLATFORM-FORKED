import axios from '../axios';

class AuthService {
    async login(data) {
        // this is based on django-allauth package.
        // needed to post formData to use this endpoint

        let formData = new FormData();
        formData.append('login', data.login);
        formData.append('password', data.password);
        formData.append('remember', data.remember);

        const config = {
            headers: { 'content-type': 'multipart/form-data' },
        };

        return axios.post('/auth/login/', formData, config);
    }
}

export default new AuthService();
