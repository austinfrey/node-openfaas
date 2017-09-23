'use strict';

const got = require('got');

const remove = gateway => {
	const url = gateway;

	return name => {
		const options = {
			method: 'DELETE',
			json: true,
			body: {
				functionName: name
			}
		};

		return got(url + '/system/functions', options);
	};
};

module.exports = remove;
