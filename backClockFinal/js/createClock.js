var firstCreated = false;
var counter = 0;
function createClock(){
    if(firstCreated){
        counter++;
        createDOMClock.call(clock);
    }
    firstCreated = true;
    var clock = {
    container : document.getElementsByClassName("clockContainer"),
        numCont : counter,
        btnResume : document.getElementById("btnResume"+counter),
        countSeconds : 0,
        countMinutes : 0,
        countHours : 0
    };
    
    moveClock.call(clock);
    handleEvents.call(clock);
    totalClocks.push(clock);
}