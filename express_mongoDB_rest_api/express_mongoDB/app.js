const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config')
//DB_CONNECTION=mongodb+srv://test:9876@restapi.pvpfp.mongodb.net/<dbname>?retryWrites=true&w=majority
//mongodb://testboy:rhino94@ds155396.mlab.com:55396/rest

// Everytime run body parser and parse it to json - middleware
app.use(cors());
app.use(bodyParser.json());


// Import the routes 
const postRoute = require('./routes/posts');
const userRoute = require('./routes/users');

//Middleware - layer 
app.use('/posts', postRoute);
app.use('/users', userRoute);


// Connect to mongo DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    () => {
        console.log('connected to mongoose db')
    })
// Middlewares 

// Routes  - home page
app.get('/', (resquest, response) => {
    response.send("I am at home learning express api!")
});





// How do we start listening to the server
app.listen(5000);