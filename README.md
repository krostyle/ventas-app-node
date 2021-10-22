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



