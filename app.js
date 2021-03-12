const express = require("express");
var mysql = require('mysql');
const app = express();
app.set("view engine", "ejs");

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

app.get('/recruiter_login', function(req,res){
    res.render('recruiter_login');
});

app.get('/candidate_login', function(req,res){
    res.render('candidate_login');
});

app.post('/', function(req,res){
    res.redirect('/recruiter_login');
});

app.post('/cand_login', function(req,res){
    res.redirect('/candidate_login');
});

app.listen(process.env.PORT, process.env.IP, function(){
    
    // test_db().then(console.log); // here for testing purposes
    
    console.log("server running!");
});