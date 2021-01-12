const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
app.use(helmet());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    if (req.query.msg === 'fail') {
        res.locals.msg = "Sorry, user not exists";
    } else {
        res.locals.msg = '';
    }

    next();
});

app.get('/', (req, res, next) => {
    res.send("Sanity Check");
});

app.get('/login', (req, res, next) => {
    res.render('login');
});

app.post('/process_login', (req, res, next) => {
    const password = req.body.password;
    const username = req.body.username;
    if (password === "x") {
        res.cookie('username', username);
        res.redirect('/welcome');
    } else {
        res.redirect('/login?msg=fail');
    }
});

app.get('/welcome', (req, res, next) => {
    res.render('welcome', {
        username: req.cookies.username
    });
});

app.param('id', (req, res, next, id) => {
    console.log("Params called: ", id);
    next();
});

app.get('/story/:id', (req, res, next) => {
    res.send(`<h1>Story ${req.params.id}</h1>`);
});

app.get('/story/:id/:link', (req, res, next) => {
    res.send(`<h1>Story ${req.params.id} - ${req.params.link}</h1>`);
});

app.get('/statement', (req, res, next) => {
    res.download(path.join(__dirname, 'statements/help_my_accounts.png'), 'bank_statement.png', (error) => {
        console.log(error);
        if (error) {
            res.redirect('/download/error');
        }
    });
});

app.get('/logout', (req, res, next) => {
    res.clearCookie('username');
    res.redirect('/login');
});

app.listen(3000);