console.log("I LIVE #2!!!!")

var internalBotCount = 0; 
var internalHumanCount = 0;

var lives = 5;

var difficulty = "intro"

var randomQuestion;


function appendBot(middle_material) {
    $(document).ready(function() {
        
        var botPartA = "<div class='border border-danger float-right'>"
        var botPartB = "</div><br>"
        internalBotCount += 1;
        // $("#simon_says_game").prepend(botPartA + middle_material+ internalBotCount + botPartB)
        $("#simon_says_game").prepend(botPartA + middle_material + botPartB)
    })
}

function appendHuman(middle_material) {
    $(document).ready(function() {
        internalHumanCount += 1
        
        var humanPartA = "<div class='border border-primary float-left' id=inputs" +internalHumanCount + ">"
        var humanPartB = "</div><br>"
        
        // $("#simon_says_game").prepend(humanPartA + middle_material+ internalHumanCount + humanPartB)
        $("#simon_says_game").prepend(humanPartA + middle_material + humanPartB)
    });
}

// function checkInputs() { // need to know what im checking for lol
//     $(document).ready(function() {
        
//     })
// }

function maker(difficulty, question_number) {
    $(document).ready(function() {
        var humanInputA = "<table><tr><th>name</th><th>type</th></tr>"
        var humanInputB = ""
        
        // questions[difficulty][question_number][human][correct_inputs].forEach(element => humanInputB += "<tr><td><input id=")
        var i;
        for (i = 0; i < questions[difficulty][question_number][human][correct_inputs].length; i++) {
            humanInputB += "<tr><td><input id=inputA"+i+"></td><td><input id=inputB"+i+"></td></tr>";
        } 
        
        
        var humanInputC = "</table>"
        // var botInputA = questions[difficulty][question_number][bot];
    });
}

function controller() {
    $(document).ready(function() {
        // make a random here from the difficulty
        
        randomQuestion = Math.floor(Math.random() * (Object.keys(questions[difficulty]).length)) + 1;
        console.log(randomQuestion)
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
        bot: "Make me an automobile diagram with a mileage, brand name, model name, color and wheel drive",
        human:{name:"automobile", input_count: 5, correct_inputs:{"mileage":["int"], "brand name": ["string"], "model": ["string"], "color": ["string"], "wheel drive": ["string"]}}
    },
    2:{
        bot: "Make me a house diagram with an address, value, year built and zipcode",
        human:{name:"house", input_count: 4, correct_inputs:{"address":["string"], "value": ["int", "double"], "year built": ["int"], "zipcode": ["int", "string"]}}
    }
}, hard:{
    1:{
        bot: "Now let's make an owner diagram with a list of houses, list of cars and an array of 8 members",
        human:{name:"owner", input_count: 3, correct_inputs:{"houses":["list<house>"],"cars":["list<car>"],"members":["member[8]"]}}
    }
}
};