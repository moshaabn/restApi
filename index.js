const express = require('express');
const mongoose = require('mongoose');

//set up express app
const app = express();

//connect to DB
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


app.use('/api', require('./routes/api'));

//error handling middleware
app.use(function(err, req, res, next){
    console.log(err)
    res.status(422).send({error: err._message});
});

//listern fot requests

app.listen(process.env.port || 4000, function() {
    console.log('now listening to requests');
});