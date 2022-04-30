const { normalize, denormalize, schema } = require('normalizr');
const util = require('util');

const holding = {
	id: '10000',
	empresas: [
		{
			id: '1000',
			nombre: 'Coderhouse',
			gerente: {
				id: '2',
				nombre: 'Pedro',
				apellido: 'Mei',
				DNI: '20442639',
				direccion: 'CABA 457',
				telefono: '1567811544',
			},
			encargado: {
				id: '3',
				nombre: 'Pablo',
				apellido: 'Blanco',
				DNI: '20442640',
				direccion: 'CABA 458',
				telefono: '1567811545',
			},
			empleados: [
				{
					id: '1',
					nombre: 'Nicole',
					apellido: 'Gonzalez',
					DNI: '20442638',
					direccion: 'CABA 456',
					telefono: '1567811543',
				},
				{
					id: '2',
					nombre: 'Pedro',
					apellido: 'Mei',
					DNI: '20442639',
					direccion: 'CABA 457',
					telefono: '1567811544',
				},
				{
					id: '3',
					nombre: 'Pablo',
					apellido: 'Blanco',
					DNI: '20442640',
					direccion: 'CABA 458',
					telefono: '1567811545',
				},
				{
					id: '4',
					nombre: 'Ana',
					apellido: 'Rojo',
					DNI: '20442641',
					direccion: 'CABA 459',
					telefono: '1567811546',
				},
				{
					id: '5',
					nombre: 'Lucia',
					apellido: 'Sorbo',
					DNI: '20442642',
					direccion: 'CABA 460',
					telefono: '1567811547',
				},
				{
					id: '6',
					nombre: 'Jose',
					apellido: 'Pieres',
					DNI: '20442643',
					direccion: 'CABA 461',
					telefono: '1567811548',
				},
				{
					id: '7',
					nombre: 'Maria',
					apellido: 'Lopez',
					DNI: '20442644',
					direccion: 'CABA 462',
					telefono: '1567811549',
				},
			],
		},
		{
			id: '1001',
			nombre: 'Coderhouse2',
			gerente: {
				id: '6',
				nombre: 'Jose',
				apellido: 'Pieres',
				DNI: '20442643',
				direccion: 'CABA 461',
				telefono: '1567811548',
			},
			encargado: {
				id: '5',
				nombre: 'Lucia',
				apellido: 'Sorbo',
				DNI: '20442642',
				direccion: 'CABA 460',
				telefono: '1567811547',
			},
			empleados: [
				{
					id: '1',
					nombre: 'Nicole',
					apellido: 'Gonzalez',
					DNI: '20442638',
					direccion: 'CABA 456',
					telefono: '1567811543',
				},
				{
					id: '2',
					nombre: 'Pedro',
					apellido: 'Mei',
					DNI: '20442639',
					direccion: 'CABA 457',
					telefono: '1567811544',
				},
				{
					id: '5',
					nombre: 'Lucia',
					apellido: 'Sorbo',
					DNI: '20442642',
					direccion: 'CABA 460',
					telefono: '1567811547',
				},
				{
					id: '6',
					nombre: 'Jose',
					apellido: 'Pieres',
					DNI: '20442643',
					direccion: 'CABA 461',
					telefono: '1567811548',
				},
				{
					id: '7',
					nombre: 'Maria',
					apellido: 'Lopez',
					DNI: '20442644',
					direccion: 'CABA 462',
					telefono: '1567811549',
				},
				{
					id: '8',
					nombre: 'Lucio',
					apellido: 'Garcia',
					DNI: '20442645',
					direccion: 'CABA 463',
					telefono: '1567811550',
				},
			],
		},
		{
			id: '1002',
			nombre: 'Coderhouse3',
			gerente: {
				id: '9',
				nombre: 'Diego',
				apellido: 'Sojo',
				DNI: '20442646',
				direccion: 'CABA 464',
				telefono: '1567811551',
			},
			encargado: {
				id: '8',
				nombre: 'Lucio',
				apellido: 'Garcia',
				DNI: '20442645',
				direccion: 'CABA 463',
				telefono: '1567811550',
			},
			empleados: [
				{
					id: '4',
					nombre: 'Ana',
					apellido: 'Rojo',
					DNI: '20442641',
					direccion: 'CABA 459',
					telefono: '1567811546',
				},
				{
					id: '5',
					nombre: 'Lucia',
					apellido: 'Sorbo',
					DNI: '20442642',
					direccion: 'CABA 460',
					telefono: '1567811547',
				},
				{
					id: '6',
					nombre: 'Jose',
					apellido: 'Pieres',
					DNI: '20442643',
					direccion: 'CABA 461',
					telefono: '1567811548',
				},
				{
					id: '7',
					nombre: 'Maria',
					apellido: 'Lopez',
					DNI: '20442644',
					direccion: 'CABA 462',
					telefono: '1567811549',
				},
				{
					id: '9',
					nombre: 'Diego',
					apellido: 'Sojo',
					DNI: '20442646',
					direccion: 'CABA 464',
					telefono: '1567811551',
				},
			],
		},
	],
};

const personaSchema = new schema.Entity('persona');
const encargadoSchema = new schema.Entity('encargado', {
	encargado: personaSchema,
});
const gerenteSchema = new schema.Entity('gerente', {
	gerente: personaSchema,
});
const empresaSchema = new schema.Entity('empresa', {
	gerente: gerenteSchema,
	encargado: encargadoSchema,
	empleados: [personaSchema],
});

const empresasSchema = new schema.Entity('empresas', {
	empresas: [empresaSchema],
});

const holdingNormalizado = normalize(holding, empresasSchema);

const print = (data) => {
	console.log(util.inspect(data, false, 12, true));
};
console.log(
	'----------------------- NORMALIZADO -----------------------------',
);

print(holdingNormalizado);

const holdingDesnormalizado = denormalize(
	holdingNormalizado.result,
	empresasSchema,
	holdingNormalizado.entities,
);
console.log(
	'----------------------- DESNORMALIZADO -----------------------------',
);

print(holdingDesnormalizado);

console.log(`Longitud inicial: ${JSON.stringify(holding).length} `);
console.log(
	`Longitud Normalizado: ${JSON.stringify(holdingNormalizado).length} `,
);
console.log(
	`Longitud Desnormalizado: ${JSON.stringify(holdingDesnormalizado).length} `,
);

console.log(
	'% Compresión: ',
	Math.round(
		((JSON.stringify(holding).length -
			JSON.stringify(holdingNormalizado).length) /
			JSON.stringify(holding).length) *
			100,
	),
);
