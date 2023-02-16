namespace Lights{
    
    let minLightLevel = 50;
    export let calibrating = false;

    const calibCount = 50;
    const waitTime = 100;

    let x = 0;

    export function IsBelowMin(): boolean { return input.lightLevel() < minLightLevel; }

    export function Calibrate() {        
        basic.showLeds(`# # # # # 
        # # # # # 
        # # # # # 
        # # # # # 
        # # # # #`, 50)

        basic.clearScreen();

        calibrating = true;

        for (let i = calibCount; i >= 0; i--){
            x += input.lightLevel();
            basic.pause(waitTime);

            if (i == 0) {
                let calibratedV = Math.round(x / calibCount);

                minLightLevel = calibratedV > 30 ? calibratedV - 20 : 10;

                console.log(`MIN :${minLightLevel}`);

                led.plot(4, 4);
                calibrating = false;
            }
        }

        calibrating = false;
    }
}