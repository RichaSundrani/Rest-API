const express = require('express');
const path = require('path');
const app = express();
const members = require('./Members');
var exphbs  = require('express-handlebars');
const logger = require('./middleware/logger');
const PORT = process.env.PORT || 5000;


//Handle bars middleware 
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Load the index page 
app.get('/', (resquest, response)=>{
    response.render('index', {
        title : "All members", 
        members
    });
})

// set the static folder in the middleware 
app.use(express.static(path.join(__dirname, 'public')));

// Members api routes 
app.use('/', require('./routes/api/members'));
app.use('/:id', require('./routes/api/members'));


// Init middleware 
// app.use(logger);

// Get method 
// app.get('/', (request, response)=>{
//     // response.send("Hello Richard Parkar"); 
//     response.sendFile(path.join(__dirname, 'public', 'index.html')); 
// });



app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});