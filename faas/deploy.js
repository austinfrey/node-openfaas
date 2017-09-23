'use strict';

const got = require('got');

const deploy = gateway => {
	const url = gateway;

	return (name, network, image) => {
		const deployPath = '/system/functions';
		const options = {
			method: 'POST',
			json: true,
			body: {
				service: name,
				network,
				image
			}
		};

		return got(url + deployPath, options);
	};
};

module.exports = deploy;
