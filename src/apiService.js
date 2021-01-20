import axios from 'axios';

const url = 'http://localhost:3000/'; // url base, para hacer consultas deberemos añadir la tabla de forma manual

const deliveries = { //necesitaremos poder crear, mostrar, editar, y eliminar(???) las entregas del repartidor (??) -- ¿ Podriamos establecer que las entregas realizadas no se mostraran ? W/toggle?

    getAll:()=>axios.get(`${url}/deliveries`),
    getOne:(id)=>axios.get(`${url}/deliveries/${id}`),
    create:(item)=>axios.post(`${url}/deliveries`,item),
    modify:(item)=>axios.put(`${url}/deliveries/${item.id}`,item),
    delete:(id)=>axios.delete(`${url}/deliveries/${id}`)

};


const states = { // solo necesitaremos obtener todos los estados y obtener uno, ya que no queremos que los datos puedan ser alterados (??) 

    getAll:() => axios.get(`${url}/states`),
    getOne:(id) => axios.get(`${url}/states/${id}`)

};


const users = { //login mediante U / PWD y el token es algo aplicado que no puede ser visible -> proceso interno , pero es vital para el funcionamiento de la app?? ¿Para que sirve el token?
                
    //necesitaremos todos los métodos para hcer funcionar la app, ya que los trabajadores deben de poderse eliminar y deberiamos poder reasignar camiones a los repartidores (??)
    getAll:()=>axios.get(`${url}/deliveries`),
    getOne:(id)=>axios.get(`${url}/deliveries/${id}`),
    create:(item)=>axios.post(`${url}/deliveries`,item),
    modify:(item)=>axios.put(`${url}/deliveries/${item.id}`,item),
    delete:(id)=>axios.delete(`${url}/deliveries/${id}`)

};


export default {
    
    deliveries,
    states,
    users,
};