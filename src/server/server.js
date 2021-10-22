const express = require('express')
const morgan = require('morgan')
const exphbs = require('express-handlebars')
const cors = require('cors')
const path = require('path')
const configurations = require('../config/config')

//Importing routes
const clientesRoutes = require('../routes/clientes.routes')
const ventasRoutes = require('../routes/ventas.routes')
const detallesRoutes = require('../routes/detalles.routes')
const productosRoutes = require('../routes/productos.routes')

//Config paths
const paths = {
    clientes: "/api/clientes",
    productos: "/api/productos",
    ventas: "/api/ventas",
    detalles: "/api/detalles",
    index: "/",
    // auth: "/api/auth"
};

//Initialization
const app = express();

//Settings
//Port
app.set('port', configurations.PORT);
//View engine
app.set('views', path.join(__dirname, '../views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');




//Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Routes
// app.use(paths.auth, loginRoutes);
app.use(paths.index, clientesRoutes);
app.use(paths.clientes, clientesRoutes);
app.use(paths.ventas, ventasRoutes);
app.use(paths.detalles, detallesRoutes);
app.use(paths.productos, productosRoutes);

//Static files
app.use('/bootswatch', express.static(path.join(__dirname, '../../node_modules/bootswatch/dist')));
app.use('/axios', express.static(path.join(__dirname, '../../node_modules/axios/dist')))
app.use('/sweetalert', express.static(path.join(__dirname, '../../node_modules/sweetalert2/dist')))
app.use('/moment', express.static(path.join(__dirname, '../../node_modules/moment/min')))
app.use(express.static(path.join(__dirname, '../public')));


module.exports = app;