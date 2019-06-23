const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

//example of object destructuring
const {accounts, users, writeJSON} = require('./data');

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

app.get('/savings', (req,res)=> {
  res.render('account',{account:accounts.savings});
});
app.get('/checking', (req,res)=> {
  res.render('account',{account:accounts.checking});
});
app.get('/credit', (req,res)=> {
  res.render('account',{account:accounts.credit});
});

app.get('/transfer', (req,res)=>{
  res.render('transfer');
});

//what does all of this mean and how does it relate to transfer.ejs
//this module 3
app.post('/transfer', (req, res)=>{
  accounts[req.body.from].balance = accounts[req.body.from].balance -
  req.body.amount;
  accounts[req.body.to].balance =parseInt(accounts[req.body.to].balance)+
  parseInt(req.body.amount,10);
  writeJSON();
  res.render('transfer', {message: 'Transfer Completed'});
});
//more module3 information to understand
app.get('/payment', (req,res)=> res.render('payment', {account:accounts.credit}));
app.post('/payment', (req,res)=>{
  accounts.credit.balance-=req.body.amount;
  accounts.credit.available+=parseInt(req.body.amount, 10);
  writeJSON();
  res.render('payment', {message:'Payment Successful', account:accounts.credit});
});

app.get('/profile', (req,res)=>{
  res.render('profile', {user:users[0] });
})
app.listen(3000, ()=> console.log('PS Project Running on port 3000'));
