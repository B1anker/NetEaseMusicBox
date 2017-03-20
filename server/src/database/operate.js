import mongodb from 'mongodb';
import assert from 'assert';
const MongoClient = mongodb.MongoClient;

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
		}).then((res) => {
			this.db = res;
			this.collection = res.collection(table);
			return this;
		});
	}

	insert(params) {
		this.collection.insertMany(params);
		return this;
	}

	async find(query) {
		return await new Promise((resolve, reject) => {
			this.collection.find(query).toArray(function(err, res) {
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

export default Operate;
