[![XO code
style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
![OpenFaaS](https://img.shields.io/badge/openfaas-v0.6.5-blue.svg)

##### Usage

```
const FaaS = require('./faas')

const faas = FaaS('http://localhost:8080')

faas.deploy(
	'yolo', // name your function
	'func_functions, // choose your network
	'hello-serverless // choose the Docker image
)
	.then(x => console.log(x))
	.catch(err => console.log(err))

faas.invoke(
	'yolo', // function name
	'hello world', // data to send to function
	true //should response be JSON? optional. default is false
)
	.then(x => console.log(x)) // handle response
	.catch(err => console.log(err))

faas.remove('yolo')
	.then(x => console.log(x)) // handle response
	.catch(err => console.log(err))

faas.compose('initial data', [
	'func_nodeinfo',
	'func_echoit',
	'func_wordcount'
	]
)
	.then(x => console.log(x.body)) // handle final output
	.catch(err => console.log(err))
