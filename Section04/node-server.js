const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const home = fs.readFileSync('home.html');
        res.write(home);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(`<h1>Sorry this isn't the page you're looking for!</h1>`);
    }
    res.end();
});

server.listen(3000);