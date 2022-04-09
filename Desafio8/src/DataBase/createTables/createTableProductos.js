import { knex } from '../db.js';

async function createTable() {
	try {
		const exist = await knex.schema.hasTable('productos');
		if (!exist) {
			await knex.schema.createTable('productos', (table) => {
				table.increments('id_prod').primary().notNullable(),
					table.string('nombre_prod', 20).notNullable(),
					table.string('descripcion_prod', 20).notNullable(),
					table.integer('codigo_prod').notNullable(),
					table.integer('precio_prod').notNullable(),
					table.integer('stock_prod').notNullable(),
					table.string('fecha_prod', 20).notNullable(),
					table.string('logo_prod', 50).notNullable();
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
