'use strict';

const path = require('path');
const got = require('got');

const invoke = gateway => {
	const url = gateway;

	return (name, data, isJson) => {
		const funcPath = path.join('/function', name);
		const options = {
			method: 'POST',
			json: isJson || false
		};

		if (data) {
			options.body = data;
		}

		return got(url + funcPath, options);
	};
};

module.exports = invoke;
