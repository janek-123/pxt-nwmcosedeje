namespace Lights{
    export let calibrating = false;

    let minLightLevel = 50;

    const calibCount = 50;
    const waitTime = 25;
    const bottom = 20;

    export function IsBelowMin(): boolean { return input.lightLevel() < minLightLevel; }

    export function Calibrate() {        
        basic.showIcon(IconNames.House, 50)
        basic.clearScreen();

        calibrating = true;

        let x = 0;

        for (let i = calibCount; i > 0; i--){
            x += input.lightLevel();
            basic.pause(waitTime);
        }

        let calibratedV = Math.round(x / calibCount);
        minLightLevel = calibratedV > 30 ? calibratedV - bottom : 10;
        console.log(`MIN :${minLightLevel}`);

        led.plot(4, 4);
        calibrating = false;
    }
}