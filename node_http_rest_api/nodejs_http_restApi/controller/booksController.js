const Books = require('../model/booksModel')

async function getBooks(request, response) {
    try {
        const books = await Books.fetchAllBooks();
        // res.statusCode =200; 
        // res.setHeader('Content-type', 'text/html')
        // res.write('<h1> Hello Richards </h1>')
        // res.end();

        // OR 
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(books)); // Instead of response.write and response.end, directly send the response object in response.end
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getBooks
}