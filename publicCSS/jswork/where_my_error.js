console.log("I EXISTS :D");

var correct = 0
var gotten = 0 // number of questions taken
var time1 = new Date();
var time2;

var lives = 4

var currentQuestion = 5
// var tempQuestion = 0
var botCount = 0

var difficulty = "start";

var answer = 0

var canClick = true

function controller() { // check difficulty and the 
    $(document).ready(function() {
        console.log("COURAGE THE COWARDLY DOG SAYS: YAY!")
    
    
    if(difficulty=="Syntax"){ // only progress on the complete cycle
        currentQuestion += 1;
    }
    
    difficulty = pointing[difficulty] // move to the other one
    // $("#type").html(difficulty)
    
    if(currentQuestion > 6) { // don't go over
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
    else{ // put a question here
    
        var tempQuestion = botCount;
        
        canClick = true;
        
        maker();
        
        // if the the tempQuestion equals the the internalBotCount then call the checker, else don't
        setTimeout(
          function() 
          {
              if(tempQuestion == botCount){
                //   console.log("timer")
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
    time2 = new Date();
    var formatted1 = time1.getFullYear() + "-"+ (time1.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + "-" + time1.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + " " + time1.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" +time1.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" +time1.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    
    var formatted2 = time2.getFullYear() + "-"+ (time2.getMonth() + 1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + "-" + time2.getDate().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + " " + time2.getHours().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" +time2.getMinutes().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + ":" +time2.getSeconds().toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false});
    
    var partA = "<div class='container row rounded-lg border border-info' style='width:30%; margin:auto; background:#b4f3ff; padding:12px;'>"
    
    var input =
            "<form class='col-md' action='/inputWhereMyError' method='POST'>" +
                "<input hidden type='text' id='time1' name='time1' value='"+formatted1+"'>" + 
                "<input hidden type='text' id='time2' name='time2' value='"+formatted2+"'>" +
                "<input hidden type='number' id='correct' name='correct' value='"+correct +"'>" +
                "<input hidden type='number' id='wrong' name='wrong' value='"+(gotten - correct) +"'>" +
                "<input class='btn btn-success' type='submit' value='Submit score!'>" +
            "</form>"
            
    var input2 = "<a class='col-md' href='/where_my_error'><button class='btn btn-info'>redo!</button></a>"
    var partB = "</div>"
    
    $('#finisher').html(partA+input+input2+partB);
    $("#leftExplode").show().html("<img style='width:50px; height:50px;' src='https://bestanimations.com/media/fireworks2/505664765fireworks-animated-gif-10-2.gif'></img>")
    $("#rightExplode").show().html("<img style='width:50px; height:50px;' src='https://bestanimations.com/media/fireworks2/505664765fireworks-animated-gif-10-2.gif'></img>")

}

function maker() {
    
    var partA = "<div class='container col-md' style='background:rgba(255,255,255,.6); margin: 5px;'>"
    var buttons = ""
    var partB = "</div>";
    
    var i;
    for(i=0; i < questions[difficulty][currentQuestion]['lines'].length; i++) { // so for the dblclick, the onClick gets triggered!
        buttons += "<button class='row' id='button"+(i+1)+"' style='width:100%; border:solid; background:none; border-width:1px; padding:4px;' onClick='setAnswer("+(i+1)+")' ondblclick='checkAnswer()'>" + questions[difficulty][currentQuestion]['lines'][i] + "</button>"
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
    botCount += 1
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
        $("#correct").hide().html(correct).fadeIn('slow')
        $("#leftExplode").show().html("<img style='width:50px; height:50px;' src='https://bestanimations.com/media/fireworks2/505664765fireworks-animated-gif-10-2.gif'></img>").fadeOut(1000)
        $("#rightExplode").show().html("<img style='width:50px; height:50px;' src='https://bestanimations.com/media/fireworks2/505664765fireworks-animated-gif-10-2.gif'></img>").fadeOut(1000)
        
    }
    else{
        console.log("KATS SAYS: failure doggy")
        lives -= 1;
        $("#lives").hide().html("<h5 style='background:"+background[lives]+"'>"+lives+"</h5>").fadeIn('slow')
        
    }
    gotten += 1
    $("#gotten").hide().html(gotten).fadeIn('slow')
    
    
    delete questions[difficulty][currentQuestion]; // get rid of the question
    
    controller()
    
}

function newQuestion(question, inputs) {
    $(document).ready(function() {
        console.log("EUSTECE BAGGS SAYS: STUPID DOG!")
        
        let parentDiv = $('#where_my_error_game')
        
        let partA = "<div class='row' id='single"+currentQuestion+"'> <div class='col-sm'><p style='background:rgba(255,255,255,.6); margin: 5px;'>Console output:<br>"
        
        let partB = "</p><div class='row' style='background:rgba(255,255,255,.6); margin: 5px;'>TIMER HERE</div></div>"
        
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
            correct: 7
        },
        2:{
            question: "24",
            lines:["1 #include&lt;iostream&gt;", "2 using namespace std;", "3 ", "4 int main () {", "5&nbsp;&nbsp; int a = 4,b = 2,c = 40;", "6&nbsp;&nbsp; cout << a + c / b;",
            "7&nbsp;&nbsp; cout << a + c / b;", "8 }"],
            correct: 7
        },
        3:{
            question: "1 2 3 4 5 6 7 8 9 3 -2121793516",
            lines:["1 #include&lt;iostream&gt;", "2 using namespace std;", "3 ", "4 int main () {", "5&nbsp;&nbsp; int numbers[] = {1, 2, 3, 4, 5, 6, 7, 8, 9};",
            "6 ", "7&nbsp;&nbsp; for(int iter = 0; iter<=10; iter++)", "8&nbsp;&nbsp;&nbsp;&nbsp; cout<< numbers[iter] << \" \";", "9 }"],
            correct: 7
        },
        4:{
            question:"Hello!",
            lines:["1 #include&lt;iostream&gt;", "2 using namespace std;", "3 ", "4 int main () {","5&nbsp;&nbsp; int x = 3;", "6&nbsp;&nbsp; if(4 < x < 8)",
            "7&nbsp;&nbsp;&nbsp;&nbsp; cout << \"Hello!\";","8&nbsp;&nbsp; else", "9&nbsp;&nbsp;&nbsp;&nbsp; cout << \"Morning!\";", "10&nbsp;&nbsp; return 0;",
            "11 }"],
            correct:6
        },
        5:{
            question:"-3",
            lines:["1 #include&lt;iostream&gt;", "2 using namespace std;", "3 ", "4 int main () {", "5 ", "6&nbsp;&nbsp; float num;","7&nbsp;&nbsp; num= 10^38 - (10^38 - 1);",
            "8&nbsp;&nbsp; cout << num;", "9&nbsp;&nbsp; return 0;", "10 }"],
            correct:6
        },
        6:{
            question:"Do not match!",
            lines:["1 #include&lt;iostream&gt;", "2 using namespace std;", "3 ", "4 int main () {", "5 ", "6&nbsp;&nbsp; char char1 = 'b', char2 = 'b';",
            "7&nbsp;&nbsp; char* p1 = &char1; char* p2 = &char2;", "8&nbsp;&nbsp; if(p1 != p2)", "9&nbsp;&nbsp;&nbsp;&nbsp; cout <<\"Do not match!\"",
            "10&nbsp;&nbsp; return 0;", "11 }"],
            correct:8
        }
    },
    Syntax: {
        1:{
            question: "error: assigning to 'int' from incompatible type 'int *'",
            lines: ["1 #include &lt;iostream&gt;", "2 using namespace std;", "3 ", "4 using namespace std;", "5 int main() {", "6&nbsp;&nbsp; int* p1, p2;", "7&nbsp;&nbsp; n=20;",
            "8&nbsp;&nbsp; p1 = &n;","9&nbsp;&nbsp; p2=&n;", "10}"],
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
            lines: ["1 #include &lt;iostream&gt;", "2 #include &lt;string&gt;", "3 int Main() {", "4 ", "5&nbsp;&nbsp; int a=4, b=6, c=10;", "6&nbsp;&nbsp; printf(\"\nThe addition of %d and %d is = %d\",a,b,c);",
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
    Logical:"Syntax", // this was pointing at Run_time
    // Run_time:"Syntax", // I can't come up with a fair run time error
    Syntax:"Logical"
}

let background={
    4: "linear-gradient(50deg, rgba(34,193,195,1) 0%, rgba(42,50,219,1) 50%, rgba(186,45,253,1) 100%);",
    3: "linear-gradient(50deg, rgba(34,195,54,1) 0%, rgba(34,193,195,1) 50%, rgba(42,50,219,1) 100%);",
    2: "linear-gradient(50deg, rgba(252,252,51,1) 0%, rgba(34,195,1,1) 50%, rgba(34,193,195,1) 100%);",
    1: "linear-gradient(50deg, rgba(252,93,51,1) 0%, rgba(252,252,51,1) 50%, rgba(34,195,1,1) 100%);",
    0: "linear-gradient(50deg, rgba(252,51,51,1) 0%, rgba(252,93,51,1) 50%, rgba(252,252,51,1) 100%);"
}