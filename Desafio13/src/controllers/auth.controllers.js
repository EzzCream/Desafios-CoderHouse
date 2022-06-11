export function postSignup(req, res) {
	const user = req.user;
	console.log(user);
	res.sendFile(
		`<script type="text/javascript">alert("Usuario creado");window.location.href = "http://localhost:8080";</script>`,
	);
}
