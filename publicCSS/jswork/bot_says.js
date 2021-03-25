console.log("I LIVE #2!!!!")

var internalBotCount = 0; 
var internalHumanCount = 0;

var lives = 4;

var difficulty = "intro"

var nextQuestionNum = 1; 

var levelUp = 1 // every 2 questions increase difficulty, never down
var totalPoints = 0

function appendBot(middle_material) {
    $(document).ready(function() {
        
        var botPartA = "<div class='container border border-danger float-right'>"
        var botPartB = "</div><br>"
        // internalBotCount += 1;
        // $("#simon_says_game").prepend(botPartA + middle_material+ internalBotCount + botPartB)
        $("#bot_says_game").prepend(botPartA + middle_material + botPartB)
    })
}

function appendHuman(middle_material) {
    $(document).ready(function() {
        // internalHumanCount += 1
        
        var humanPartA = "<div class='container border border-primary float-left' id=inputs" +internalHumanCount + ">"
        var humanPartB = "<br><button id='inputsButton' onClick='checkInputs()'>Done</button></div><br><br>"
        
        // $("#simon_says_game").prepend(humanPartA + middle_material+ internalHumanCount + humanPartB)
        $("#bot_says_game").prepend(humanPartA + middle_material + humanPartB)
    });
}

function checkInputs() { // we know what to check based on the internalHumanCount
    $(document).ready(function() {
        internalBotCount += 1;
        
        var currentParent = $("#inputs"+internalHumanCount);
        currentParent.find("#inputsButton").hide();
        // var current = currentParent.find("#inputA0").val();
        
        var scoreCounter = {};
        
        var aces;
        var bats;
        
        var looper;
        for(looper = 0; looper < questions[difficulty][nextQuestionNum]['human']['input_count']; looper++) {
            // get the input for A and b
            aces = currentParent.find("#inputA"+looper).val();
            bats = currentParent.find("#inputB"+looper).val();
            // console.log("aces",aces,"\nbats",bats)
            // check if its in the possibly right answers
            // console.log("THE DICT\n",questions[difficulty][randomQuestionNum]['human']['correct_inputs'])
            if(aces in questions[difficulty][nextQuestionNum]['human']['correct_inputs']){
                // console.log("MADE IT TO THE FIRST ONE")
                if(questions[difficulty][nextQuestionNum]['human']['correct_inputs'][aces].includes(bats)){
                    // console.log("SECOND ONE")
                    scoreCounter[aces] = 1;
                }
            }
        }
        // console.log("THE length", Object.keys(scoreCounter).length)
        // console.log("CORRECT INPUTS", questions[difficulty][randomQuestionNum]['human']['correct_inputs'])
        
        var num_right = Object.keys(scoreCounter).length;
        
        if(num_right == questions[difficulty][nextQuestionNum]['human']['input_count']){
            levelUp += 3;
            console.log("ALL RIGHT BOI");
        }
        else if(num_right / questions[difficulty][nextQuestionNum]['human']['input_count'] >= 0.55){
            levelUp += 1;
            console.log("two thirds boi");
        }
        else if(num_right / questions[difficulty][nextQuestionNum]['human']['input_count'] <= 0.30){
            lives -= 1;
            $("#lives").html("<h3>" + lives + "</h3>")
            console.log("BIG OOF, lives at", lives);
        }
        else{ // what to here? subtract a life? if they get stuck then oof
            console.log("ok oof");
        }
        
        // console.log("did it delete?", questions[difficulty])
        totalPoints += num_right * point_distribution[difficulty];
        $("#points").html("<h3>" + totalPoints + "</h3>")
        
        delete questions[difficulty][nextQuestionNum]; // get rid of the question
        controller();
        
        // console.log("did it delete?", questions[difficulty])
    });
}

function maker() {
    $(document).ready(function() {
        // console.log("NEXT QUESTION NUM", nextQuestionNum)
        // console.log("DIFFICULTY", difficulty)
        var humanInputA = "<h3>"+questions[difficulty][nextQuestionNum]['human']['name']+
        "</h3><br><table><tr><th>name</th><th>type</th></tr>"
        var humanInputB = ""
        
        // questions[difficulty][question_number][human][correct_inputs].forEach(element => humanInputB += "<tr><td><input id=")
        var i;
        for (i = 0; i < questions[difficulty][nextQuestionNum]['human']['input_count']; i++) {
            humanInputB += "<tr><td><input id=inputA"+i+"></td><td><input id=inputB"+i+"></td></tr>";
        } 
        
        var humanInputC = "</table>"
        
        appendHuman(humanInputA+humanInputB+humanInputC)
        appendBot(questions[difficulty][nextQuestionNum]['bot'])
        // var botInputA = questions[difficulty][question_number][bot];
    });
}

maker() // need one to just start the damn thing

function completedAll() { // have some modal or something
    console.log("\n\nCONGRATS u did the entire game!")
}

function completedStandard() {
    console.log("\n\nCongrats on finishing!")
}

function controller() {
    $(document).ready(function() {
        
        nextQuestionNum += 1;
        var tempQuestion = internalBotCount;
        // if this number goes over the number of questions then just restart it at 1
        // console.log(randomQuestionNum)
        
        if(levelUp >= level_distribution[difficulty]) { // update difficulty
            if(difficulty == "intro") {
                difficulty = "mid";
            }
            else{
                difficulty = "hard";
            }
        }
        
        if(difficulty == "hard" && Object.keys(questions[difficulty]).length == 0){ // they 100% the game, congrats
            completedAll();
        }
        else if(Object.keys(questions[difficulty]).length == 0) {
            completedStandard();
        }
        else if(lives == 0) {
            completedStandard();
        }
        else{
            
            maker(); //error here?
            // implement the timer here, put a gif on the actual html 
            
            // if the the tempQuestion equals the the internalBotCount then call the checker, else don't
            
        }
        
    });
}

var questions = {
    intro:{
    1:{
        bot: "Make me a simple car diagram with a color and price attribute",
        human:{name:"simple car", input_count: 2, correct_inputs:{"color":["string"], "price": ["double"]}}
    },
    2:{
        bot: "Make me a simple house diagram with a color and address attribute",
        human:{name:"simple house", input_count: 2, correct_inputs:{"color":["string"], "address": ["string"]}}
    }
}, mid:{
    1:{
        bot: "Make me an automobile diagram with a mileage, brand, model, color and wheel drive",
        human:{name:"automobile", input_count: 5, correct_inputs:{"mileage":["int"], "brand": ["string"], "model": ["string"], "color": ["string"], "wheel drive": ["string"]}}
    },
    2:{
        bot: "Make me a house diagram with an address, value, year built and zipcode",
        human:{name:"house", input_count: 4, correct_inputs:{"address":["string"], "value": ["int", "double"], "year built": ["int"], "zipcode": ["int", "string"]}}
    }
}, hard:{
    1:{
        bot: "Now let's make an owner diagram with a list of houses, list of cars and an array of 8 members",
        human:{name:"owner", input_count: 3, correct_inputs:{"houses":["list<house>"],"cars":["list<car>"],"members":["member[]"]}}
    }
}
};

var point_distribution = {
    intro: 2,
    mid: 5,
    hard: 9 // distinct point ranges
};

var level_distribution = { // basically to see how many points before a level up
    intro: 7, // I just made them up
    mid: 15 
}