radio.setTransmitPower(6);
radio.setFrequencyBand(7);
radio.setTransmitSerialNumber(true);
radio.setGroup(69);

let startTime = -1;
let timeFinal : number;

input.onButtonPressed(Button.A, function(){    
    if (calibrating) return;

    whaleysans.showNumber(Math.round(timeFinal / 1000));
})

input.onButtonPressed(Button.AB, function () {
    Reset();
})

input.onButtonPressed(Button.B, function () {
    Calibrate();
})

basic.forever(function() {
    if (startTime == -1 || calibrating) return;
    
    TryStop();
})

function TryStop(){
    let cLight = input.lightLevel();
    if (cLight < minLightLevel) {
        music.playTone(66, 5);
        timeFinal = input.runningTime() - startTime;

        console.log(`TIME: ${timeFinal}`);
        startTime = -1;
    }
}

radio.onReceivedNumber(function(receivedNumber: number) {
    if (startTime != -1) return;

    if (receivedNumber == 1) StartTimer();
})

function StartTimer(){
    console.log("start ");
    startTime = input.runningTime();
}

function Reset(){
    startTime = -1;
}