'use strict';

const path = require('path');
const BbPromise = require('bluebird');
const got = require('got');

const compose = baseUrl => {
	return (initial, funcs) => {
		const functions = funcs.map(func => {
			return data => {
				const options = {
					method: 'POST',
					body: data
				};

				const funcUrl = baseUrl + path.join('/function', func);
				return got(funcUrl, options)
					.then(res => BbPromise.resolve(res))
					.catch(err => BbPromise.reject(err));
			};
		});

		return functions.reduce(
			(current, f) => {
				return current.then(x => f(x.body));
			},
			new BbPromise(resolve => resolve(initial))
		);
	};
};

module.exports = compose;
