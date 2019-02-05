const mysql = require('mysql');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const options = {
	host     : process.env.RDS_HOSTNAME,
	user     : process.env.RDS_USERNAME,
	password : process.env.RDS_PASSWORD,
	port     : process.env.RDS_PORT,
	database : process.env.RDS_DB_NAME
};

const connection = mysql.createConnection(options);

app.get(['/', 'index.html'], (req, res, next) => {
	res.send('index page');
});

app.get('/process', (req, res, next) => {
	// res.send(process.env);
});

app.get('/board', (req, res, next) => {
	connection.query('select * from board', (err, rows) => {
		if (err) console.log('Error', err);
		res.send(rows);
	});
});

app.listen(port, () => {
	console.log('success server');
});