var fast = {
    // (A) PROPERTIES
    // (A1) QUESTIONS & ANSWERS
    // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
    data: [
        {
            q : "Which is the boolean value of the statement: 5 is greater than 4",
            o : [
                "False",
                "True",
                "Yes",
                "No"
            ],
            a : 1
        },
        {
            q : "Which of the following is the list of boolean operators?",
            o : [
                "XOR, OR",
                "+, -, *, /, %",
                "AND, OR, XOR",
                "AND, OR, XOR, NOT"
            ],
            a : 3
        },
        {
            q : "Which of the following is an unary boolean operator?",
            o : [
                "AND",
                "OR",
                "NOT",
                "XOR"
            ],
            a : 2
        },
        {
            q : "If A is TRUE and B is FALSE, what is the result of the following boolean statement? A AND B",
            o : [
                "True",
                "False"
            ],
            a : 1
        },
        {
            q : "If A is FALSE and B is TRUE, what is the result of the following boolean statement? A OR B",
            o : [
                "True",
                "False"
            ],
            a : 0
        }
    ],


    hWrap: null, // HTML quiz container
    hQn: null, // HTML question wrapper
    hAns: null, // HTML answers wrapper


    now: 0, // current question
    score: 0, // current score


    init: function(){

        fast.hwrap = document.getElementById("fastWrap");


        fast.hqn = document.createElement("div");
        fast.hqn.id = "fastQn";
        fast.hwrap.appendChild(fast.hqn);


        fast.hans = document.createElement("div");
        fast.hans.id = "fastAns";
        fast.hwrap.appendChild(fast.hans);

        let toHide = document.getElementById('toHide');
        toHide.innerHTML = ""; // maybe hide the original tutorial div
        
        fast.draw();
    },


    draw: function(){

        fast.hqn.innerHTML = fast.data[fast.now].q;


        fast.hans.innerHTML = "";
        for (let i in fast.data[fast.now].o) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "fast";
            radio.id = "fasto" + i;
            fast.hans.appendChild(radio);
            let label = document.createElement("label");
            label.innerHTML = fast.data[fast.now].o[i];
            label.setAttribute("for", "fasto" + i);
            label.dataset.idx = i;
            label.addEventListener("click", fast.select);
            fast.hans.appendChild(label);
        }
        
        console.log("on question",fast.now);
        
        
        fast.now++;
        setTimeout(function(){
            console.log("made it to the timeout")
            if (fast.now < fast.data.length) {
                    
                    fast.draw();
                }
            else {
                fast.hqn.innerHTML = `You have answered ${fast.score} of ${fast.data.length} correctly.`; //was hQn
                fast.hans.innerHTML = ""; // was hAns
            }
        }, 5000); // about 5 seconds
    },


    select: function(){

        let all = fast.hans.getElementsByTagName("label"); // was hAns before
        for (let label of all) {
            label.removeEventListener("click", fast.select);
        }


        let correct = this.dataset.idx == fast.data[fast.now].a;
        if (correct) {
            fast.score++;
            this.classList.add("correct");
        } else {
            this.classList.add("wrong");
        }

        // fast.now++; // it was just out of range 
        // setTimeout(function(){
        //     console.log("made it to the timeout")
        //     if (fast.now < fast.data.length) {
                    
        //             fast.draw();
        //         }
        //     else {
        //         fast.hQn.innerHTML = `You have answered ${fast.score} of ${fast.data.length} correctly.`;
        //         fast.hAns.innerHTML = "";
        //     }
        // }, 5000); // about 5 seconds
        
    }
};
// window.addEventListener("load", fast.init);