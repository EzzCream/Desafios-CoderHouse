import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import session from 'express-session';
import { auth } from './middleware/auth.middleware.js';
import MongoStore from 'connect-mongo';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use(
	session({
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI,
			options: {
				useNewUrlParser: true,
				userUnifiedTopology: true,
			},
		}),
		secret: process.env.SECRET,
		resave: true,
		saveUninitialized: true,
	}),
);

//TODO ------------------ Vistas con EJS ---------------------
app.set('views', './src/views');
app.set('view engine', 'ejs');

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
}

const producto1 = new Productos();
const messages = [];
let prod = producto1.producto;

//TODO ----------- Conexion io ----------------
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

app.get('/login', (req, res) => {
	res.render('pages/login');
});

const prueba = [];

app.post('/inicio', (req, res) => {
	const { body } = req;
	req.session.login = true;
	console.log(body);
	prueba.push(body);
	res.send(
		'<script type="text/javascript">window.location.href = "http://localhost:8080/productos";</script>',
	);
});

app.post('/logout', (req, res) => {
	req.session.destroy((err) => {
		if (!err) {
			res.status(200).send(
				'<script type="text/javascript">alert("Hasta pronto...");window.location.href = "http://localhost:8080/login";</script>',
			);
		} else {
			res.json(err);
		}
	});
});

app.get('/productos', auth, (req, res) => {
	console.log(prueba);
	res.render('pages/index', { prod, prueba });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
	console.log(`----------------------------------------------`);
	console.log(`Server started on http://localhost:${PORT} ✨`);
	console.log(`----------------------------------------------`);
});
server.on('error', (err) => console.log(err));
