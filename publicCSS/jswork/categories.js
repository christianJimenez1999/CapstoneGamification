var attempts = 4;
var currentQuestion = 0;
var currentLevel = 1;
var streak = 0;
var difficulty = "intro";

function createQuestion(stuff) {
    $(document).ready(function() {
        
        var botPartA = "<div class='container border border-danger float-right rounded-lg' id=bot"+currentQuestion+" style='padding: 15px; background-color: #ffe0dd; border-width:4px !important;'><h4>"
        
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
        
        var humanPartA = "<div class='container border border-primary float-left rounded-lg'  style='border-width:5px !important; background-color: #e4e7ff;' id=inputs" +currentQuestion+ ">"
        var humanPartB = "<br><div class='row' style='width:20%; margin:auto;'><button class='btn btn-success col-lg' style='width:150px;' id='inputsButton' onClick='checkInputs()'>Enter</button>"+
        "<img class='col-lg' id='timer' src='https://imgur.com/KrK7bi4.gif?"+Math.random()+"'></div></div><br><br>"
        
        // $("#simon_says_game").prepend(humanPartA + middle_material+ internalHumanCount + humanPartB)
        $("#categories_game").prepend(humanPartA + middle_material + humanPartB)
    });
}

function checkInputs() { // we know what to check based on the internalHumanCount
    $(document).ready(function() {
        internalBotCount += 1;
        
        var currentParent = $("#inputs"+currentQuestion);
        currentParent.find("#inputsButton").hide();
        $("#timer").remove();
        // var current = currentParent.find("#inputA0").val();
        
        var scoreCounter = {};
        
        var aces;
        var bats;
        
        var looper;
        for(looper = 0; looper < questions[difficulty][nextQuestionNum]['human']['input_count']; looper++) {
            // get the input for A and b
            aces = currentParent.find("#inputA"+looper).val();
            bats = currentParent.find("#inputB"+looper).val();
            console.log("aces",aces,"\nbats",bats)
            // check if its in the possibly right answers
            // console.log("THE DICT\n",questions[difficulty][randomQuestionNum]['human']['correct_inputs'])
            if(aces in questions[difficulty][nextQuestionNum]['human']['correct_inputs']){
                console.log("MADE IT TO THE FIRST ONE")
                if(questions[difficulty][nextQuestionNum]['human']['correct_inputs'][aces].includes(bats)){
                    console.log("SECOND ONE")
                    scoreCounter[aces] = 1;
                }
            }
        }
        // console.log("THE length", Object.keys(scoreCounter).length)
        // console.log("CORRECT INPUTS", questions[difficulty][randomQuestionNum]['human']['correct_inputs'])
        
        var num_right = Object.keys(scoreCounter).length;
        
        let botParent = $("#bot"+(internalBotCount-1))
        if(num_right == questions[difficulty][nextQuestionNum]['human']['input_count']){
            levelUp += 3;
            console.log("ALL RIGHT BOI");
            // botParent.append("<img id='explosion' src='https://bestanimations.com/media/fireworks2/1589967346ba-pretty-delicate-firework-animated-gif-image.gif#.YGa71ze3z8A.link' style='height:200px;width:250px;'>")
            $("#feedbackL").hide().html("<img id='explosion' src='https://bestanimations.com/media/fireworks2/1589967346ba-pretty-delicate-firework-animated-gif-image.gif#.YGa71ze3z8A.link' style='height:100px;width:150px;'>").show().fadeOut(3000)
            $("#feedbackR").hide().html("<img id='explosion' src='https://bestanimations.com/media/fireworks2/1589967346ba-pretty-delicate-firework-animated-gif-image.gif#.YGa71ze3z8A.link' style='height:100px;width:150px;'>").show().fadeOut(3000)
            
        }
        else if(num_right / questions[difficulty][nextQuestionNum]['human']['input_count'] >= 0.55){
            levelUp += 1;
            console.log("two thirds boi");
        }
        else if(num_right / questions[difficulty][nextQuestionNum]['human']['input_count'] <= 0.30){
            lives -= 1;
            $("#lives").html("<h3 style="+life_colors[lives]+"; height: 100%>" + lives + "</h3>")
            console.log("BIG OOF, lives at", lives);
        }
        else{ // what to here? subtract a life? if they get stuck then oof
            console.log("ok oof");
        }
        
        // var animation = botParent.find('#explosion').fadeOut(3500)
        
        // console.log("did it delete?", questions[difficulty])
        totalPoints += num_right * point_distribution[difficulty];
        $("#points").hide().html("<h3>" + totalPoints + "</h3>").fadeIn('slow')
        
        delete questions[difficulty][nextQuestionNum]; // get rid of the question
        controller();
        
        // console.log("did it delete?", questions[difficulty])
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
        
        var humanInputA = "<div style='width:20%; margin:auto;'><h3>"
        
        var humanInputAA = "</h3><br>"
        var humanInputB = "<input id=inputCorrect>"
        
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
        
        if(currentQuestion > 8){
            currentQuestion = 1
        }
        
        if(attempts == 0){
            console.log("You Lose");
        }
        
        if(currentLevel >= level_distribution[difficulty]) { // update difficulty
            if(difficulty == "intro") {
                difficulty = "mid";
                $('#difficulty').hide().html("<h3 style='background-image: linear-gradient(to right, yellow , red); height: 100%'>mid</h3>").fadeIn('slow')
            }
            else{
                difficulty = "hard";
                $('#difficulty').html("<h3 style='background-image: linear-gradient(to right, pink , purple); height: 100%'>mid</h3>")
            }
        }
        
        maker(); 
            // implement the timer here, put a gif on the actual html 
            
            // if the the tempQuestion equals the the internalBotCount then call the checker, else don't
            
            // setTimeout(
            //   function() 
            //   {
            //       if(tempQuestion == internalBotCount){
            //           checkInputs();
            //       }
            //       else{
            //           console.log("NO TIMEOUT!");
            //       }
            //   }, 30050); // this is a little more than 30 seconds
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
        correct: "int",
    },
    
}, mid:{
    1:{
        bot: "Make me an automobile diagram with a mileage, brand, model, color and wheel drive.",
        human:{name:"Automobile", input_count: 5, correct_inputs:{"mileage":["int"], "brand": ["string"], "model": ["string"], "color": ["string"], "wheel_drive": ["string"],"wheelDrive":["string"]}}
    },
}, hard:{
    1:{
        bot: "Now let's make an owner diagram with a list of houses, list of cars and an array of 8 members",
        human:{name:"Owner", input_count:3, correct_inputs:{"houses":["list<House>"],"cars":["list<Car>"],"members":["Member[]", "Member[8]"]}}
    }
}
};

var level_distribution = { // basically to see how many points before a level up
    intro: 7, // I just made them up
    mid: 15 
}