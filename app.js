const express = require("express");
var mysql = require('mysql');
var bodyParser = require('body-parser');
var session = require('express-session');
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'gamification project', // this one is useless
    resave: true,
    saveUninitialized: true
}));
app.use(express.static('publicCSS'));


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements : true
});
connection.connect(); 
// ---------------------------------------------


// general helper functions 

// check if user is authenticated
function check_authenticated(req, res, next) {
    console.log(req.session.authenticated);
    if(req.session.authenticated =! true) res.redirect('/');
    else next();
}

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

// sends to the recruiter loggedin screen, needs the recruiter to have session
app.get('/recruiter_loggedin', check_authenticated , function(req,res){
   res.render('recruiter_loggedin', {recruiter: req.session.userInfo});
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
    // console.log("hello");
    let stmt = 'INSERT INTO recruiters (name,username,password,email) VALUES (?,?,?,?)';
     console.log(req.body.name);
     console.log(req.body.username);
     console.log(req.body.password);
     console.log(req.body.email);
    let data = [req.body.name,req.body.username,req.body.password,req.body.email];
    // console.log(data);
    connection.query(stmt, data, function(error, result){
        if(error) throw error;
        // console.log(stmt);
        res.redirect('/recruiter_login');
    });

});

function logInRecruiter(username, password) {
    
    var query = 'SELECT * FROM recruiters WHERE username=? AND password=?';
    
    let data = [username, password];
    
    // start the session here if you can. also the issue was that we forgot about line 7
    return new Promise(function(resolve,reject){
        connection.query(query, data, function(error, result){
          if(error) throw error;
          else{
            //   console.log("success", result);
              resolve(result[0]);
              
          }
        });
    });

}


app.post('/recruiter_login', async function(req, res) {
    
    let attempt = await logInRecruiter(req.body.username, req.body.password);
    let name = req.body.username;
    
    if(attempt) {
        req.session.authenticated = true;
        req.session.userInfo = attempt;
        res.render('recruiter_loggedin', {recruiter: req.session.userInfo})
        //res.redirect('/recruiter_loggedin');
    }
    else {
        res.redirect('/recruiter_login');
    }
});


// the following are endpoints! 
app.get('/create_candidate', function(req, res) {
    
    var random = Math.floor(Math.random() * 9999) + 1000;
    
    let stmt = 'INSERT INTO candidates (candidate_id, completion) VALUES (?,?);';
    var data = [random, false];
    
    connection.query(stmt, data, function(error, result) {
        if (error) {
            res.json({result: false, cand_id: null});
        }
        else {
            res.json({result: true, cand_id: random});
        }
        
    });

});

app.get('/log_out', check_authenticated ,function(req, res) {
    req.session.destroy();
    // console.log("logged out");
    res.redirect('/');
});

// if the recruiter wants to search the candidate
app.get('/get_candidate/:id', function(req, res) {
    
    var stmt = "SELECT * FROM candidates LEFT JOIN simon_says ON simon_says.simon_says_user=candidates.candidate_id LEFT JOIN where_my_error ON where_my_error.where_my_error_user=candidates.candidate_id "+
    "LEFT JOIN fast_or_faster ON fast_or_faster.fast_or_faster_user=candidates.candidate_id LEFT JOIN categories ON categories.categories_user=candidates.candidate_id LEFT JOIN game_pad ON game_pad.game_pad_user=candidates.candidate_id "+
    "WHERE candidates.candidate_id=? ;";
    var data = [req.params.id];
    
    connection.query(stmt, data, function(error, result) {
        if (error) res.json({result: false, data: error});
        else {
            res.json({result: true, data: result[0]});
        }
    });
});


// the port listen
app.listen(process.env.PORT, process.env.IP, function(){
    
    // test_db().then(console.log); // here for testing purposes
    
    console.log("server running!");
});