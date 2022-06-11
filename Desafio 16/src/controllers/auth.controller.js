import path from 'path';
import { prod } from '../util/product.util.js';
import { fork } from 'child_process';
import { logger } from '../logs/loggers.logs.js';

export function getSignup(req, res) {
	res.sendFile(path.resolve() + '/src/views/pages/signup.html');
}
export function postSignup(req, res) {
	const user = req.user;
	logger.info(user);
	res.sendFile(path.resolve() + '/src/views/pages/login.html');
}
export function failSignup(req, res) {
	res.render('pages/failSignup', {});
}
export function getLogin(req, res) {
	if (req.isAuthenticated()) {
		const prueba = req.user;
		res.render('pages/index', { prueba: prueba.username, prod });
	} else {
		res.sendFile(path.resolve() + '/src/views/pages/login.html');
	}
}
export function postLogin(req, res) {
	const user = req.user;
	logger.info(user);
	res.sendFile(path.resolve() + '/src/views/pages/index.html');
}
export function failLogin(req, res) {
	res.sendFile(path.resolve() + '/src/views/pages/login.html');
}
export function logout(req, res) {
	req.logout();
	res.sendFile(path.resolve() + '/src/views/pages/login.html');
}
export function Info(req, res) {
	const info = {
		arg: process.cwd(),
		pro: process.pid,
		ver: process.version,
		tit: process.title,
		sis: process.platform,
		mem: process.memoryUsage(),
		path: process.execPath,
	};
	res.status(200).json(info);
}
let computo = fork('./src/util/calculo.js');
export function calculo(req, res) {
	const { cant = 100000000 } = req.query;
	computo.on('message', (resultado) => {
		res.status(200).send({ resultado });
		computo.kill();
		computo = fork('./src/util/calculo.js');
	});
	computo.send(cant);
}
