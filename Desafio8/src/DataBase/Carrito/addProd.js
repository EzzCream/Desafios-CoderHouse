import { knex } from '../db.js';

export async function addProdCar(idcar, idprod) {
	try {
		const response = await knex
			.insert({ idCarrito: idcar, idProd: idprod })
			.from('carprod');
		console.log('Producto agregados! 🥳');
		console.log(response);
	} catch (error) {
		console.log(error);
	}
}
