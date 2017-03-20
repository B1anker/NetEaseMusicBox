import fs from 'fs';

const routes = [],
	methods = [];

fs.readdirSync(__dirname).filter((value) => {
	return value !== 'index.js';
}).map(value => require('./' + value).default).forEach((value) => {
	routes.push(value.routes());
	methods.push(value.allowedMethods());
});

export default {
	routes,
	methods
};
