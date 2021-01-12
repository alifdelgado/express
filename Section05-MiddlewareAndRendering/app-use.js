const express = require('express');
const app = express();

const validateUser = (req, res, next) => {
    res.locals.validated = true;
    console.log("VALIDATED RAN");
    next();
};

app.use(validateUser);
app.use('/admin', validateUser);
app.use(validateUser);

app.get('/', (req, res, next) => {
    res.send('<h1>Main Page</h1>');
    console.log(res.locals.validated);
});

app.get('/admin', (req, res, next) => {
    res.send('<h1>Admin Page</h1>');
    console.log(res.locals.validated);
});

app.listen(3000);