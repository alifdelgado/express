const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('public'));

app.all('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/home.html'));
});

app.listen(3000);