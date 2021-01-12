// const http = require('http');
const express = require('express');
const app = express();
app.all('*', (req, res) => {
    res.send('<h1>this is the home page</h1>');
});
app.listen(3000);