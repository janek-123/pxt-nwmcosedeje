function GetLightLevel() { input.lightLevel(); }

let minLightLevel : number; 

let calibrating = false;

function Calibrate(){
    basic.clearScreen();
    cCount = calibCount;

    calibrating = true;
}

let vals : number[] = [];

const calibCount = 50;
let cCount : number;

basic.forever(function() {
    if (!calibrating) return;

    vals.push(input.lightLevel());
    basic.pause(100);

    cCount -= 1;

    if(cCount <= 0){
        let total = 0;
        for (let i = 0; i < vals.length; i++) total += vals[i];

        let calibratedV = Math.round(total / vals.length);

        minLightLevel = calibratedV > 30 ? calibratedV - 20 : 10;
        
        console.log(`MIN :${minLightLevel}`); 

        calibrating = false;
    }
})
