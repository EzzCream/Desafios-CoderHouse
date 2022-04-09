import { knex } from '../db.js';

async function createTable() {
	try {
		const exist = await knex.schema.hasTable('carrito');
		if (!exist) {
			await knex.schema.createTable('carrito', (table) => {
				table.increments('id_carrito').primary().notNullable(),
					table.string('fecha_carrito', 50).notNullable();
			});
			console.log('Tabla creada ✨');
		} else {
			console.log('Ya existe la tabla 👁👄👁');
		}
	} catch (error) {
		console.log(error);
	} finally {
		knex.destroy();
	}
}

createTable();
