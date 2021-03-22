console.log("I LIVE 2!!!!")

var internalBotCount = 0; 
var internalHumanCount = 0;

function appendBot() {
    $(document).ready(function() {
        
        var botPartA = "<div class='float-right'>"
        var botPartB = "</div><br>"
        internalBotCount += 1;
        $("#simon_says_game").prepend(botPartA + "HELO THIS IS A TEST OF SORTS "+ internalBotCount + botPartB)
    })
}

function appendHuman() {
    $(document).ready(function() {
        
        var humanPartA = "<div class='float-left'>"
        var humanPartB = "</div><br>"
        internalHumanCount += 1
        $("#simon_says_game").prepend(humanPartA + "Hello this is another test of sorts "+ internalHumanCount + humanPartB)
    })
}