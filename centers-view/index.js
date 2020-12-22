const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


const Queries = require('./queries');
const queries = new Queries();

const methods = require('./methods');
methods(app, queries);


const PORT = 8080;

const server = app.listen(PORT, function() {
    console.log('listenning on port ' + PORT.toString());
});