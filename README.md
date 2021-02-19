# Aplicación de Repartidor de Batoilogic 

En esta aplicación hacemos uso de una API creada con laravel para obtener todos los datos de los envíos realizados por los clientes a través de la aplicación de tienda.

Los repartidores podrán ver los paquetes a repartir en la jornada y podrán modificar el estado de éstos haciendo uso de un apartado select, con el cual evitaremos todo tipo de errores.

Además,  los repartidores podrán hacer cambios en el orden o prioridad de los paquetes, haciendo uso de los botones disponibles en la sección "Acciones" de la tabla de entregas.

# Tienda batoilogic

Desde la aplicación de la tienda de batoilogic, los usuarios podrán visionar todos los productos que se encuentran a su disposición, además de poder hacer pedidos, de los mismos pedidos podríamos consultar sus datos. Podremos también consultar la información de contacto de la empresa.

## Servidores (DDAW)
### SSH pem
```
DNS:
ssh -i "ddaw-dns-g01.pem" ubuntu@ec2-3-87-12-100.compute-1.amazonaws.com
Base de datos:
ssh -i "ddaw-dns-g01.pem" ubuntu@ec2-54-89-160-135.compute-1.amazonaws.com
Web:
ssh -i "ddaw-dns-g01.pem" ubuntu@ec2-3-87-71-72.compute-1.amazonaws.com
```
### SSH id_rsa.pub.
```
DNS:
ssh batoilogic@ec2-3-87-12-100.compute-1.amazonaws.com // ssh batoilogic@3.87.12.100
Base de datos:
ssh batoilogic@ec2-54-89-160-135.compute-1.amazonaws.com // ssh batoilogic@54.89.160.135
Web:
ssh batoilogic@ec2-3-87-71-72.compute-1.amazonaws.com // ssh batoilogic@3.87.71.72
```
### IP publicas
- DNS: 3.87.12.100
- Servidor de aplicaciones:  54.89.160.135
- Servidor web: 3.87.71.72
### Páginas + Enlaces
[www.g01.batoilogic.es](http:www.g01.batoilogic.es)  
[reparto.g01.batoilogic.es](http:reparto.g01.batoilogic.es)  
[backoffice.g01.batoilogic.es](http:backoffice.g01.batoilogic.es) 


## Todos los repositorios del proyecto


[CRUD y Backoffice -- Laravel](https://github.com/leshrike/batoilogic)  
[App de repartidor -- Vue JS](https://github.com/leshrike/repartidor_batoilogic)  
[App de tienda -- Vue JS](https://github.com/leshrike/tienda-batoilogic)  
[Estilos y Guia de estilos](https://github.com/olbapgit/BatoiLogicDiw)

## Aplicación de repartidor -- Vue

### Descargar
Primero tendremos que descargar el repositorio que contiene nuestros archivos.

### Instalación
Primero lanzaremos el siguiente comando: 
```prolog
npm install
```
Esto lo que hará es que se instalen todos los módulos necesarios.

### Librerias adicionales.
También necesitaremos las siguientes librerías si no hay partes de la aplicación que no funcionarán. 

#### Libreria de bootstrap
Esta libreria le dara un mejor aspecto a nuestra pagina web.
```prolog
vue add bootstrap-cli
```

#### Libreria de vee-validate
Esta libreria nos permitira validar los formularios.
```prolog
npm install -S vee-validate
```

#### Libreria de axios
Esta libreria nos dara acceso a los datos que obtendremos de nuestro servidor de Base de Datos
```prolog
npm install -S axios
```
### Versiones
La versión utilizada es:
```yaml
-vue: 2.11
-vue-template-compiler: 2.6.12
-bootstrap: 4.5.2 // bootstrap base
-bootstrap-vue: 2.17.3 // bootstrap adaptado a VUE JS 
-sass: 1.26.11
-sass loader: 10.0.2
-popper.js: 1.16.1
-eslint: 6.7.2
-portal.vue: 2.1.7
-vuex: 3.4.0
-vue-router:3.2.0 // redirecciones de VUE
-core-js 3.6.5 
-vee-validate: 3.4.5 // validación de formularios
-axios: 0.21.1 // peticiones AJAX
```

## App en funcionamiento

### Login

[Panel del login](capturas de pantalla app repartidor/login.png)


### Tabla de pedidos

[Panel de pedidos](capturas de pantalla app repartidor/pedidos.png)
