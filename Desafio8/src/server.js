import express from 'express';
import { addProducto } from './DataBase/Productos/addProducto.js';
import {
	readProducto,
	readProductoId,
} from './DataBase/Productos/readProducto.js';
import { updateById } from './DataBase/Productos/updateProducto.js';
import { deleteUser } from './DataBase/Productos/deleteProducto.js';
import { addCarrito } from './DataBase/Carrito/addCarrito.js';
import { readCarrito } from './DataBase/Carrito/readCarrito.js';
import { addProdCar } from './DataBase/Carrito/addProd.js';
import { listProdId } from './DataBase/Carrito/listProdId.js';
import { deleteProdId } from './DataBase/Carrito/deleteProdId.js';
import { deleteCar } from './DataBase/Carrito/deleteCarrito.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const routerProductos = express.Router();
const routerCarrito = express.Router();

const perfil = true;

//* --------------- PRODUCTOS ---------------------

//* ------ Enlistar productos -------
routerProductos.get('/', async (req, res) => {
	try {
		res.status(200).json(await readProducto());
	} catch (error) {
		console.log(error);
	} finally {
		res.destroy();
	}
});
//* ------ Enlistar producto por id -------
routerProductos.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		res.status(200).json(await readProductoId(id));
	} catch (error) {
		console.log(error);
	} finally {
		res.destroy();
	}
});
//* ------ Incorporar productos -------
routerProductos.post('/', (req, res) => {
	try {
		if (perfil == true) {
			const { body } = req;
			addProducto(body);
			res.status(200).json('Autorizado');
		} else {
			res.status(401).send('No autorizado');
		}
	} catch (error) {
		console.log(error);
	} finally {
		res.destroy();
	}
});
//* ------ Actualizar productos -------
routerProductos.put('/:id', (req, res) => {
	try {
		if (perfil == true) {
			const { id } = req.params;
			const { body } = req;
			updateById(id, body);
			res.status(200).send('Producto actualizado');
		} else {
			res.status(401).send('No autorizado');
		}
	} catch (error) {
		console.log(error);
	} finally {
		res.destroy();
	}
});
//* ------ Borrar productos -------
routerProductos.delete('/:id', (req, res) => {
	try {
		if (perfil == true) {
			const { id } = req.params;
			deleteUser(id);
			res.status(200).send('Producto borrado');
		} else {
			res.status(401).send('No autorizado');
		}
	} catch (error) {
		console.log(error);
	} finally {
		res.destroy();
	}
});

//* --------------- CARRITO ---------------------

//* -------- Crear carrito -----------
routerCarrito.post('/', (req, res) => {
	try {
		const tiempoTranscurrido = Date.now();
		const hoy = new Date(tiempoTranscurrido);
		hoy.toUTCString();
		const tiempo = hoy.toUTCString();
		addCarrito({ fecha_carrito: tiempo });
		res.status(200).send('Carrito guardado');
	} catch (error) {
		console.log(error);
	} finally {
		res.destroy();
	}
});
//* -------- Ver todos los carritos -----------
routerCarrito.get('/', async (req, res) => {
	try {
		res.status(200).json(await readCarrito());
	} catch (error) {
		console.log(error);
	} finally {
		res.destroy();
	}
});
//* -------- Vaciar carrito y lo elimina -----------
routerCarrito.delete('/:id', (req, res) => {
	try {
		const { id } = req.params;
		deleteCar(id);
		res.status(200).send('Carrito eliminado');
	} catch (error) {
		console.log(error);
	} finally {
		res.destroy();
	}
});
//* -------- Enlistar productos guardados -----------
routerCarrito.get('/:id/productos', async (req, res) => {
	try {
		const { id } = req.params;
		res.status(200).json(await listProdId(id));
	} catch (error) {
		console.log(error);
	} finally {
		res.destroy();
	}
});
//* -------- Incorporar productos por id -----------
routerCarrito.post('/:id/productos/:id_prod', (req, res) => {
	try {
		const { id, id_prod } = req.params;
		addProdCar(id, id_prod);
		res.status(200).send('Producto agregado al carrito');
	} catch (error) {
		console.log(error);
	} finally {
		res.destroy();
	}
});
//* -------- Eliminar producto por id -----------
routerCarrito.delete('/:id/productos/:id_prod', (req, res) => {
	try {
		const { id, id_prod } = req.params;
		deleteProdId(id, id_prod);
		res.status(200).send('Borrar producto');
	} catch (error) {
		console.log(error);
	} finally {
		res.destroy();
	}
});

app.use('/api/productos', routerProductos);
app.use('/api/carrito', routerCarrito);

const PORT = 8080;
const server = app.listen(PORT, () => {
	console.log(`🥲 Server started on http://localhost:8080`);
});
server.on('error', (err) => console.log(err));
