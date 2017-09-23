const Faas = require('./faas');

const faas = Faas('http://localhost:8080');

faas.deploy(
	'yolo',
	'func_functions',
	'hello-serverless'
)
	.then(x => console.log(x))
	.catch(err => console.log(err));

