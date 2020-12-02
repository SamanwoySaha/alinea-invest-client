import axios from 'axios';

const instance = axios.create({
    baseURL: "https://boiling-cliffs-05792.herokuapp.com/",
});

export default instance;