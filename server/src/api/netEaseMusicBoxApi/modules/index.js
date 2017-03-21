import fs from 'fs';

const routes = [],
	methods = [];

fs.readdirSync(__dirname).filter((value) => {
	//过滤自身
	return value !== 'index.js';
}).map(value => require('./' + value).default).forEach((value) => {
	routes.push(value.routes());
	methods.push(value.allowedMethods());
});

export default {
	routes,
	methods
};
