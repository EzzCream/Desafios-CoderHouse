import { knex } from '../db.js';

export async function readCarrito() {
	try {
		const user = await knex.select().from('carrito');
		return user;
	} catch (error) {
		console.log(error);
	}
}
