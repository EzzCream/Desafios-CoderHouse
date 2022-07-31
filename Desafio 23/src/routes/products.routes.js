import Router from 'koa-router';
import * as Product from '../controller/producto.controllers.js';

const router = new Router({
	prefix: '/api/productos',
});

router.get('/', Product.getProducts);

router.get('/:id', Product.getProductsById);

router.post('/', Product.createProducts);

router.delete('/:id', Product.deleteProduct);

router.put('/:id', Product.updateProduct);

export default router;
