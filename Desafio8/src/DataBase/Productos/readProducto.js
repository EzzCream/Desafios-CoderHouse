import { knex } from '../db.js';

export async function readProducto() {
	try {
		const user = await knex.select().from('productos');
		return user;
	} catch (error) {
		console.log(error);
	}
}

export async function readProductoId(prod) {
	try {
		const user = await knex
			.select()
			.from('productos')
			.where('id_prod', prod);
		return user;
	} catch (error) {
		console.log(error);
	}
}
