import { knex } from '../db.js';

export async function addProducto(prod) {
	try {
		const response = await knex.insert(prod).from('productos');
		console.log('Producto agregados! 🥳');
		console.log(response);
	} catch (error) {
		console.log(error);
	}
}
