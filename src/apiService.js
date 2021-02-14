import axios from 'axios';

const url = 'http://localhost:3000/'; // url base, para hacer consultas deberemos añadir la tabla de forma manual

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


const deliveries = {//necesitaremos poder crear, mostrar, editar, y eliminar(???) las entregas del repartidor (??) -- ¿ Podriamos establecer que las entregas realizadas no se mostraran ? W/toggle?

    getAll: () => axios.get(`${url}deliveries`),
    getOne: (id) => axios.get(`${url}deliveries/${id}`),
    create: (item) => axios.post(`${url}deliveries`, item),
    modify: (item) => axios.put(`${url}deliveries/${item.id}`, item),
    delete: (id) => axios.delete(`${url}deliveries/${id}`)
};

const states = {// solo necesitaremos obtener todos los estados y obtener uno, ya que no queremos que los datos puedan ser alterados (??) 

    getAll: () => axios.get(`${url}state`),
    getOne: (id) => axios.get(`${url}state/${id}`)

};

const user = {//login mediante U / PWD y el token es algo aplicado que no puede ser visible -> proceso interno , pero es vital para el funcionamiento de la app?? ¿Para que sirve el token?                

    //necesitaremos todos los métodos para hcer funcionar la app, ya que los trabajadores deben de poderse eliminar y deberiamos poder reasignar camiones a los repartidores (??)
    getAll: () => axios.get(`${url}user`),
    getOne: (id) => axios.get(`${url}user/${id}`),
    create: (item) => axios.post(`${url}user`, item),
    modify: (item) => axios.put(`${url}user/${item.id}`, item),
    delete: (id) => axios.delete(`${url}user/${id}`),
    
    login: (item) => new Promise((resolv, reject) => {
        axios.get(`${url}user?email=${item.email}&password=${item.password}`)
            .then(response => {
                if (!response.data.length) {
                    resolv({
                        error: {
                            email: "Usuario no válido"
                        }
                    })
                } else {
                    resolv(response.data)
                }
            })
            .catch(error => reject(error))
    }),
};

export default {
    deliveries,
    states,
    user,
};