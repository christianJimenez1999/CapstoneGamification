var attempts = 4;
var currentQuestion = 0;
var currentLevel = 1;
var streak = 0;
var internalBotCount = 0;
var difficulty = "intro";
var startTime = new Date();
var endTime;
var correctAnswers = 0;
var wrongAnswers = 0;

console.log("This works");

function createQuestion(stuff) {
    $(document).ready(function() {
        
        var botPartA = "<div class='container border border-secondary float-right rounded-lg' id=bot"+currentQuestion+" style='padding: 15px; border-width:4px !important;'><h4>"
        
        var botPartB = "</h4></div><br>"
        $("#categories_game").prepend(botPartA + stuff + botPartB)
    })
}

function appendHuman(middle_material) {
    $(document).ready(function() {
        // internalHumanCount += 1
        
        var humanPartA = "<div class='container border border-secondary float-left rounded-lg'  style='border-width:5px !important;' id=inputs" +currentQuestion+ ">"
        var humanPartB = "<br><div class='row' style='width:20%; margin:auto;'><button class='btn btn-success col-lg' style='width:150px;' id='inputsButton' onClick='checkInputs()'>Enter</button>"+
        "<img class='col-lg' id='timer' src='https://imgur.com/KrK7bi4.gif?"+Math.random()+"'></div></div><br><br>"
       
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
            correctAnswers += 1;
            $("#correctAnswersShow").hide().html("<h5>" + correctAnswers + "</h5>").fadeIn('slow');

        } else {
            console.log("You failed");
            wrongAnswers += 1;
            attempts -= 1;
            
            $("#attemptsLeft").hide().html("<h5>" + attempts + "</h5>").fadeIn('slow');
            // $("#correctAnswersShow").hide().html("<h5>" + correctAnswers + "</h5>").fadeIn('slow');
            
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
        
        if(Object.keys(questions[difficulty]).length == 0){ // they 100% the game, congrats
            console.log("you're all done");
            finished();
        }
        else if(attempts <= 0) {
            console.log("you failed");
            finished();
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

function finished() {
    console.log("THE END")
    endTime = new Date();
    var formatted1 = startTime.getFullYear() + "-"+ (startTime.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + "-" + startTime.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + " " + startTime.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" + startTime.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" + startTime.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    
    var formatted2 = endTime.getFullYear() + "-"+ (endTime.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + "-" + endTime.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + " " + endTime.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" + endTime.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" + endTime.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    
    var partA = "<div class='container border border-secondary float-left rounded-lg'  style='border-width:5px !important;'>"
    
    var input =
            "<form class='col-md' action='/inputCategories' method='POST'>" +
                "<input hidden type='text' id='startTime' name='startTime' value='"+ formatted1+"'>" + 
                "<input hidden type='text' id='endTime' name='endTime' value='"+ formatted2+"'>" +
                "<input hidden type='number' id='correct' name='correct' value='"+ correctAnswers +"'>" +
                "<input hidden type='number' id='wrong' name='wrong' value='"+ wrongAnswers +"'>" +
                "<input class='btn btn-success' type='submit' value='Submit Score?'>" +
            "</form>"
            
    var input2 = "<a class='col-md' href='/into_categories'><button class='btn btn-info'>Try Again?</button></a>"
    var partB = "</div>"
    
    $('#results').html(partA+input+input2+partB);

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
        question: "What is a C++ class?",
        choices:{
            1: "A user defined data type",
            2: "A variable type",
            3: "User defined set of data types",
            4: "A place where students learn",
        },
        correct: "C",
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
    4:{
        question: "What's the difference between C and C++?",
        choices:{
            1: "C++ is more fun",
            2: "C is a lot simpler that C++",
            3: "C++ can use references, but C can't",
            4: "Both C and C++ use cin for entering inputs",
        },
        correct: "C", 
    },
    5:{
        question: "What does it mean if something is static?",
        choices:{
            1: "A varible that can't be changed",
            2: "A class can't be instantiated",
            3: "An instance cannot be created from the variable",
            4: "Something that's carried over in functions",
        },
        correct: "D", 
    },
    
}, mid:{
    1:{
        question: "What is the default constructor?",
        choices:{
            1: "Someone that builds houses",
            2: "A constructor function provided by the programmer",
            3: "A contructor with no specified parameters",
            4: "A function that creates functions",
        },
        correct: "C",
    },
    2:{
        question: "What is a destructor?",
        choices:{
            1: "A member function that deletes an object",
            2: "THE STAY PUFT MARSHMALLOW MAN",
            3: "A variable type that deletes objects",
            4: "A kind of class that creates varibles",
        },
        correct: "A",
    },
    3:{
        question: "What's the difference between a struct and class?",
        choices:{
            1: "A declared varible",
            2: "Struct is used in C and C++ is used ",
            3: "Struct involve public members, and classes involve private members",
            4: "None of the above",
        },
        correct: "B", 
    },
    4:{
        question: "By default, the members of a structure are __________",
        choices:{
            1: "Public",
            2: "Private",
            3: "Protected",
            4: "None of the above",
        },
        correct: "A", 
    },
    5:{
        question: "Can a destructor be overloaded?",
        choices:{
            1: "Yes",
            2: "No",
            3: "Maybe",
            4: "I don't know",
        },
        correct: "B", 
    },
    
}, hard:{
    1:{
        question: "What is an abstract class?",
        choices:{
            1: "A unique class",
            2: "A class that can't be changed",
            3: "A class that has at least 1 pure virtual function",
            4: "A class that can olny be made with an abstract function",
        },
        correct: "C",
    },
    2:{
        question: "What is a token?",
        choices:{
            1: "A form of currency",
            2: "Keywords used for variables",
            3: "A variable needed to access certain functions",
            4: "Another name for a class",
        },
        correct: "B",
    },
    3:{
        question: "When should you use virtual inheratance?",
        choices:{
            1: "When it's appropriate",
            2: "To make a copy of two classes",
            3: "When there's an error in a class",
            4: "To distinguish between classes",
        },
        correct: "D", 
    },
    4:{
        question: "Is it possible to have a recursive inline function?",
        choices:{
            1: "Yes",
            2: "No",
            3: "Depends",
            4: "I Don't Know",
        },
        correct: "B", 
    },
    5:{
        question: "What will be printed out from this code?/n cout << 25u - 50;",
        choices:{
            1: "25",
            2: "4294967271",
            3: "Error",
            4: "-25",
        },
        correct: "B", 
    }
}
};

var level_distribution = { // basically to see how many points before a level up
    intro: 3, // I just made them up
    mid: 6,
    hard: 9
}