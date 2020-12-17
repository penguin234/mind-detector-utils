const express = require('express');
const app = express();

const cors = require('cors')
app.use(cors());

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.get('/', function(req, res) {
    res.send({'result': 'success'});
});


const PORT = 3000;

const server = app.listen(PORT, function() {
    console.log('listenning on port ' + PORT.toString());
});