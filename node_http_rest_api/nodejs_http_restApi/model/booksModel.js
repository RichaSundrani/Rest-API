const books = require('../data/books.json');

function fetchAllBooks(){
    return new Promise((resolve, reject)=>{
        resolve(books); 
    })
}

module.exports = {
    fetchAllBooks
};