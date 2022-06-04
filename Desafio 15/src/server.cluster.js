import express from 'express';
import cluster from 'cluster';
import * as AuthController from './controllers/auth.controller.js';

if (cluster.isMaster) {
	console.log(`Master ${process.pid} is running`);
	for (let i = 0; i < 4; i++) {
		cluster.fork();
	}
	cluster.on('exit', (worker) => {
		console.log(`Work ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	const app = express();

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.get('/api/randoms', AuthController.calculo);

	const PORT = process.env.PORT || 8080;
	const server = app.listen(PORT, () => {
		console.log(`----------------------------------------------`);
		console.log(
			`Server started on http://localhost:${PORT} ✨ - PID ${process.pid}`,
		);
		console.log(`----------------------------------------------`);
	});
	server.on('error', (err) => console.log(err));
}
