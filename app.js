const express = require("express");
var mysql = require('mysql');
var bodyParser = require('body-parser');
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements : true
});
connection.connect(); 
// ---------------------------------------------

// const test_db = async() => { // here for testing purposes.
//     let stmt = "SELECT * FROM candidates;";
    
//     return new Promise(function(resolve, reject) {
//       connection.query(stmt, function(error, result){
//           if(error) throw error;
//           resolve("result");
//         });
        
//     });
    
// };

app.get('/', async function(req,res){
    res.render('home');
});

//renders recruiter login
app.get('/recruiter_login', function(req,res){
    res.render('recruiter_login');
});
//renders creating an recruiter account
app.get('/create_recruiter', function(req,res){
    res.render('create_recruiter');
});

app.get('/candidate_login', function(req,res){
    res.render('candidate_login');
});

app.get('/recruiter_loggedin', function(req,res){
   res.render('recruiter_loggedin'); 
});

//sends you to recruiter login from starting page
app.post('/', function(req,res){
    res.redirect('/recruiter_login');
});

app.post('/cand_login', function(req,res){
    res.redirect('/candidate_login');
});
//sends you to recruiter create from login if no existent account
app.post('/assign_recruiter', function(req,res){
   res.redirect('/create_recruiter'); 
});

//creating recruiter and adding to the database
app.post('/create_recruiter', function(req,res){
    console.log("hello");
    let stmt = 'INSERT INTO recruiters (name,username,password,email) VALUES (?,?,?,?)';
    console.log(req.body.name);
    console.log(req.body.username);
    console.log(req.body.password);
    console.log(req.body.email);
    let data = [req.body.name,req.body.username,req.body.password,req.body.email];
    console.log(data);
    connection.query(stmt, data, function(error, result){
        if(error) throw error;
        console.log(stmt);
        res.redirect('/recruiter_login');
    });

});

app.post('/recruiter_login', function(req, res) {
    
    var query = 'SELECT * FROM recruiters WHERE username=? AND password=?';
    
    let data = [req.body.email, req.body.password];
    
    // start the session here if you can. also the issue was that we forgot about line 7
    
    connection.query(query, data, function(error, result){
      if(error) throw error;
      res.redirect('/recruiter_loggedin');
    });
    
});

app.listen(process.env.PORT, process.env.IP, function(){
    
    // test_db().then(console.log); // here for testing purposes
    
    console.log("server running!");
});