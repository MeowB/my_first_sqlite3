const { printQueryResults } = require('./utils');
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./db.sqlite');

async function fetchApi() {
	let data = await fetch('https://jsonplaceholder.typicode.com/comments/1')
	data = await data.json(data)

	db.exec(`CREATE TABLE IF NOT EXISTS comments(
			postId INTEGER,
			id INTEGER AUTO_INCREMENT,
			name TEXT,
			email TEXT,
			body TEXT,
			PRIMARY KEY(id)
		);
		INSERT INTO comments(postId, name, email, body)
		VALUES	(1, 'TEST', 'test@test.com', 'some text');
		`)

		let rows = await fetchAll(db, 'SELECT * FROM comments', [])

		console.log(rows)
}

const fetchAll = async (db, sql, params) => {
	return new Promise((resolve, reject) => {
	  db.all(sql, params, (err, rows) => {
		if (err) reject(err);
		resolve(rows);
	  });
	});
  };

fetchApi()