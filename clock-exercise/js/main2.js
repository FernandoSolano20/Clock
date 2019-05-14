var Clock = function(){
    var interval;
    var velocity = 1000;
    var moveClock = function(clock){
        clock.seconds = clock.container[clock.numCont].querySelector("#seconds");
        clock.minutes = clock.container[clock.numCont].querySelector("#minutes");
        clock.hours = clock.container[clock.numCont].querySelector("#hours");
        clock.btnResume.disabled = true;
        var instance = clock;
        interval = setTimeout(
            function moveHandClock(){
                instance.countSeconds++;
                rotateHandSecondsClock(instance);
                moveMinutes(instance);
                instance.showDigitaTime();
                interval = setTimeout(moveHandClock.bind(instance),velocity);
                instance.interval = interval;
            },velocity);
    }

    var moveMinutes = function(instance){
        if(instance.countSeconds % 60 === 0){
            instance.countSeconds = 0;
            instance.countMinutes++;
            rotateHandMinutesClock(instance);
            moveHours(instance);
        }
    }

    var moveHours = function(instance){
        //Every 12 minutes the hand Hour moves 1 line of clock
        if(instance.countMinutes % 12 === 0){
            instance.countHours++;
            //if hand hour move five little line in clock it means that one hour is completed
            if(instance.countHours % 5 === 0){
                instance.countMinutes = 0;
            }
            rotateHandHoursClock(instance);
            /**
            cantOfLittleLines is a var to check the number of little lines in the clock
            The circumference of clock has 60 little lines so 60 + 60 = 120
            **/
            var cantOfLittleLines = 120;
            if(instance.countHours === cantOfLittleLines){
                instance.countHours = 0;
            }
        }
    }

    var rotateHandSecondsClock = function(instance){
        instance.seconds.style = "transform: rotate("+ instance.countSeconds * 6 +"deg)";
    }

    var rotateHandMinutesClock = function(instance){
        instance.minutes.style = "transform: rotate("+ instance.countMinutes * 6 +"deg)";
    }

    var rotateHandHoursClock = function(instance){
        instance.hours.style = "transform: rotate("+ instance.countHours * 6 +"deg)";
    }

    var rotateHandHourClockSet = function(instance){
        instance.hours.style = "transform: rotate("+ instance.countHours +"deg)";
    }

    var attachEvents = function(clock){
        if(firstCreated){
            clock.restartClock();
            clock.btnResume.disabled = true;
        }
        time = 0;
        var instance = clock;
        instance.container[instance.numCont].querySelector(".setTime").addEventListener("keyup", moveInputs);
        instance.container[instance.numCont].querySelector("#btnSetTime").addEventListener("click", function(){instance.setTimeClock(this)});
        instance.container[instance.numCont].querySelector("#btnRestart").addEventListener("click", function(){instance.restartClock(this)});
        instance.container[instance.numCont].querySelector("#btnResume").addEventListener("click", function(){instance.continueClock(this)});
        instance.container[instance.numCont].querySelector("#btnPause").addEventListener("click", function(){instance.pauseClock(this)});
    }
    return{
        moveClock:moveClock,
        attachEvents:attachEvents,
        moveMinutes:moveMinutes,
        moveHours:moveHours,
        rotateHandSecondsClock:rotateHandSecondsClock,
        rotateHandMinutesClock:rotateHandMinutesClock,
        rotateHandHoursClock:rotateHandHoursClock,
        rotateHandHourClockSet:rotateHandHourClockSet
    };
};



var createDOMClock = function(){
    var div = document.getElementsByClassName('wrapper')[0];
    clone = div.cloneNode(true);
    clone.className += " deleteButton";
    document.body.appendChild(clone);
}

var moveInputs = function(e) {
    var target = e.srcElement || e.target;
    if(e.keyCode === 9 && target.value.length < 2){
        target = target.previousElementSibling.previousElementSibling || target.previousElementSibling;
        target.value = "0" + target.value;
    }
    var maxLength = parseInt(target.attributes["maxlength"].value, 10);
    var myLength = target.value.length;
    if (myLength >= maxLength) {
        var next = target;
        while (next = next.nextElementSibling) {
            if (next == null)
                break;
            if (next.tagName.toLowerCase() === "input") {
                next.focus();
                break;
            }
        }
    }
    // Move to previous field if empty (user pressed backspace)
    else if (myLength === 0) {
        var previous = target;
        while (previous = previous.previousElementSibling) {
            if (previous == null)
                break;
            if (previous.tagName.toLowerCase() === "input") {
                previous.focus();
                break;
            }
        }
    }
}