import { knex } from '../db.js';

export async function listProdId(id) {
	try {
		const user = await knex.select().from('carprod').where('idCarrito', id);
		return user;
	} catch (error) {
		console.log(error);
	}
}
