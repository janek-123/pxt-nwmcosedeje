function SetUp(){
    radio.setTransmitPower(6);
    radio.setFrequencyBand(7);
    radio.setTransmitSerialNumber(true);
    radio.setGroup(69);
}

let startTime = -1; // IF 'startTime != 1' MEANS IT IS CURRENTLY MEASURING
let timeFinal = -1;

function Main(){
    input.onButtonPressed(Button.B, function () { TryDisplayResult(); })

    input.onButtonPressed(Button.AB, function () {
        Reset();
    })

    input.onButtonPressed(Button.A, function () {
        if (startTime != -1) return;
        Lights.Calibrate();
    })

    basic.forever(function () {
        if (startTime == -1 || Lights.calibrating) return;

        TryStopTimer();
    })

    radio.onReceivedNumber(function (receivedNumber: number) {
        if (startTime != -1) return;

        if (receivedNumber == 1) StartTimer();
    })
}

// TRIES TO STOP TIME MEASURING
function TryStopTimer(){
    if (Lights.IsBelowMin()) {
        music.playTone(66, 5);
        timeFinal = input.runningTime() - startTime;

        console.log(`TIME: ${timeFinal}`);
        startTime = -1;

        TryDisplayResult();
    }
}

function StartTimer(){
    console.log("start ");
    startTime = input.runningTime();
}

function Reset(){
    startTime = -1;
    timeFinal = -1;

    basic.clearScreen();
    led.toggle(4, 4);
}

function TryDisplayResult(){
    if (Lights.calibrating || timeFinal == -1) return;
    whaleysans.showNumber(Math.round(timeFinal / 1000));
}