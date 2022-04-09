import { knex } from '../db.js';

export async function deleteProdId(id_car, id_prod) {
	try {
		await knex
			.del()
			.from('carprod')
			.where({ idCarrito: id_car, idProd: id_prod });
	} catch (error) {
		console.log(error);
	}
}
