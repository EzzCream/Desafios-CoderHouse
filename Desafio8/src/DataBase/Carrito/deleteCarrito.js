import { knex } from '../db.js';

export async function deleteCar(id_car) {
	try {
		await knex.del().from('carprod').where('idCarrito', id_car);
		await knex.del().from('carrito').where('id_carrito', id_car);
	} catch (error) {
		console.log(error);
	}
}
