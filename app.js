const express = require("express");
const app = express();
app.set("view engine", "ejs");

app.get('/', async function(req,res){
    res.render('home');
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server running!");
});