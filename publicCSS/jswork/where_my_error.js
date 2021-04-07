console.log("I EXISTS :D");

var points = 0

var lives = 4

var currentQuestion = 1
var tempQuestion = 0

var difficulty = "mid"

var answer = 0

var canClick = true

function controller() { // check difficulty and the 
    $(document).ready(function() {
        console.log("COURAGE THE COWARDLY DOG SAYS: YAY!")
    
    if(lives <= 0) {
        console.log("OOF")
    }
    currentQuestion += 1;
    
    tempQuestion = currentQuestion;
    
    canClick = true
    
    maker();
    
    // if the the tempQuestion equals the the internalBotCount then call the checker, else don't
            setTimeout(
              function() 
              {
                  if(tempQuestion == currentQuestion){
                      checkAnswer();
                  }
                  else{
                      console.log("NO TIMEOUT!");
                  }
              }, 3050); // this is a little more than 3.5 seconds
    
    });
};

function maker() {
    
    var partA = "<div class='col-md'>"
    var buttons = ""
    var partB = "</div>";
    
    var i;
    for(i=0; i < questions[difficulty][currentQuestion]['lines'].length; i++) { // so for the dblclick, the onClick gets triggered!
        buttons += "<button class='row' id='button"+(i+1)+"' style='width:100%' onClick='setAnswer("+(i+1)+")' ondblclick='checkAnswer()'>" + questions[difficulty][currentQuestion]['lines'][i] + "</button>"
    } 
    
    newQuestion(questions[difficulty][currentQuestion]['question'], partA+buttons+partB);
    
}

function setAnswer(num) { // done
    if (!canClick) {
        return;
    }else{
        
        $("#single"+currentQuestion).find("#button"+answer).css("background-color", "");
        
        answer = num;
        
        $("#single"+currentQuestion).find("#button"+num).css("background-color", "#4CAF50");
        
        console.log("SET ANSWER =", answer)
    }
};

function checkAnswer() { // implement the actual checking stuff
    /// once the timer or the user dblclicks then just don't let them.
    if (canClick) {
        canClick = false;
    }
    else{
        console.log("KATS SAYS: attempt failed doggy");
        return; 
    }
    
    // console.log("KATZ SAYS: ssassy")
    
    if(answer == questions[difficulty][currentQuestion]["correct"]){
        console.log("KATS SAYS: ssassy success")
        points += 1;
    }
    else{
        console.log("KATS SAYS: failure doggy")
    }
    
    controller()
    
}

function newQuestion(question, inputs) {
    $(document).ready(function() {
        console.log("EUSTECE BAGGS SAYS: STUPID DOG!")
        
        let parentDiv = $('#where_my_error_game')
        
        let partA = "<div class='row' id='single"+currentQuestion+"'> <div class='col-sm'>"
        
        let partB = "<div class='row'>TIMER HERE</div></div>"
        
        let partC = "</div>"
        
        // parentDiv.html('<h1>YAY!</h1>')
        parentDiv.html(partA + question + partB + inputs + partC)
        
    });
};

// NEED MORE QUESTIONS MAN

// for tabbing use &nbsp;&nbsp;
// for the <> use the &lt; &gt;
var questions = {
    mid: {
        2:{
            question: "error: invalid conversion from ‘const char*’ to ‘int’",
            lines: ["1 #include <string>", "2 using namespace std;", "3 int main() {", "4&nbsp;&nbsp; int num_items = '1';", "5&nbsp;&nbsp; cout << num_items;","6 }"],
            correct: 4
        },
        3:{
            question: "error: use of undeclared identifier 'iter'",
            lines:["1 #include <iostream>", "2 #include <vector>", "3 using namespace std;", "4 ", "5 int main () {", "6&nbsp;&nbsp; vector&lt;int&gt; my_list;", "7 ", 
            "8&nbsp;&nbsp; for(int iter = 0; iter < 20; iter++){", "9&nbsp;&nbsp;&nbsp;&nbsp; my_list.push_back(iter);", "10&nbsp;&nbsp; }", "11&nbsp;&nbsp; cout << iter << endl;", "12 }"],
            correct: 11
        },
        4:{
            
        }
        
    }
}