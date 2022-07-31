import koa from 'koa';
import dotenv from 'dotenv';
import koaBody from 'koa-body';
import ProductsKoa from './routes/products.routes.js';
import { logger } from './logsConfig/loggers.logs.js';
import './config/db.js';
//import cors from 'cors';

const app = new koa();
app.use(koaBody());

dotenv.config();

app.use(ProductsKoa.routes());

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
	logger.info(`----------------------------------------------`);
	logger.info(`Server started on http://localhost:${PORT} ✨`);
	logger.info(`----------------------------------------------`);
});
server.on('error', (err) => console.log(err));
