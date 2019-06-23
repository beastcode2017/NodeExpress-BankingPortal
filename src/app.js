const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

//number 3, review what set function does
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//number 4, review what use function does
app.use(express.static(path.join(__dirname,'public')));

//number 7 review what app.get does
app.get('/', (req, res)=> res.render('index', {title:'Index'}));

app.listen(3000, ()=> console.log('PS Project Running on port 3000'));
