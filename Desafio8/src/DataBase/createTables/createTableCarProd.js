import { knex } from '../db.js';

async function createTable() {
	try {
		const exist = await knex.schema.hasTable('carprod');
		if (!exist) {
			await knex.schema.createTable('carprod', (table) => {
				table.integer('idCarrito').unsigned(),
					table.foreign('idCarrito').references('carrito.id_carrito'),
					table.integer('idProd').unsigned(),
					table.foreign('idProd').references('productos.id_prod');
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
