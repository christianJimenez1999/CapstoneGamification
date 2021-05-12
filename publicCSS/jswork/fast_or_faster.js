console.log("I EXIST!")

var lives = 4;
var points = 0;
var completed = 0;

var currentQuestion = 0; // in the checker check if its not 0
var checked = 0;

var difficulty = 1; // starting difficulty
var correct = 0;

function controller() {
    $(document).ready(function() {
        currentQuestion += 1;
        
        // check difficulty before the other ones
        if(correct > pointDistribution[difficulty] ){
            difficulty += 1;
        }
        
        if(lives == 0 || questions[difficulty].length == 0){
            terminate()
            return
        }
        else{
            maker()
            // start the whole timer here basically
        }
    })
}

function maker() {
    
    // just get the question here and then generate the div
    let question = "<h2>" +questions[difficulty][0]['question']+ "</h2>";
    
    insertToDiv(question);
}

function insertToDiv(data) {
    let parentDiv = $('#question');
    let top = "<div>"
    let closer = "</div>"
    
    parentDiv.html(top + data + closer)
    
    $("#timer").html("<img src='https://i.imgur.com/8nbpeNt.gif?"+ Math.random()+"' style='text-align:center'>")
}


function checkTrue() {
    if(checked < currentQuestion){ // makes sure we don't double check
        checked += 1
    
        
        let val = questions[difficulty].shift()
        console.log("val", val)
        
        if(val['out'] == true){
            correct += 1;
        }
        else{
            lives -= 1;
        }
        
        completed += 1;
        controller();
    }
}

function checkFalse() {
    if(checked < currentQuestion){ // makes sure we don't double check
        checked += 1
    
    
        let val = questions[difficulty].shift()
        console.log("val", val)
        
        if(val['out'] == false){
            correct += 1;
        }
        else{
            lives -= 1;
        }
        
        completed += 1;
        
        controller();
    }
}

function checkTime() { // timer ran out, just call it wrong
    if(checked < currentQuestion) { // makes sure we don't double check
        checked += 1
    
        let val = questions[difficulty].shift()
        console.log("val", val)
        
        lives -= 1
        
        completed += 1
        controller()
    }
}

function terminate() {
    console.log("finish game");
}

var questions = {
    1: [{question:"if (true)", out: true}, {question: "if (true && true)", out: true}, {question: "if (false)", out: false}, {question: "if (false && false)", out: false},
    {question: "if (false && true)", out: false}, {question: "if (true && false)", out:false}, {question:"if (true || false)", out:true}, {question:"if (false || false)", out:false}],
    2: [{}, {}, {}, {}, {}, {}, {}, {}],
    3: [{}, {}, {}, {}, {}, {}, {}, {}]
}

var pointDistribution = {
    1:6,
    2:14
}