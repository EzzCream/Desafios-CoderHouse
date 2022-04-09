import { knex } from '../db.js';

export async function deleteUser(id) {
	try {
		await knex.del().from('productos').where('id_prod', id);
		console.log('Usuario borrado 🥵');
	} catch (error) {
		console.log(error);
	}
}
