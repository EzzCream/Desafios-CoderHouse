const express = require('express');
const http = require('http');
const app = express();
const { engine } = require('express-handlebars');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const { faker } = require('@faker-js/faker');
const { ftruncate } = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

const messages = [];

//TODO ------------------ Vistas con HBS ---------------------
app.set('views', './src/views');
app.set('view engine', 'hbs');

app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		defaultLayout: 'index.hbs',
		layoutsDir: __dirname + '/views/layout',
		partialsDir: __dirname + '/views/partials',
	}),
);

//TODO ------------------ Conexion ---------------------
io.on('connection', (socket) => {
	console.log('Usuario conectado 🥳');
	socket.emit('mensajeConexion', 'Bienvenido!');
	io.sockets.emit('mensajeBack', prod);
	io.sockets.emit('messageBack2', messages);

	socket.on('disconnect', () => {
		console.log('Usuario desconectado 🥺');
	});
	socket.on('mensajeFront', (data) => {
		producto1.addProducto(data);
		io.sockets.emit('mensajeBack', prod);
	});

	//TODO ------------ Chat ---------------
	socket.on('messageFront2', (data) => {
		messages.push(data);
		io.sockets.emit('messageBack2', messages);
	});
});

function falso() {
	faker.locale = 'es';
	return {
		titulo: faker.commerce.productName(),
		precio: faker.commerce.price(),
		logo: faker.image.imageUrl(),
	};
}

//TODO ----------- Clase del producto ----------------
class Productos {
	constructor(producto) {
		this._producto = producto;
		this._producto = [];
	}
	get producto() {
		return this._producto;
	}
	addProducto(producto) {
		const producto1 = producto;
		let id = 1;
		this._producto.map(() => {
			return id++;
		});
		producto1.id = id;
		this._producto.push(producto1);
	}
	fakeProd() {
		for (let x = 0; x < 5; x++) {
			const pr = falso();
			pr.id = x + 1;
			this._producto.push(pr);
		}
	}
}

const producto1 = new Productos();
let prod = producto1.producto;

//TODO ------------------- GET Ir al historial ---------------------------------------
app.get('/productos', (req, res) => {
	res.render('main');
});
app.post('/api/productos-test', (req, res) => {
	producto1.fakeProd();
	res.status(200).send('Productos agregados');
});
app.get('/api/productos-test', (req, res) => {
	res.status(200).json(producto1.producto);
});

//TODO Server ajustes.
const PORT = 4000;
server.listen(PORT, () => {
	console.log(`👾 Server started on http://localhost:4000 !!`);
});
server.on('error', (err) => console.log(err));
