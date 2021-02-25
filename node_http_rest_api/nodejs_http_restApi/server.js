const http = require('http');
const booksController = require('./controller/booksController');

const server = http.createServer((request, response) => {
    if (request.url === '/api/books') {
        booksController.getBooks(request, response);
    } else if (request.url.match(/\/api\/books\/([0-9]+)/) && request.method === 'GET'){}
    
    else {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify("Error: Incorrect url or path."))
    }


});
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) });
