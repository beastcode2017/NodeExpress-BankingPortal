const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

//example of object destructuring
const {accounts, users, writeJSON} = require('./data');

const accountRoutes = require('./routes/accounts');
const servicesRoutes = require('./routes/services');

//number 3, review what set function does
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//number 4, review what use function does
app.use(express.static(path.join(__dirname,'public')));

//module 3 number 1 what does this mean
app.use(express.urlencoded({extended:true}));

//number 7 review what app.get does
app.get('/', (req, res)=> {
  res.render('index', {title:'Account Summary', accounts:accounts});
});

app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);


app.get('/profile', (req,res)=>{
  res.render('profile', {user:users[0] });
})
app.listen(3000, ()=> console.log('PS Project Running on port 3000'));
