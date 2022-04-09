import { knex } from '../db.js';

export async function updateById(id, prod) {
	try {
		await knex.from('productos').update(prod).where('id_prod', id);
		console.log('Usuario actualizado 🤪');
	} catch (error) {
		console.log(error);
	}
}
