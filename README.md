# Aplicación de Ventas MVC WherEx
Aplicación con el patrón MVC para la gestión de ventas de productos a clientes.
## Tecnologías
- [Express](https://expressjs.com/) - Framework de NodeJS
- [PostreSQL](https://www.postgresql.org/) - Base de datos relacional
- [NodeJS](https://nodejs.org/)/[Javascript](https://www.javascript.com/) - Lenguaje de programación
- [Bootstrap](https://getbootstrap.com/) - Framework de diseño
- [Bootswatch](https://bootswatch.com/) - Temas de diseño
- [Git](https://git-scm.com/) - Sistema de control de versiones
- [Sequelize](https://sequelize.org/) - ORM para PostreSQL
- [Handlebars](https://handlebarsjs.com/) - Motor de plantillas
- [Moment](https://momentjs.com/) - Manejo de fechas
- [sweetalert2](https://sweetalert2.github.io/) - Alertas

## Instalación
Para el correcto funcionamiento de la Aplicación es necesario tener instalado PostgreSQL y crear sus respectivas tablas, las cuales se encuentran dentro de la carpeta sql con todas las sentencias necesarias para su respectiva creación.

```bash
#Reconstruir modulos de Node
npm install
```

```bash
#Levantar App - requiere nodemon
npm start
```
# Notas
- Se hicieron algunas modificaciones en las relaciones de las tablas, para que se puedan realizar las consultas correctamente.
- Se hace el supuesto de que los productos ya tienen el IVA incluido.
- IVA se calcula en base al total de la venta.

# Vistas
## Clientes
![Clientes](https://user-images.githubusercontent.com/32950166/138567587-465c0adc-7a82-4ca8-a35f-518186c3584a.png)

## Productos
![image](https://user-images.githubusercontent.com/32950166/138567605-768211ce-cc7c-41ea-8df3-05082b3f1ab1.png)

## Añadir Productos
![image](https://user-images.githubusercontent.com/32950166/138567635-7c849117-a428-4ec2-9b64-335f093f7dac.png)

## Editar Productos
![image](https://user-images.githubusercontent.com/32950166/138567664-dfea330c-441b-450f-8619-dbd45d5ab4e8.png)

## Ventas
![image](https://user-images.githubusercontent.com/32950166/138567675-98b836b4-cc34-4d6a-8d47-ce9f15f94384.png)

## Editar/Añadir Ventas/Detalles
![image](https://user-images.githubusercontent.com/32950166/138567743-99906334-5eb3-4d03-a298-8535e8fb8d6c.png)

# Diagrama ER

![DiagramaER](https://user-images.githubusercontent.com/32950166/138541926-96b08bd1-911d-4418-b3dd-01da677e0fcb.png)

