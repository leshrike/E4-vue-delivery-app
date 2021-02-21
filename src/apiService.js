import axios from 'axios';

// const url = 'http://localhost:3000/'; url base, para hacer consultas deberemos añadir la tabla de forma manual

const url = 'http://backoffice.g01.batoilogic.es/api';
const DEBUG = true;

axios.interceptors.request.use((config) => {

    if (DEBUG) {
        console.info('Request', config);
    }
    const token = localStorage.token;
    if (token) {
        config.headers['Authorization'] = "Bearer " + localStorage.token;
    }
    return config;
}, (error) => {

    if (DEBUG) {
        console.error('Request error:', error);
    }

    return Promise.reject(error);
})


axios.interceptors.response.use((response) => {
    if (DEBUG) {
        console.info('Response', response);
    } return response;
}, (error) => {
    if (error.response && error.response.status !== 400) {
        alert("Response error: ", error);
    }
    return Promise.reject(error);
});


const orders = {//necesitaremos poder crear, mostrar, editar, y eliminar(???) las entregas del repartidor (??) -- ¿ Podriamos establecer que las entregas realizadas no se mostraran ? W/toggle?

    getAll: () => axios.get(`${url}/orders`),
    getOne: (id) => axios.get(`${url}/orders/${id}`),
    create: (item) => axios.post(`${url}/orders`, item),
    modify: (item) => axios.put(`${url}/orders/${item.id}`, item),
    delete: (id) => axios.delete(`${url}/orders/${id}`)
};

const states = {// solo necesitaremos obtener todos los estados y obtener uno, ya que no queremos que los datos puedan ser alterados (??) 

    getAll: () => axios.get(`${url}/states`),
    getOne: (id) => axios.get(`${url}/states/${id}`)

};

const users = {//login mediante U / PWD y el token es algo aplicado que no puede ser visible -> proceso interno , pero es vital para el funcionamiento de la app?? ¿Para que sirve el token?                

    //necesitaremos todos los métodos para hcer funcionar la app, ya que los trabajadores deben de poderse eliminar y deberiamos poder reasignar camiones a los repartidores (??)
    getAll: () => axios.get(`${url}/Users`),
    getOne: (id) => axios.get(`${url}/Users/${id}`),
    create: (item) => axios.post(`${url}/Users`, item),
    modify: (item) => axios.put(`${url}/Users/${item.id}`, item),
    delete: (id) => axios.delete(`${url}/Users/${id}`),
    
    login: (item) => new Promise((resolv, reject) => {
        axios.post(`${url}/login`,item)
            .then(response => {
                if (response.data) {
                    resolv(response.data.token)
                }
            })
            .catch(error => reject(error))
    }),
};

export default {
    orders,
    states,
    users,
};