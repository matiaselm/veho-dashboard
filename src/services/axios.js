import axios from 'axios';

console.log(process.env.REACT_APP_API_TOKEN)
const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.REACT_APP_API_TOKEN
    }
});

export default instance;
