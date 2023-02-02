radio.setTransmitPower(6);
radio.setFrequencyBand(7);
radio.setTransmitSerialNumber(true);
radio.setGroup(69);

const lightMin = 50;

let startTime = -1;
let timeFinal;

input.onButtonPressed(Button.A, function(){
    console.log(4545);
}) 

basic.forever(function() {

    if (startTime == -1) return;

    let cLight = input.lightLevel();


    if (cLight < lightMin){
        music.playTone(66, 5);
        timeFinal = input.runningTime() - startTime;     

        console.log(`TIME: ${timeFinal}`);
        startTime = -1;
    }
})

radio.onReceivedNumber(function(receivedNumber: number) {
    if (startTime != -1) return;

    if (receivedNumber == 1){
        console.log("start");

        radio.receivedPacket(RadioPacketProperty.Time);

        startTime = input.runningTime();
    }
})