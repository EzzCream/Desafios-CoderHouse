class Productos {
	constructor(producto) {
		this._producto = producto;
		this._producto = [];
	}
	get producto() {
		return this._producto;
	}
	addProducto(producto) {
		const producto1 = producto;
		let id = 1;
		this._producto.map(() => {
			return id++;
		});
		producto1.id = id;
		this._producto.push(producto1);
	}
}

export const producto1 = new Productos();
export let prod = producto1.producto;
