import mongodb from 'mongodb';
import assert from 'assert';
const MongoClient = mongodb.MongoClient;

class Operate {
	constructor(database) {
		this.url = 'mongodb://localhost:27017/' + database;
		this.db = null;
		this.collection = null;
	}

	connect(table) {
		return new Promise((resolve, reject) => {
			MongoClient.connect(this.url, (err, db) => {
				if (!err) {
					resolve(db);
				}
				reject(err);
			});
		}).then((db) => {
			this.db = db;
			this.collection = db.collection(table);
			return this;
		});
	}

	insert(params) {
		this.collection.insertMany(params);
		return this;
	}

	find(query) {
		return (ctx, callback) => {
			this.collection.find(query).toArray(function(err, res) {
				assert.equal(err, null);
				callback && callback(res);
			});
		}
	}

	close() {
		this.db.close();
	}
}

export default Operate;
