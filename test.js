'use strict';

const test = require('tape');
const nock = require('nock');
const BbPromise = require('bluebird');
const FaaS = require('./faas');

test('Test typeofs', t => {
	t.plan(6);

	t.equals(typeof FaaS, 'function');

	const faas = FaaS('http://localhost:8080');

	t.equals(typeof faas, 'object');
	t.equals(typeof faas.deploy, 'function');
	t.equals(typeof faas.invoke, 'function');
	t.equals(typeof faas.compose, 'function');
	t.equals(typeof faas.remove, 'function');
});

test('Test full API', t => {

	nock('http://localhost:8080')
		.post('/system/functions', {
			service: 'test-func',
			network: 'func_functions',
			image: 'hello-serverless'
		}).reply(200)
		.post('/function/test-func').reply(200, {status: 'done'})
		.post('/function/func_nodeinfo').reply(200, 'hello cruel world')
		.post('/function/func_echoit', 'hello cruel world').reply(200, 'hello cruel world')
		.post('/function/func_wordcount', 'hello cruel world').reply(200, 3)
		.delete('/system/functions', {functionName: 'test-func'}).reply(200);

	t.plan(5);
	const faas = FaaS('http://localhost:8080');

	faas.deploy(
		'test-func',
		'func_functions',
		'hello-serverless'
	)
		.then(x => t.equals(x.statusCode, 200))
		.then(() => faas.invoke('test-func',null, true))
		.then(x => t.same(x.body, {status: 'done'}))
		.then(() => faas.compose('', [
			'func_nodeinfo',
			'func_echoit',
			'func_wordcount'
		]
		))
		.then(x => {
			t.equals(x.statusCode, 200)
			t.equals(x.body, '3')
		})
		.then(() => faas.remove('test-func'))
		.then(x => t.equals(x.statusCode, 200))
		.catch(err => console.log(err));
});
