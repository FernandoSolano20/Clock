var Clock = function(){
    var seconds = document.getElementById("seconds");
    var minutes = document.getElementById("minutes");
    var hours = document.getElementById("hours");
    var btnResume = document.getElementById("btnResume");
    var countSeconds = 0;
    var countMinutes = 0;
    var countHours = 0;
    var interval;
    btnResume.disabled = true;
    
    var moveClock = function(){
        interval = setInterval(
            function(){
                countSeconds++;
                rotateClock(seconds,countSeconds);
                if(countSeconds % 60 === 0){
                    countMinutes++;
                    rotateClock(minutes,countMinutes);
                    if(countMinutes % 60 === 0){
                        countHours++;
                        rotateClock(hours,countHours);
                    }
                }
            },1000);
    }

    var restartClock = function(){
        countSeconds = 0;
        countMinutes = 0;
        countHours = 0;
        rotateClock(seconds,0);
        rotateClock(minutes,0);
        rotateClock(hours,0);
    }

    var rotateClock = function(id, numRotate){
        id.style = "transform: rotate("+ numRotate * 6 +"deg)";
    }

    var pauseClock = function(){
        btnResume.disabled = false;
        clearInterval(interval);
    }
    
    var continueClock = function(){
        if(!btnResume.disabled){
            btnResume.disabled = true;
            moveClock();
        }
    }

    var handleEvents = function(){
        document.getElementById("btnRestart").addEventListener("click", restartClock);
        document.getElementById("btnPause").addEventListener("click", pauseClock);
        document.getElementById("btnResume").addEventListener("click", continueClock);
    }

    return{
        move:moveClock,
        events:handleEvents
    }
}

var clock = Clock();
clock.move();
clock.events();
