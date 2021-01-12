const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.send('<h1>this is the home GET page</h1>');
});
app.post('/', (req, res) => {
    res.send('<h1>this is the home GET page</h1>');
});
app.delete('/', (req, res) => {
    res.send('<h1>this is the home GET page</h1>');
});
app.put('/', (req, res) => {
    res.send('<h1>this is the home GET page</h1>');
});
app.listen(3000);