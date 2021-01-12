const path = require('path');
const express = require('express');
const app = express();
const helmet = require('helmet');

app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res, next) => {

    res.render("index", {
        msg: "success!",
        countries: [
            {
                name: "Russia",
                capital: "Moscow"
            },
            {
                name: "England",
                capital: "London"
            },
            {
                name: "Mexico",
                capital: "CDMX"
            }
        ]
    });
});

app.listen(3000);