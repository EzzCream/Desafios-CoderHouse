import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import './config/db.js';
import { producto1, prod } from './util/product.util.js';
import UserRouter from './routers/pages.routers.js';
import session from 'express-session';
import passport from './util/passport.utils.js';
import Yargs from 'yargs';
import { logger } from './logs/loggers.logs.js';

const yargs = Yargs(process.argv.slice(2));

const app = express();
const server = http.createServer(app);
const io = new Server(server);

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.use(
	session({
		secret: process.env.SECRET,
		const: {
			maxAge: Number(process.env.EXPIRE),
		},
		rolling: true,
		resave: true,
		saveUninitialized: true,
	}),
);

app.use(passport.initialize());
app.use(passport.session());
app.use('/', UserRouter);

//TODO ------------------ Vistas con EJS ---------------------
app.set('views', './src/views');
app.set('view engine', 'ejs');

const messages = [];

//TODO ----------- Conexion io ----------------
io.on('connection', (socket) => {
	logger.info('Usuario conectado 🥳');
	socket.emit('mensajeConexion', 'Bienvenido!');
	io.sockets.emit('mensajeBack', prod);
	io.sockets.emit('messageBack2', messages);

	socket.on('disconnect', () => {
		logger.info('Usuario desconectado 🥺');
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

const PORT = yargs.argv.PORT || 8080;
server.listen(PORT, () => {
	logger.info(`----------------------------------------------`);
	logger.info(`Server started on http://localhost:${PORT} ✨`);
	logger.info(`----------------------------------------------`);
});
server.on('error', (err) => logger.error(err));
