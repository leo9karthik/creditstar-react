import axios from 'axios'
const { REACT_APP_DEVELOPMENTURL } = process.env;

const Interceptor = () => {

    axios.defaults.baseURL = REACT_APP_DEVELOPMENTURL;


    axios.interceptors.request.use(function (config) {
        config.headers.Accept = "application/json";


        return config;
    }, function (error) {
        console.log(error);

        return Promise.reject(error);
    });


}

export default Interceptor
