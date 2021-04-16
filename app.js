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
    if(!req.session.authenticated) res.redirect('/');
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

// sends to the recruiter loggedin screen, needs the recruiter to have session
app.get('/candidate_loggedin', check_authenticated , function(req,res){
   res.render('candidate_loggedin', {candidate: req.session.candidateInfo});
});
var fulldate;
app.get('/into_gamepad', function(req,res){
    fulldate = new Date();
    fulldate = fulldate.toLocaleTimeString();
    // var date = new Date();
    // var startDate = date.getHours() + 5;
    // var minDate = date.getMinutes();
    // if(startDate > 12){
    //     startDate = startDate - 12;
    // }
    // fulldate = startDate + ":" + minDate;
    // console.log(startDate);
    // console.log(minDate);
    // console.log(fulldate);
    res.render('game_pad');
})

app.get('/game_pad2', function(req,res){
    res.render('game_pad2');
});
app.get('/game_pad3', function(req,res){
    res.render('game_pad3');
});
app.get('/game_pad4', function(req,res){
    res.render('game_pad4');
});
app.get('/game_pad5', function(req,res){
    res.render('game_pad5');
});
app.get('/game_pad6', function(req,res){
    res.render('game_pad6');
});
app.get('/game_pad7', function(req,res){
    res.render('game_pad7');
});
app.get('/game_pad8', function(req,res){
    res.render('game_pad8');
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

//makes path to render the game pad webpage
app.post('/into_gamepad', function(req,res){
    res.redirect('/into_gamepad');
})

//creating recruiter and adding to the database
app.post('/create_recruiter', function(req,res){
    // console.log("hello");
    let stmt = 'INSERT INTO recruiters (name,username,password,email) VALUES (?,?,?,?)';
    //  console.log(req.body.name);
    //  console.log(req.body.username);
    //  console.log(req.body.password);
    //  console.log(req.body.email);
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

function logInCadidate(ID) {
    
    var query = 'SELECT * FROM candidates WHERE candidate_id=?';
    
    let data = [ID];
    
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


app.post('/candidate_login', async function(req, res) {
    
    let attempt = await logInCadidate(req.body.ID);
    let canID = req.body.ID;
    console.log(attempt);
    
    if(attempt) {
        req.session.authenticated = true;
        req.session.candidateInfo = attempt;
        res.render('candidate_loggedin', {candidate: req.session.candidateInfo})
        //res.redirect('/recruiter_loggedin');
    }
    else {
        res.redirect('/candidate_login');
    }
});

app.post('/return_candidate', function(req,res){
  res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
     
});

app.post('/pad2', function(req,res){
   res.redirect('/game_pad2'); 
});
function randomnum(){
    let ran = Math.floor(Math.random()*7)+2;
    if(ran == undefined){
        randomnum();
    }
    // console.log("ran  " + ran);
    // console.log("arrray  " + array);
    
    for(var i = 0; i < array.length; i++){
        if(array[i] === ran){
            ran = randomnum();
            // console.log("ran1  " + ran);
            // console.log("arrray1  " + array[i]);
            //return;
        }
        
    }
    return ran;
}
function path(path){
    if(path==2){
        return '/game_pad2';
    }
    if(path==3){
        return '/game_pad3';
    }
    if(path==4){
        return '/game_pad4';
    }
    if(path==5){
        return '/game_pad5';
    }
    if(path==6){
        return '/game_pad6';
    }
    if(path==7){
        return '/game_pad7';
    }
    if(path==8){
        return '/game_pad8';
    }
    
}
var array = [];
var GPcorrect = 0;
var GPincorrect = 0;
var GPcounter = 0;
var GPlives = 0;
var endDate;
app.post('/is_correct', function(req,res){
    let ran = randomnum();
    array = [];
    let route = path(ran);
    
    GPcorrect = 0;
    GPincorrect = 0;
    GPcounter = 0;
    
    let trying = req.body.answer;
    
    if(trying == 1255){
        GPcorrect = GPcorrect + 1;
        console.log("GPcorrect " + GPcorrect);
        array.push(ran);
        console.log(array);
        GPcounter = GPcounter + 1;
        if(GPcounter == 5){
           endDate = new Date();
           endDate = endDate.toLocaleTimeString();
           res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
           return;
        }
        res.redirect(route);
    }else{
        
        GPlives = GPlives + 1;
        if(GPlives >= 3){
            GPincorrect = GPincorrect + 1;
            console.log("GPincorrect " + GPincorrect);
            array.push(ran);
            console.log(array);
            GPlives = 0;
            GPcounter = GPcounter + 1;
            if(GPcounter == 5){
                endDate = new Date();
                endDate = endDate.toLocaleTimeString();
                res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
                return;
            }
            res.redirect(route);
        }else{
            res.redirect('/into_gamepad')
        }
        
    }
});

app.post('/is_correct2', async function(req, res) {
    let ran2 = randomnum();
    let route2 = path(ran2);
    let trying2 = req.body.answer;
    if(trying2 == 0024){
        GPcorrect = GPcorrect + 1;
        console.log("GPcorrect " + GPcorrect);
        array.push(ran2);
        console.log(array);
        GPcounter = GPcounter + 1;
        
        if(GPcounter == 5){
            endDate = new Date();
            endDate = endDate.toLocaleTimeString();
          var candidateid = req.session.candidateInfo;
          let attempt = await checkGPDB(candidateid.candidate_id);
          console.log(attempt);
          if( attempt == false){
            var candidateid = req.session.candidateInfo;
            GPinsert(candidateid.candidate_id, GPcorrect, GPincorrect, fulldate, endDate, GPcounter); 
          }
           res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
           return;
        }
        res.redirect(route2);
    }else{
        
        GPlives = GPlives + 1;
        if(GPlives >= 3){
            GPincorrect = GPincorrect + 1;
            console.log("GPincorrect " + GPincorrect);
            array.push(ran2);
            console.log(array);
            GPlives = 0;
            GPcounter = GPcounter + 1;
            if(GPcounter == 5){
                endDate = new Date();
                endDate = endDate.toLocaleTimeString();
                var candidateid = req.session.candidateInfo;
                let attempt = await checkGPDB(candidateid.candidate_id);
                console.log(attempt);
                if( attempt == false){
                  var candidateid = req.session.candidateInfo;
                  GPinsert(candidateid.candidate_id, GPcorrect, GPincorrect, fulldate, endDate, GPcounter); 
                }
                res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
                return;
            }
            res.redirect(route2);
        }else{
            res.redirect('/game_pad2')
        }
        
    }
});
app.post('/is_correct3', async function(req, res) {
    let ran3 = randomnum();
    let route3 = path(ran3);
    let trying3 = req.body.answer;
    if(trying3 == 9909){
        GPcorrect = GPcorrect + 1;
        console.log("GPcorrect " + GPcorrect);
        array.push(ran3);
        console.log(array);
        GPcounter = GPcounter + 1;
        
        if(GPcounter == 5){
            endDate = new Date();
            endDate = endDate.toLocaleTimeString();
          var candidateid = req.session.candidateInfo;
          let attempt = await checkGPDB(candidateid.candidate_id);
          console.log(attempt);
          if( attempt == false){
            var candidateid = req.session.candidateInfo;
            GPinsert(candidateid.candidate_id, GPcorrect, GPincorrect, fulldate, endDate, GPcounter); 
          }
           res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
           return;
        }
        
        res.redirect(route3);
    }else{
        
        GPlives = GPlives + 1;
        if(GPlives >= 3){
            GPincorrect = GPincorrect + 1;
            console.log("GPincorrect " + GPincorrect);
            array.push(ran3);
            console.log(array);
            GPlives = 0;
            GPcounter = GPcounter + 1;
            if(GPcounter == 5){
                endDate = new Date();
                endDate = endDate.toLocaleTimeString();
                var candidateid = req.session.candidateInfo;
                let attempt = await checkGPDB(candidateid.candidate_id);
                console.log(attempt);
                if( attempt == false){
                  var candidateid = req.session.candidateInfo;
                  GPinsert(candidateid.candidate_id, GPcorrect, GPincorrect, fulldate, endDate, GPcounter); 
                }
                res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
                return;
            }
            res.redirect(route3);
        }else{
            res.redirect('/game_pad3')
        }
        
    }
})
app.post('/is_correct4', async function(req, res) {
    let ran4 = randomnum();
    let route4 = path(ran4);
    let trying4 = req.body.answer;
    if(trying4 == 8597){
        GPcorrect = GPcorrect + 1;
        console.log("GPcorrect " + GPcorrect);
        array.push(ran4);
        console.log(array);
        GPcounter = GPcounter + 1;
        
        if(GPcounter == 5){
            endDate = new Date();
            endDate = endDate.toLocaleTimeString();
          var candidateid = req.session.candidateInfo;
          let attempt = await checkGPDB(candidateid.candidate_id);
          console.log(attempt);
          if( attempt == false){
            var candidateid = req.session.candidateInfo;
            GPinsert(candidateid.candidate_id, GPcorrect, GPincorrect, fulldate, endDate, GPcounter); 
          }
           res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
           return;
        }
        
        res.redirect(route4);
    }else{
        
        GPlives = GPlives + 1;
        if(GPlives >= 3){
            GPincorrect = GPincorrect + 1;
            console.log("GPincorrect " + GPincorrect);
            array.push(ran4);
            console.log(array);
            GPlives = 0;
            GPcounter = GPcounter + 1;
            if(GPcounter == 5){
                endDate = new Date();
                endDate = endDate.toLocaleTimeString();
                var candidateid = req.session.candidateInfo;
                let attempt = await checkGPDB(candidateid.candidate_id);
                console.log(attempt);
                if( attempt == false){
                  var candidateid = req.session.candidateInfo;
                  GPinsert(candidateid.candidate_id, GPcorrect, GPincorrect, fulldate, endDate, GPcounter); 
                }
                res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
                return;
            }
            res.redirect(route4);
        }else{
            res.redirect('/game_pad4')
        }
        
    }
})
app.post('/is_correct5', async function(req, res) {
    let ran5 = randomnum();
    let route5 = path(ran5);
    let trying5 = req.body.answer;
    if(trying5 == 7911){
        GPcorrect = GPcorrect + 1;
        console.log("GPcorrect " + GPcorrect);
        array.push(ran5);
        console.log(array);
        GPcounter = GPcounter + 1;
        
        if(GPcounter == 5){
            endDate = new Date();
            endDate = endDate.toLocaleTimeString();
          var candidateid = req.session.candidateInfo;
          let attempt = await checkGPDB(candidateid.candidate_id);
          console.log(attempt);
          if( attempt == false){
            var candidateid = req.session.candidateInfo;
            GPinsert(candidateid.candidate_id, GPcorrect, GPincorrect, fulldate, endDate, GPcounter); 
          }
           res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
           return;
        }
        
        res.redirect(route5);
    }else{
        
        GPlives = GPlives + 1;
        if(GPlives >= 3){
            GPincorrect = GPincorrect + 1;
            console.log("GPincorrect " + GPincorrect);
            array.push(ran5);
            console.log(array);
            GPlives = 0;
            GPcounter = GPcounter + 1;
            if(GPcounter == 5){
                endDate = new Date();
                endDate = endDate.toLocaleTimeString();
                var candidateid = req.session.candidateInfo;
                let attempt = await checkGPDB(candidateid.candidate_id);
                console.log(attempt);
                if( attempt == false){
                  var candidateid = req.session.candidateInfo;
                  GPinsert(candidateid.candidate_id, GPcorrect, GPincorrect, fulldate, endDate, GPcounter); 
                }
                res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
                return;
            }
            res.redirect(route5);
        }else{
            res.redirect('/game_pad5')
        }
        
    }
})
app.post('/is_correct6', async function(req, res) {
    let ran6 = randomnum();
    let route6 = path(ran6);
    let trying6 = req.body.answer;
    if(trying6 == 9632){
        GPcorrect = GPcorrect + 1;
        console.log("GPcorrect " + GPcorrect);
        array.push(ran6);
        console.log(array);
        GPcounter = GPcounter + 1;
        
        if(GPcounter == 5){
            endDate = new Date();
            endDate = endDate.toLocaleTimeString();
          var candidateid = req.session.candidateInfo;
          let attempt = await checkGPDB(candidateid.candidate_id);
          console.log(attempt);
          if( attempt == false){
            var candidateid = req.session.candidateInfo;
            GPinsert(candidateid.candidate_id, GPcorrect, GPincorrect, fulldate, endDate, GPcounter); 
          }
           res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
           return;
        }
        
        res.redirect(route6);
    }else{
        
        GPlives = GPlives + 1;
        if(GPlives >= 3){
            GPincorrect = GPincorrect + 1;
            console.log("GPincorrect " + GPincorrect);
            array.push(ran6);
            console.log(array);
            GPlives = 0;
            GPcounter = GPcounter + 1;
            if(GPcounter == 5){
                endDate = new Date();
                endDate = endDate.toLocaleTimeString();
                var candidateid = req.session.candidateInfo;
                let attempt = await checkGPDB(candidateid.candidate_id);
                console.log(attempt);
                if( attempt == false){
                  var candidateid = req.session.candidateInfo;
                  GPinsert(candidateid.candidate_id, GPcorrect, GPincorrect, fulldate, endDate, GPcounter); 
                }
                res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
                return;
            }
            res.redirect(route6);
        }else{
            res.redirect('/game_pad6')
        }
        
    }
})
app.post('/is_correct7', async function(req, res) {
    let ran7 = randomnum();
    let route7 = path(ran7);
    let trying7 = req.body.answer;
    if(trying7 == 3061){
        GPcorrect = GPcorrect + 1;
        console.log("GPcorrect " + GPcorrect);
        array.push(ran7);
        console.log(array);
        GPcounter = GPcounter + 1;
        
        if(GPcounter == 5){
            endDate = new Date();
            endDate = endDate.toLocaleTimeString();
          var candidateid = req.session.candidateInfo;
          let attempt = await checkGPDB(candidateid.candidate_id);
          console.log(attempt);
          if( attempt == false){
            var candidateid = req.session.candidateInfo;
            GPinsert(candidateid.candidate_id, GPcorrect, GPincorrect, fulldate, endDate, GPcounter); 
          }
           res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
           return;
        }
        
        res.redirect(route7);
    }else{
        
        GPlives = GPlives + 1;
        if(GPlives >= 3){
            GPincorrect = GPincorrect + 1;
            console.log("GPincorrect " + GPincorrect);
            array.push(ran7);
            console.log(array);
            GPlives = 0;
            GPcounter = GPcounter + 1;
            if(GPcounter == 5){
                endDate = new Date();
                endDate = endDate.toLocaleTimeString();
                var candidateid = req.session.candidateInfo;
                let attempt = await checkGPDB(candidateid.candidate_id);
                console.log(attempt);
                if( attempt == false){
                  var candidateid = req.session.candidateInfo;
                  GPinsert(candidateid.candidate_id, GPcorrect, GPincorrect, fulldate, endDate, GPcounter); 
                }
                res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
                return;
            }
            res.redirect(route7);
        }else{
            res.redirect('/game_pad7')
        }
        
    }
})
app.post('/is_correct8', async function(req, res) {
    let ran8 = randomnum();
    let route8 = path(ran8);
    let trying8 = req.body.answer;
    if(trying8 == 5747){
        GPcorrect = GPcorrect + 1;
        console.log("GPcorrect " + GPcorrect);
        array.push(ran8);
        console.log(array);
        GPcounter = GPcounter + 1;
        
        if(GPcounter == 5){
            endDate = new Date();
            endDate = endDate.toLocaleTimeString();
          var candidateid = req.session.candidateInfo;
          let attempt = await checkGPDB(candidateid.candidate_id);
          console.log(attempt);
          if( attempt == false){
            var candidateid = req.session.candidateInfo;
            GPinsert(candidateid.candidate_id, GPcorrect, GPincorrect, fulldate, endDate, GPcounter); 
          }
           res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
           return;
        }
        
        res.redirect(route8);
    }else{
        
        GPlives = GPlives + 1;
        if(GPlives >= 3){
            GPincorrect = GPincorrect + 1;
            console.log("GPincorrect " + GPincorrect);
            array.push(ran8);
            console.log(array);
            GPlives = 0;
            GPcounter = GPcounter + 1;
            if(GPcounter == 5){
                endDate = new Date();
                endDate = endDate.toLocaleTimeString();
                var candidateid = req.session.candidateInfo;
                let attempt = await checkGPDB(candidateid.candidate_id);
                console.log(attempt);
                if( attempt == false){
                  var candidateid = req.session.candidateInfo;
                  GPinsert(candidateid.candidate_id, GPcorrect, GPincorrect, fulldate, endDate, GPcounter); 
                }
                res.render('candidate_loggedin', {candidate: req.session.candidateInfo}); 
                return;
            }
            res.redirect(route8);
        }else{
            res.redirect('/game_pad8')
        }
        
    }
})


function checkGPDB(id){
    
    var query = 'SELECT * FROM game_pad WHERE game_pad_user=?';
   
    return new Promise(function(resolve, reject){
        connection.query(query, [id], function(error, result) {
          if(error) throw error;
          if(result === undefined || result.length == 0){
              resolve(false);
          }else {
            resolve(true);
          }
        });
    });
    
    
}

function GPinsert(id, correct, wrong, start, end, counter){
    
    
    
    //if not found here i insert into table :)  
        let stmt2 = 'INSERT INTO game_pad (game_pad_user,game_pad_correct,game_pad_wrong,game_pad_start_time,game_pad_end_time,game_pad_completed) VALUES (?,?,?,?,?,?)';

        let data2 = [id, correct, wrong, start, end, counter];
        return new Promise(function(resolve, reject){
            connection.query(stmt2, data2, function(error, result) {
                if(error) throw error;
                console.log("inserted?")
                resolve(result);
            });
        });
    
}

app.get('/log_out', check_authenticated ,function(req, res) {
    req.session.destroy();
    // console.log("logged out");
    res.redirect('/');
});

// if the recruiter wants to search the candidate
app.get('/get_candidate/:id', function(req, res) {
    
    var stmt = "SELECT * FROM candidates LEFT JOIN bot_says ON bot_says.bot_says_user=candidates.candidate_id LEFT JOIN where_my_error ON where_my_error.where_my_error_user=candidates.candidate_id "+
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


app.get('/bot_says', check_authenticated ,function(req, res) {
    res.render('bot_says');
});

app.post('/inputBotSays', function(req, res) {
    console.log("yo, it made it", req.body);
    console.log("yo, this is the candidate's stuff", req.session.candidateInfo)
    
    var stmt2 = 'INSERT INTO bot_says (bot_says_user, bot_says_points, bot_says_start_time, bot_says_end_time, bot_says_completed) VALUES(?,?,?,?,?) ' +
                'ON DUPLICATE KEY UPDATE bot_says_points=VALUES(bot_says_points), bot_says_start_time=VALUES(bot_says_start_time), bot_says_end_time=VALUES(bot_says_end_time);'

    var data2 = [req.session.candidateInfo.candidate_id, Number(req.body.points), req.body.time1, req.body.time2, true, Number(req.body.points), req.body.time1, req.body.time2, req.body.time2]

    connection.query(stmt2, data2, function(error, result) {
        if (error) throw error;
        else {
            console.log("success!")
            res.redirect('/candidate_loggedin')
        }
    })
});


// the port listen
app.listen(process.env.PORT, process.env.IP, function(){
    
    // test_db().then(console.log); // here for testing purposes
    
    console.log("server running!");
});