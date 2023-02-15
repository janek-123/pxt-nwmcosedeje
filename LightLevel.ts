namespace Lights{
    let minLightLevel = 50;
    export let calibrating = false;

    const calibCount = 50;
    let vals: number[] = [];
    let cCount: number;

    export function IsBelowMin() : boolean{
        return input.lightLevel() < minLightLevel;
    }

    export function Calibrate() {
        
        basic.showLeds(`# # # # # 
        # # # # # 
        # # # # # 
        # # # # # 
        # # # # #`, 50)

        basic.clearScreen();
        cCount = calibCount;

        calibrating = true;
    }

    basic.forever(function () {
        if (!calibrating) return;

        vals.push(input.lightLevel());
        basic.pause(100);

        cCount -= 1;

        if (cCount <= 0) {
            let total = 0;
            for (let i = 0; i < vals.length; i++) total += vals[i];

            let calibratedV = Math.round(total / vals.length);

            minLightLevel = calibratedV > 30 ? calibratedV - 20 : 10;

            console.log(`MIN :${minLightLevel}`);

            led.plot(4, 4);
            calibrating = false;
        }
    })
}