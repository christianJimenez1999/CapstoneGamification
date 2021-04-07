console.log("I EXISTS :D");

var correct = 0
var gotten = 0

var lives = 4

var currentQuestion = 0
var tempQuestion = 0

var difficulty = "start";

var answer = 0

var canClick = true

function controller() { // check difficulty and the 
    $(document).ready(function() {
        console.log("COURAGE THE COWARDLY DOG SAYS: YAY!")
    
    
    if(difficulty="Syntax"){ // only progress on the complete cycle
        currentQuestion += 1;
    }
    
    difficulty = pointing[difficulty] // move to the other one
    // $("#type").html(difficulty)
    
    if(currentQuestion > 5) { // don't go over
        currentQuestion = 1
    }
    
    if(Object.keys(questions[difficulty][currentQuestion]).length == 0){ // out of questions here
        finalize()
        return;
    }
    else if(lives <= 0) { // out of lives here
        console.log("OOF");
        finalize()
        return;
    }
    else{
    
        tempQuestion = currentQuestion;
        
        canClick = true;
        
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
          }, 5050); // this is a little more than 5 seconds
        
    }
    
    });
};

function finalize() {
    console.log("THE END")
}

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
        correct += 1;
        $("#correct").html(correct)
    }
    else{
        console.log("KATS SAYS: failure doggy")
        lives -= 1;
        $("#lives").html(lives)
    }
    gotten += 1
    $("#gotten").html(gotten)
    
    
    delete questions[difficulty][currentQuestion]; // get rid of the question
    
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

var questions = { // questions go log -> run -> syn -> log 
    Logical:{
        1:{
            question: "Hello!",
            lines: ["1 #include &lt;iostream&gt;", "2 using namespace std;", "3 ", "4 int main() {", "5 &nbsp;&nbsp; string my_string = \"Hello!\";",
            "6 ", "7&nbsp;&nbsp; for(int var = 0; var < my_string.size(); var++);", "8&nbsp;&nbsp;&nbsp;&nbsp; cout << my_string;", "9 }"],
            correct: 8
        }
    },
    Syntax: {
        1:{
            question: "error: assigning to 'int' from incompatible type 'int *'",
            lines: ["1 #include &lt;iostream&gt;", "2 using namespace std;", "3 ", "4 using namespace std;", "5 int main() {", "6&nbsp;&nbsp; int* p1, p2;", "7&nbsp;&nbsp; n=20;",
            "8&nbsp;&nbsp; p1 = &n;","9&nbsp;&nbsp; p2=&n", "10}"],
            correct: 9
        },
        2:{
            question: "error: invalid conversion from ‘const char*’ to ‘int’",
            lines: ["1 #include &lt;iostream&gt;", "2 using namespace std;", "3 int main() {", "4&nbsp;&nbsp; int num_items = '1';", "5&nbsp;&nbsp; cout << num_items;","6 }"],
            correct: 4
        },
        3:{
            question: "error: use of undeclared identifier 'iter'",
            lines: ["1 #include &lt;iostream&gt;", "2 #include &lt;vector&gt;", "3 using namespace std;", "4 ", "5 int main () {", "6&nbsp;&nbsp; vector&lt;int&gt; my_list;", "7 ", 
            "8&nbsp;&nbsp; for(int iter = 0; iter < 20; iter++){", "9&nbsp;&nbsp;&nbsp;&nbsp; my_list.push_back(iter);", "10&nbsp;&nbsp; }", "11&nbsp;&nbsp; cout << iter << endl;", "12 }"],
            correct: 11
        },
        4:{
            question: "error: linker command failed with exit code 1",
            lines: ["1 #include &lt;iostream&gt;", "2 #include &lt;string&gt;", "3 int Main() {", "4 ", "5&nbsp;&nbsp; int a=4, b=6, c=10", "6&nbsp;&nbsp; printf(\"\nThe addition of %d and %d is = %d\",a,b,c);",
            "7 }"],
            correct: 3
        },
        5:{
            question: "error: expected ';' at end of declaration",
            lines: ["1 #include &lt;iostream&gt;", "2 #include &lt;string>&gt;", "3 using namespace std;", "4 const int iter = 0;", "5 ", "6 int main () {", "7 &nbsp;&nbsp; string my_string=\"myString;\"",
            "8 &nbsp;&nbsp; for(int iter = 0; iter < my_string.length(); iter++) {", "9&nbsp;&nbsp;&nbsp;&nbsp; cout << my_string[iter] << endl;", "10&nbsp;&nbsp; }",
            "11 }"],
            correct: 7
        },
        6:{
            question: "error: extraneous closing brace ('}')",
            lines: ["1 #include &lt;iostream&gt;", "2 #include &lt;string&gt;", "3 using namespace std;", "4 int main() {", "5&nbsp;&nbsp; string my_string = \"myString;\";",
            "6&nbsp;&nbsp; for(int iter = 0; iter < my_string.length(); iter++)", "7&nbsp;&nbsp;&nbsp;&nbsp; cout << my_string[iter] << endl;", "8&nbsp;&nbsp; }", "9 }"],
            correct:6
        }
        
    }
};

let pointing={
    start:"Logical",
    Logical:"Run_time",
    Run_time:"Syntax",
    Syntax:"Logical"
}