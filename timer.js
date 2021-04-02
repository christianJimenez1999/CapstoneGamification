// how long the timer will last
var timer = 15;
// obtaining current time when launched
var currentTime = Date.parse(new Date());
// when the timer should end adding the timer to the current date
var end = new Date(currentTime + timer*60*1000)

function countdown(end){
    var time = Date.parse(end) - Date.parse(new Date());
    var seconds = Math.floor((time/1000) % 60);
    var minutes = Math.floor((time/1000) % 60);
    return{'total':time, 'minutes':minutes, 'seconds':seconds};
}

function running(id, end){
    var clock = document.getElementById(id);
    
    function update(){
        var time = countdown(end);
        clock.innerHTML = 'minutes: ' + time.minutes + ' - seconds: ' + time.seconds;
        if(time.total <= 0){
            clearInterval(intervals);
        }
    }
    update();
    var intervals = setInterval(update, 1000);
}

running('clockTimer', end);