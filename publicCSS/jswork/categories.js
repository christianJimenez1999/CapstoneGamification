var attempts = 4;
var currentQuestion = 0;
var currentLevel = 1;
var streak = 0;
var internalBotCount = 0;
var difficulty = "intro";

function createQuestion(stuff) {
    $(document).ready(function() {
        
        var botPartA = "<div class='container border border-secondary float-right rounded-lg' id=bot"+currentQuestion+" style='padding: 15px; border-width:4px !important;'><h4>"
        
        // var botPartB = "</h4>"+polka+"</div><br>"
        var botPartB = "</h4></div><br>"
        // internalBotCount += 1;
        // $("#simon_says_game").prepend(botPartA + middle_material+ internalBotCount + botPartB)
        $("#categories_game").prepend(botPartA + stuff + botPartB)
    })
}

function appendHuman(middle_material) {
    $(document).ready(function() {
        // internalHumanCount += 1
        
        var humanPartA = "<div class='container border border-secondary float-left rounded-lg'  style='border-width:5px !important;' id=inputs" +currentQuestion+ ">"
        var humanPartB = "<br><div class='row' style='width:20%; margin:auto;'><button class='btn btn-success col-lg' style='width:150px;' id='inputsButton' onClick='checkInputs()'>Enter</button>"+
        "<img class='col-lg' id='timer' src='https://imgur.com/KrK7bi4.gif?"+Math.random()+"'></div></div><br><br>"
        // $("#simon_says_game").prepend(humanPartA + middle_material+ internalHumanCount + humanPartB)
        $("#categories_game").prepend(humanPartA + middle_material + humanPartB)
    });
}

function checkInputs() { // we know what to check based on the internalHumanCount
    $(document).ready(function() {
        //currentQuestion += 1;
        internalBotCount += 1;
        if($("#categories_game").find("#inputCorrect").val() == questions[difficulty][currentQuestion]['correct']){
            console.log("This worked!");
            currentLevel += 1;
        } else {
            console.log("You failed");
            attempts -= 1;
        }
        $("#parentCorrect").remove();
        $("#inputsButton").remove();
        $("#timer").remove();
        getStarted();
    });
}

function maker() {
    $(document).ready(function() {
        console.log("NEXT QUESTION NUM", currentQuestion)
        console.log("DIFFICULTY", difficulty)
        var i;
        var answerChoices = "";
        var letter = "A";
        for (i = 0; i < 4; i++) {
            console.log(questions[difficulty][currentQuestion]['choices'][i]);
            answerChoices += "<h3>"+String.fromCharCode(letter.charCodeAt(0) + i )+"&nbsp"
+questions[difficulty][currentQuestion]['choices'][i+1]+"</h3>";
        } 
        
        var humanInputA = "<div style='width:50%; margin:auto;'><h3>"
        
        var humanInputAA = "</h3><br>"
        var humanInputB = "<div id='parentCorrect'><input id=inputCorrect></div>"
        
        var humanInputC = "</div>"
        
        appendHuman(humanInputA+answerChoices+humanInputAA+humanInputB+humanInputC)
        createQuestion(questions[difficulty][currentQuestion]['question'])
        // var botInputA = questions[difficulty][question_number][bot];
        console.log(answerChoices);
    });
}

function getStarted() {
    $(document).ready(function() {
        currentQuestion += 1;
        
        if(currentQuestion > 3){
            currentQuestion = 1;
        }
        var tempQuestion = internalBotCount;
        console.log(tempQuestion)
        
        if(currentLevel >= level_distribution[difficulty]) { // update difficulty
            if(difficulty == "intro") {
                difficulty = "mid";
                currentQuestion = 1;
                $('#difficulty').hide().html("<h3 style='background-image: linear-gradient(to right, yellow , red); height: 100%'>mid</h3>").fadeIn('slow')
            }
            else{
                difficulty = "hard";
                currentQuestion = 1;
                $('#difficulty').html("<h3 style='background-image: linear-gradient(to right, pink , purple); height: 100%'>mid</h3>")
            }
        }
        
        if(difficulty == "hard" && Object.keys(questions[difficulty]).length == 0){ // they 100% the game, congrats
            console.log("you're all done");
        }
        else if(Object.keys(questions[difficulty]).length == 0) {
            console.log("You finished");
        }
        else if(attempts == 0) {
            console.log("you failed");
        }
        else{
            
            maker(); 
            // implement the timer here, put a gif on the actual html 
            
            // if the the tempQuestion equals the the internalBotCount then call the checker, else don't
            setTimeout(
              function() 
              {
                  if(tempQuestion == internalBotCount){
                      checkInputs();
                  }
                  else{
                      console.log("NO TIMEOUT!");
                  }
              }, 30050); // this is a little more than 30 seconds
        }
    });
}

var questions = {
    intro:{
    1:{
        question: "What data type is used for single digit numbers?",
        choices:{
            1: "char",
            2: "int",
            3: "string",
            4: "double",
        },
        correct: "B",
    },
    2:{
        question: "What is a class?",
        choices:{
            1: "A user defined data type",
            2: "A variable type",
            3: "Something1",
            4: "Something2",
        },
        correct: "A",
    },
    3:{
        question: "What goes inside the parenthesis of a typical for loop?",
        choices:{
            1: "A declared varible",
            2: "A condition",
            3: "A varible being changed",
            4: "All of the above",
        },
        correct: "D", 
    },
    
}, mid:{
    1:{
        question: "2What data type is used for single digit numbers?",
        choices:{
            1: "char",
            2: "int",
            3: "string",
            4: "double",
        },
        correct: "B",
    },
    2:{
        question: "2What is a class?",
        choices:{
            1: "A user defined data type",
            2: "A variable type",
            3: "Something1",
            4: "Something2",
        },
        correct: "A",
    },
    3:{
        question: "2What goes inside the parenthesis of a typical for loop?",
        choices:{
            1: "A declared varible",
            2: "A condition",
            3: "A varible being changed",
            4: "All of the above",
        },
        correct: "D", 
    },
}, hard:{
    1:{
        question: "3What data type is used for single digit numbers?",
        choices:{
            1: "char",
            2: "int",
            3: "string",
            4: "double",
        },
        correct: "B",
    },
    2:{
        question: "3What is a class?",
        choices:{
            1: "A user defined data type",
            2: "A variable type",
            3: "Something1",
            4: "Something2",
        },
        correct: "A",
    },
    3:{
        question: "3What goes inside the parenthesis of a typical for loop?",
        choices:{
            1: "A declared varible",
            2: "A condition",
            3: "A varible being changed",
            4: "All of the above",
        },
        correct: "D", 
    }
}
};

var level_distribution = { // basically to see how many points before a level up
    intro: 3, // I just made them up
    mid: 5 
}