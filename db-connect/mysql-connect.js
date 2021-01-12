const express = require('express');
const app = express();
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
});

app.get('/', (req, res) => {
    connection.connect();
    connection.query('select * from users', (error, results, fields) => {
        if (error) throw error;
        console.log(results[0]);
    });
    connection.end();
    res.json('mysql');
});

app.listen(3000);