'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MongoClient = _mongodb2.default.MongoClient;

class Operate {
	constructor(database) {
		this.url = 'mongodb://localhost:27017/' + database;
		this.db = null;
		this.collection = null;
	}

	async connect(table) {
		return await new Promise((resolve, reject) => {
			MongoClient.connect(this.url, (err, db) => {
				if (!err) {
					resolve(db);
				}
				reject(err);
			});
		}).then(res => {
			this.db = res;
			this.collection = res.collection(table);
			return this;
		});
	}

	async insert(params) {
		return await new Promise((resolve, reject) => {
			this.collection.insert(params, (err, result) => {
				if (!err) {
					resolve(result);
				}
				reject(err);
			});
		});
	}

	async update(query, params) {
		let force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

		return await new Promise((resolve, reject) => {
			this.collection.update(query, params, (err, result) => {
				if (!err) {
					resolve(result);
				}
				reject(err);
			}, force);
		});
	}

	async find(query) {
		return await new Promise((resolve, reject) => {
			this.collection.find(query).toArray(function (err, res) {
				if (!err) {
					resolve(res);
				}
				reject(err);
			});
		});
	}

	close() {
		this.db.close();
	}
}

exports.default = Operate;