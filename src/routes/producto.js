const routerP = require('express').Router();

const {
    obtenerProductos,
    crearProducto,
    modificarProducto,
    eliminarProducto
} = require('../controllers/productos');

routerP.get('/',obtenerProductos)
routerP.post('/', crearProducto)
routerP.put('/:nombre', modificarProducto)
routerP.delete('/', eliminarProducto)

module.exports = routerP;