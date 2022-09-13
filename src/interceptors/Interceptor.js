import axios from 'axios'
import * as variables from '../components/Variables';


const Interceptor = () => {


    axios.defaults.baseURL = variables.baseURL;



    console.log(variables.baseURL);


    axios.interceptors.request.use(function (config) {
        // // Do something before request is sent
        // let noAuth = config.headers.noAuth;
        // console.log(noAuth);
        config.headers.Accept = "application/json";


        // if (!noAuth) {
        //     // let accessToken = 'AUTH TOKEN 123';
        //     let accessToken = localStorage.getItem('token');
        //     if (accessToken) {
        //         config.headers.authorization = 'Bearer ' + accessToken;
        //     } else {
        //         // console.log('No authentification... Please redirect!');
        //         // console.log('No authentification!');
        //     }
        // }


        return config;
    }, function (error) {
        // Do something with request error
        console.log(error);
        return Promise.reject(error);
    });


}

export default Interceptor
