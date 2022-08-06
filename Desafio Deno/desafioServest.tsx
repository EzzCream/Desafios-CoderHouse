import {
	contentTypeFilter,
	createApp,
} from 'https://deno.land/x/servest@v1.3.1/mod.ts';
import ReactDOMServer from 'https://esm.sh/react-dom@18.2.0/server';
import React from 'https://esm.sh/react@18.2.0';

const app = createApp();

const colores: string[] = [];

app.post(
	'/',
	contentTypeFilter('application/x-www-form-urlencoded'),
	async (req) => {
		const bodyForm = await req.formData();
		try {
			const color: string = bodyForm.value('color') ?? '';
			colores.push(color);
		} finally {
			await bodyForm.removeAll();
		}
	},
);

app.handle('/', async (req: any) => {
	await req.respond({
		status: 200,
		headers: new Headers({
			'content-type': 'text/html; charset=utf-8',
		}),
		body: ReactDOMServer.renderToString(
			<html>
				<body>
					<div style={{ margin: '60px' }}>
						<h3>Seleccioná un Color ✨</h3>
						<form action="/" method="POST">
							<select name="color">
								<option value="Yellow">Yellow</option>
								<option value="Red">Red</option>
								<option value="Green">Green</option>
								<option value="Brown">Brown</option>
								<option value="Lime">Lime</option>
								<option value="White">White</option>
								<option value="Blue">Blue</option>
								<option value="Aqua">Aqua</option>
								<option value="Gray">Gray</option>
								<option value="Navy">Navy</option>
							</select>
							<input type="submit" value="Enviar" />
						</form>
						<br />
						{colores.length > 0 ? (
							<div style={{ backgroundColor: 'black' }}>
								<h5> Colores Registrados</h5>
								<ul>
									{colores.map((color) => {
										return (
											<li style={{ color: color }}>
												{color}
											</li>
										);
									})}
								</ul>
							</div>
						) : (
							<h5>No hay colores registrados</h5>
						)}
					</div>
				</body>
			</html>,
		),
	});
});

const port = 8080;
console.log('----------------------------------------------');
console.log(`Server started on http://localhost:${port} ✨`);
console.log('----------------------------------------------');

app.listen({ port });
