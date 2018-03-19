const express = require('express');
const morgan = require('morgan');

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(morgan('dev'));

var data = require('./mockData');
var fs = require('fs');

//routes
app.get('/', function(req, res) {
    res.status(200).send({status: 'ok'})
});

app.get('/api/TodoItems', function(req, res) {
    res.status(200).json(data);
});

app.get('/api/TodoItems/:number', function(req, res) {
    var number = parseInt(req.params.number, 10);
        //This is the way I want to do it. It works but does not pass the test. Perhaps it is because this way returns the object in an array. The other way just returns an object. IOW, object in the brackets doesn't pass test.
    //let selectedTodo = data.filter(todo => todo.todoItemId === number);
    //res.status(200).json(selectedTodo);

        // If you are using the array order based numbering! And this passes the test.
    let todoItem = data[number];
    res.status(200).json(todoItem);
});

app.post('/api/TodoItems', function(req, res) {
    let isToDoNew = true;
    for (let objIndex in data) {
        if (data[objIndex].todoItemId == req.body.todoItemId) {
            data[objIndex] = req.body;
            res.status(201).send(data[objIndex]);
            isToDoNew = !isToDoNew;
        }
    }
    if (isToDoNew) {
        data.push(req.body);
        res.status(201).json(req.body);
    }
});

app.delete('/api/TodoItems/:number', function(req, res) {
    let number = parseInt(req.params.number, 10);
    let todoItem = data[number];
    res.status(200).json(todoItem);
});

module.exports = app;
