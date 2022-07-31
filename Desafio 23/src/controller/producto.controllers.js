import { time } from '../helpers/time.helpers.js';
import { logger } from '../logsConfig/loggers.logs.js';
import { ProductsModels } from '../models/producto.models.js';
import DAO from '../services/DAO/generalFaactory.DAO.js';

export const getProducts = async (ctx, next) => {
	try {
		const response = await DAO.getFind(ProductsModels);
		ctx.body = response;
		next();
	} catch (error) {
		logger.error(error);
	}
};

export const getProductsById = async (ctx, next) => {
	try {
		const { id } = ctx.params;
		const _id = id;
		const response = await DAO.getAll(ProductsModels, _id);
		ctx.body = response;
	} catch (error) {
		logger.error(error);
	}
};

export const createProducts = async (ctx, next) => {
	try {
		time();
		const timestamp = time();
		const { body } = ctx.request.body;
		const obj = {
			...body,
			timestamp,
		};
		const response = DAO.create(ProductsModels, obj);
		ctx.body = response;
	} catch (error) {
		logger.error(error);
	}
};

export const deleteProduct = async (ctx, next) => {
	try {
		const { id } = ctx.params;
		const _id = id;
		const response = DAO.deleteOne(ProductsModels, _id);
		ctx.body = response;
	} catch (error) {
		logger.error(error);
	}
};

export const updateProduct = async (ctx, next) => {
	try {
		const { body } = ctx.request.body;
		const { id } = ctx.params;
		time();
		const timestamp = time();
		const obj = {
			...body,
			timestamp,
		};
		const response = await ProductsModels.updateOne({ _id: id }, obj);
		ctx.body = response;
	} catch (error) {
		logger.error(error);
	}
};
