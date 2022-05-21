function calculo(cant) {
	let suma = 0;
	for (let i = 0; i < cant; i++) {
		suma++;
		console.log(suma);
	}
	return suma;
}

process.on('message', (msj) => {
	console.log(msj);
	const resultado = calculo(msj);
	process.send(resultado);
});
