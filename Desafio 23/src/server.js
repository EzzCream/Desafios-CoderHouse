import koa from 'koa';
import dotenv from 'dotenv';
import koaBody from 'koa-body';
import ProductsKoa from './routes/products.routes.js';
//import cors from 'cors';

const app = new koa();
app.use(koaBody());

dotenv.config();

app.use(ProductsKoa.routes());

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
	console.log(`----------------------------------------------`);
	console.log(`Server started on http://localhost:${PORT} ✨`);
	console.log(`----------------------------------------------`);
});
server.on('error', (err) => console.log(err));
