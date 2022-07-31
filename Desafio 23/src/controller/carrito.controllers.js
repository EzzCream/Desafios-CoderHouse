import { CartModels } from '../models/carrito.models.js';
import { time } from '../helpers/time.helpers.js';
import { ProductsModels } from '../models/producto.models.js';
import { logger } from '../logsConfig/loggers.logs.js';

export const createCart = async (ctx, next) => {
	try {
		const timestamp = time();
		const obj = {
			timestamp,
			products: [],
		};
		const response = await CartModels.create(obj);
		ctx.body = response;
	} catch (error) {
		logger.error(error);
	}
};

export const deleteCart = async (ctx, next) => {
	try {
		const { id } = ctx.params;
		const response = await CartModels.deleteOne({ _id: id });
		ctx.body = response;
	} catch (error) {
		logger.error(error);
	}
};

export const getCart = async (ctx, next) => {
	try {
		const { id } = ctx.params;
		const response = await CartModels.findOne({ _id: id });
		ctx.body = response.products;
	} catch (error) {
		logger.error(error);
	}
};

export const addProdCart = async (ctx, next) => {
	try {
		const { id, idProd } = ctx.params;
		const product = await ProductsModels.findOne({ _id: idProd });
		const cart = await CartModels.findOne({ _id: id });

		const { products } = cart;
		products.push(product);

		const response = await CartModels.updateOne({ _id: id }, { products });

		ctx.body = response;
	} catch (error) {
		logger.error(error);
	}
};

export const deleteProdCart = async (ctx, next) => {
	try {
		const { id, idProd } = ctx.params;
		const cart = await CartModels.findOne({ _id: id });
		const { products } = cart;

		const newProd = products.filter((res) => {
			res._id !== idProd;
		});

		const response = await CartModels.updateOne(
			{ _id: id },
			{ products: newProd },
		);

		ctx.body = response;
	} catch (error) {
		logger.error(error);
	}
};
