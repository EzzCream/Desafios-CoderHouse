import express from 'express';
import cluster from 'cluster';
import * as AuthController from './controllers/auth.controller.js';
import { logger } from './logs/loggers.logs.js';

if (cluster.isMaster) {
	logger.info(`Master ${process.pid} is running`);
	for (let i = 0; i < 4; i++) {
		cluster.fork();
	}
	cluster.on('exit', (worker) => {
		logger.warn(`Work ${worker.process.pid} died`);
		cluster.fork();
	});
} else {
	const app = express();

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	app.get('/api/randoms', AuthController.calculo);

	const PORT = process.env.PORT || 8080;
	const server = app.listen(PORT, () => {
		logger.info(`----------------------------------------------`);
		logger.info(
			`Server started on http://localhost:${PORT} ✨ - PID ${process.pid}`,
		);
		logger.info(`----------------------------------------------`);
	});
	server.on('error', (err) => logger.error(err));
}
