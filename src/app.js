const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

//number 3, review what set function does
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//number 4, review what use function does
app.use(express.static(path.join(__dirname,'public')));

//module2 number 1, review this
//pathanme and encoding are sufficient. callback is not required
const accountData = fs.readFileSync("src/json/accounts.json","utf8");
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync("src/json/users.json","utf8");
const users = JSON.parse(userData);
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

app.get('/profile', (req,res)=>{
  res.render('profile', {user:users[0] });
})
app.listen(3000, ()=> console.log('PS Project Running on port 3000'));
