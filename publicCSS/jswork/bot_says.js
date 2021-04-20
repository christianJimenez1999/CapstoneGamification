console.log("I LIVE #2!!!!")

var internalBotCount = 0; 
var internalHumanCount = 0;

var lives = 4;

// var difficulty = "mid"
var difficulty = "intro"

var nextQuestionNum = 1; 

var levelUp = 1 // every 2 questions increase difficulty, never down
var totalPoints = 0

var time1 = new Date();
var time2;

function appendBot(middle_material) {
    $(document).ready(function() {
        
        var botPartA = "<div class='container border border-danger float-right rounded-lg' id=bot"+internalBotCount+" style='padding: 15px; background-color: #ffe0dd; border-width:4px !important;'><h4>"
        
        // var botPartB = "</h4>"+polka+"</div><br>"
        var botPartB = "</h4></div><br>"
        // internalBotCount += 1;
        // $("#simon_says_game").prepend(botPartA + middle_material+ internalBotCount + botPartB)
        $("#bot_says_game").prepend(botPartA + middle_material + botPartB)
}

function appendHuman(middle_material) {
    $(document).ready(function() {
        // internalHumanCount += 1
        
        var humanPartA = "<div class='container border border-primary float-left rounded-lg'  style='border-width:5px !important; background-color: #e4e7ff;' id=inputs" +internalHumanCount + ">"
        var humanPartB = "<br><div class='row' style='width:20%; margin:auto;'><button class='btn btn-success col-lg' style='width:150px;' id='inputsButton' onClick='checkInputs()'>Done!</button>"+
        "<img class='col-lg' id='timer' src='https://imgur.com/KrK7bi4.gif?"+Math.random()+"'></div></div><br><br>"
        
        // $("#simon_says_game").prepend(humanPartA + middle_material+ internalHumanCount + humanPartB)
        $("#bot_says_game").prepend(humanPartA + middle_material + humanPartB)
    });
}

function checkInputs() { // we know what to check based on the internalHumanCount
    $(document).ready(function() {
        internalBotCount += 1;
        
        var currentParent = $("#inputs"+internalHumanCount);
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
        console.log("NEXT QUESTION NUM", nextQuestionNum)
        console.log("DIFFICULTY", difficulty)
        var humanInputA = "<div style='width:20%; margin:auto;'><h3>"+questions[difficulty][nextQuestionNum]['human']['name']+
        "</h3><br><table><tr><th>name</th><th>type</th></tr>"
        var humanInputB = ""
        
        // questions[difficulty][question_number][human][correct_inputs].forEach(element => humanInputB += "<tr><td><input id=")
        var i;
        for (i = 0; i < questions[difficulty][nextQuestionNum]['human']['input_count']; i++) {
            humanInputB += "<tr><td><input id=inputA"+i+"></td><td><input id=inputB"+i+"></td></tr>";
        } 
        
        var humanInputC = "</table></div>"
        
        appendHuman(humanInputA+humanInputB+humanInputC)
        appendBot(questions[difficulty][nextQuestionNum]['bot'])
        // var botInputA = questions[difficulty][question_number][bot];
    });
}

// maker() // need one to just start the damn thing

function completedAll() { // have some modal or something
    console.log("\n\nCONGRATS u did the entire game!")
    
    $("#feedbackL").hide().html("<img id='explosion' src='https://bestanimations.com/media/fireworks2/1589967346ba-pretty-delicate-firework-animated-gif-image.gif#.YGa71ze3z8A.link' style='height:100px;width:150px;'>").show()
    $("#feedbackR").hide().html("<img id='explosion' src='https://bestanimations.com/media/fireworks2/1589967346ba-pretty-delicate-firework-animated-gif-image.gif#.YGa71ze3z8A.link' style='height:100px;width:150px;'>").show()
    
    displayEndButtons()
}

function completedStandard() {
    console.log("\n\nCongrats on finishing!")
    
    displayEndButtons()
}


function displayEndButtons() {
    time2 = new Date()
    
    var formatted1 = time1.getFullYear() + "-"+ (time1.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + "-" + time1.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + " " + time1.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" +time1.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" +time1.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    
    var formatted2 = time2.getFullYear() + "-"+ (time2.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + "-" + time2.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + " " + time2.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" +time2.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" +time2.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    
    var partA = "<div class='container row rounded-lg border border-info' style='width:30%; margin:auto; background:#b4f3ff; padding:12px;'>"
    
    var input =
            "<form class='col-md' action='/inputBotSays' method='POST'>" +
                "<input hidden type='text' id='time1' name='time1' value='"+formatted1+"'>" + 
                "<input hidden type='text' id='time2' name='time2' value='"+formatted2+"'>" +
                "<input hidden type='number' id='points' name='points' value='"+totalPoints +"'>" +
                "<input class='btn btn-success' type='submit' value='Submit score!'>" +
            "</form>"
            
    var input2 = "<a class='col-md' href='/bot_says'><button class='btn btn-info'>redo!</button></a>"
    var partB = "</div>"
    
    $('#endDiv').html(partA+input+input2+partB)
}

function controller() {
    $(document).ready(function() {
        
        nextQuestionNum += 1;
        if(nextQuestionNum > 8){
            nextQuestionNum = 1
        }
        var tempQuestion = internalBotCount;
        // if this number goes over the number of questions then just restart it at 1
        // console.log(randomQuestionNum)
        
        if(levelUp >= level_distribution[difficulty]) { // update difficulty
            if(difficulty == "intro") {
                difficulty = "mid";
                $('#difficulty').hide().html("<h3 style='background-image: linear-gradient(to right, yellow , red); height: 100%'>mid</h3>").fadeIn('slow')
            }
            else{
                difficulty = "hard";
                $('#difficulty').html("<h3 style='background-image: linear-gradient(to right, pink , purple); height: 100%'>mid</h3>")
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
        bot: "Make me a simple car diagram with a color and price attribute",
        human:{name:"Simple_car", input_count: 2, correct_inputs:{"color":["string"], "price": ["double"]}}
    },
    2:{
        bot: "Make me a simple house diagram with a color and address attribute",
        human:{name:"Simple_house", input_count: 2, correct_inputs:{"color":["string"], "address": ["string"]}}
    },
    3:{
        bot: "Make me a simple phone diagram with a name and camera object attribute",
        human:{name:"Simple_phone", input_count: 2, correct_inputs:{"camera":["Camera"], "name":["string"]}}
    },
    4:{
        bot: "Make me a simple shirt diagram with a name, color and size attribute",
        human:{name:"Simple_shirt", input_cout:3, correct_inputs:{"name":["string"], "color":["string"], "size":["char", "string"]}}
    },
    5:{
        bot:"Make me a simple shoe diagram with a name and size attribute",
        human:{name:"Simple_shoe", input_count:2, correct_inputs:{"name":["string"], "size":["int"]}}
    },
    6:{
        bot:"Make me a simple dog diagram with a name attribute and string sound method",
        human:{name:"Simple_dog", input_count:2, correct_inputs:{"name":["string"], "sound()":["string"]}}
    },
    7:{
        bot:"Make me a simple book diagram with a text and title attribute",
        human:{name:"Simple_book", input_count:2, correct_inputs:{"text":["string"], "title":["string"]}}
    },
    8:{
        bot:"Make me a simple tree diagram with a height, age and color attribute",
        human:{name:"Simple_tree", input_count:3, correct_inputs:{"height":["int", "double"], "age":["int"], "color":["string"]}}
    }
}, mid:{
    1:{
        bot: "Make me an automobile diagram with a mileage, brand, model, color and wheel drive.",
        human:{name:"Automobile", input_count: 5, correct_inputs:{"mileage":["int"], "brand": ["string"], "model": ["string"], "color": ["string"], "wheel_drive": ["string"],"wheelDrive":["string"]}}
    },
    2:{
        bot: "Make me a house diagram with an address, value, year built and zipcode.",
        human:{name:"House", input_count: 4, correct_inputs:{"address":["string"], "value": ["int", "double"], "year built": ["int"], "zipcode": ["int", "string"]}}
    },
    3:{
        bot: "Make me a phone diagram with a list of cameras and contract attribute. Also put boolean charging and string get name method.",
        human:{name:"Phone", input_count:4, correct_inputs:{"cameras":["list<Camera>"], "contract":["string", "Contract"], "charging()":["bool"], "getName()":["string"], "get_name()":["string"]}}
    },
    4:{
        bot: "Make me a blouse diagram with a button, stack of colors and description attribute. Also put an int get price and set price attribute.",
        human:{name:"Blouse", input_count:5, correct_inputs:{"button":["Button"], "colors":["stack<Color>", "stack<string>"], "description":["string"], "getPrice":["int"], "get_price":["int"], "set_price":["void"], "setPrice":["void"]}}
    },
    5:{
        bot: "Make me a sneakers diagram with a color, brand and price attributes. Also add a destructor and void run method.",
        human:{name:"Sneaker", input_count:5, correct_inputs:{"color":["string"], "brand":["string"], "price":["double", "int"], "~Sneakers()":["", ], "run()":["void"]}}
    },
    6:{
        bot: "Make me a dog diagram with a breed, age, weight and height in metric. Don't forget a string sound method to know how it sounds.",
        human:{name:"Dog", input_count:5, correct_inputs:{"breed":["string", "Breed"], "age":["int"], "weight":["double"], "height":["double"], "sound()":["string"]}}
    },
    7:{
        bot: "Make me a book class with a price, text and author attributes. Also add their getters.",
        human:{name:"Book", input_count:6, correct_inputs:{"price":["double"], "text":["string", "Text"], "author":["string"], "getText()":["string", "Text"], "get_text()":["string", "Text"], "getAuthor()":["string"], "get_author()":["string"], "getPrice()":["double"], "get_price()":["double"]}}
    },
    8:{
        bot:"Make me a tree diagram with an age, height and species attribute. Also add a getter for the age and a setter for species that takes a species objects.",
        human:{name:"Tree", input_count:5, correct_inputs:{"age":["int"], "height":["double", "int"], "species":["Species"], "get_age()":["int"], "getAge()":["int"], "set_species(species : Species)":["void"], "setSpecies(species : Species)":["void"]}}
    }
}, hard:{
    1:{
        bot: "Now let's make an owner diagram with a list of houses, list of cars and an array of 8 members",
        human:{name:"Owner", input_count:3, correct_inputs:{"houses":["list<House>"],"cars":["list<Car>"],"members":["Member[]", "Member[8]"]}}
    },
    2:{
        bot: "In a home there is an area size, list of tenants and a getter for the for the tenants.",
        human: {name:"Home", input_count:3, correct_inputs:{"area_size":["int", "double"], "areaSize":["double", "int"], "tenants":["list<Tenant>"], "getTenants()":["list<Tenant>"], "get_tenants()":["list<Tenant>"]}}
    },
    3:{
        bot: "A network has a users object which is a map of users and numbers. It also has a list of plans that the users can pick. They are a bit pricy sometimes.",
        human: {name:"Network", input_count:2, correct_inputs:{"users":["map<string,int>", "map<string,string>"],"plans":["list<Plan>"]}}
    },
    4:{
        bot: "The clothing line will have a vector of items, manufacturer and marketing budget. Make sure that we can get the bugdet. We don't want to run out of budget.",
        human: {name:"ClothingLine", input_count:4, correct_inputs:{"items":["vector<Item>"], "manufacturer":["string", "Manufacturer"], "budget":["double", "int"], "get_budget":["double", "int"], "getBudget":["double", "int"]}}
    },
    5:{
        bot: "The store wants to track shoes specifically. So make the object track size, type and weather or not the pair has a discount. Also make it so that we can set the discount.",
        human: {name:"Shoe", input_count:3, correct_inputs:{"size":["double", "string"], "type":["string", "Type"], "discount":["bool"], "set_discount":["void"], "setDiscount":["void"]}}
    },
    6:{
        bot: "Animals are complex. So let's track the age, weight, species and make the position be a pair. Also make sure to have a parents function to get a pair of parent Animals back.",
        human:{name:"Animal", input_count:5, correct_inputs:{"age":["int"], "weight":["int"], "species":["Species", "string"], "position":["pair <double,double>","pair <int,int>"], "parents":["pair <Animal,Animal>"]}}
    },
    7:{
        bot: "A bookstore joined last week and they want author profiles. So track the name, age and hobbies. Also their events. Put them in a stack.",
        human:{name:"Author", input_count:4, correct_inputs:{"name":["string"], "age":["int"], "hobbies":["string"], "events": ["stack<Event>"]}}
    },
    8:{
        bot:"Some agency wants to track the forest. Make sure it tracks the number of trees and the age. Also add a cut function to cut down a x number of trees. Also a to add function that takes x number.",
        human:{name:"Forest", input_count:4, correct_inputs:{"trees":["int"], "age":["int"], "cut(x : int)": ["void"], "to_add(x : int)":["void"], "toAdd(x : int)":["void"]}}
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

var life_colors = {
    3: "'background: linear-gradient(90deg, green 38%, yellow 100%);'",
    2: "'background: linear-gradient(90deg, yellow 38%, orange 100%);'",
    1: "'background: linear-gradient(90deg, orange 38%, red 100%);'",
    0: "'background: linear-gradient(90deg, red 38%, red 100%);'"
}