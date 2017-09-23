'use strict';

const test = require('tape');
const BbPromise = require('bluebird')
const FaaS = require('./faas');

test('Test typeofs', t => {
	t.plan(6);

	t.equals(typeof FaaS, 'function');

	const faas = FaaS('http://localhost:8080');

	t.equals(typeof faas, 'object');
	t.equals(typeof faas.deploy, 'function')
	t.equals(typeof faas.invoke, 'function')
	t.equals(typeof faas.compose, 'function')
	t.equals(typeof faas.remove, 'function')
})

test('Test full API', t => {
	t.plan(4)
	const faas = FaaS('http://localhost:8080')

	const delay = (time) => {
		return new BbPromise(resolve => {
			setTimeout(resolve, time)
		})
	}

	faas.deploy(
		'test-func',
		'func_functions',
		'hello-serverless'
	)
		.then(x => t.equals(x.statusCode, 200))
		.then(() => delay(5000).then(() => faas.invoke('test-func')))
		.then(x => t.same(x.body, {status: 'done'}))
		.then(() => faas.compose('', [
				'func_nodeinfo',
				'func_echoit',
				'func_wordcount'
			]
		))
		.then(x => t.equals(x.statusCode, 200))
		.then(() => faas.remove('test-func'))
		.then(x => t.equals(x.statusCode, 200))
		.catch(err => console.log(err));
});
