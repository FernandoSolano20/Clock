var firstCreated = false;
var logicClock = Clock();
var totalClocks = [];

function createClock(){
    var counter = totalClocks.length;
    if(firstCreated){
        createDOMClock();
    }
    var wrapperContainer = document.getElementsByClassName("wrapper");
    var clock = {
        container : wrapperContainer,
        numCont : counter,
        btnResume : wrapperContainer[counter].querySelector("#btnResume"),
        countSeconds : 0,
        countMinutes : 0,
        countHours : 0,
        continueClock : 
            function(){
                if(!this.btnResume.disabled){
                    this.btnResume.disabled = true;
                    logicClock.moveClock(this);
                }
            },
        pauseClock : 
            function(){
                this.btnResume.disabled = false;
                clearTimeout(this.interval);
            },
        setTimeClock :
            function(){
                var hour = parseInt(this.container[this.numCont].querySelector("#inputHour").value);
                var min = parseInt(this.container[this.numCont].querySelector("#inputMin").value);
                var sec = parseInt(this.container[this.numCont].querySelector("#inputSec").value);
                if((sec < 60 && sec >= 0) && (min < 60 && min >= 0) && (hour < 24 && hour >= 0)){
                    this.setTime(hour,min,sec);
                }
                    
            },
        setTime :
            function(hour,min,sec){
                this.countSeconds = sec;
                this.countMinutes = min;
                //Every 12 minutes the hand Hour moves 1 line of clock
                var grades = parseInt(this.countMinutes % 12);
                this.countHours = parseInt((hour * 30) + grades);
                var that = this;
                logicClock.rotateHandSecondsClock(that);
                logicClock.rotateHandMinutesClock(that);
                logicClock.rotateHandHourClockSet(that);
                grades = parseInt(this.countMinutes / 12);
                this.countHours = hour * 5 + grades;
                this.pauseClock();
                this.showDigitaTime();
            },
            restartClock : 
                function(){
                    this.countSeconds = 0;
                    this.countMinutes = 0;
                    this.countHours = 0;
                    var that = this;
                    logicClock.rotateHandSecondsClock(that);
                    logicClock.rotateHandMinutesClock(that);
                    logicClock.rotateHandHoursClock(that);
                    this.pauseClock();
                    this.showDigitaTime();
                },
            showDigitaTime : 
                function(){
                    this.container[this.numCont].querySelector("#timer").value = Math.floor(this.countHours/5) + ":" + this.countMinutes + ":" + this.countSeconds;
                }
    };
    
    logicClock.moveClock(clock);
    logicClock.attachEvents(clock);
    totalClocks.push(clock);
    firstCreated = true;
}

document.addEventListener("DOMContentLoaded", function() {
    document.body.addEventListener('load',createClock());
  });
document.getElementById("createClock").addEventListener("click", createClock);