import { knex } from '../db.js';

export async function addCarrito(fecha) {
	try {
		const response = await knex.insert(fecha).from('carrito');
		console.log('Producto agregados! 🥳');
		console.log(response);
	} catch (error) {
		console.log(error);
	}
}
