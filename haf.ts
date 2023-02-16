namespace Start{
    let rStartTime = -1;
    let fTime = 0;

    export function Secondary() {

        input.onButtonPressed(Button.A, function () {
            if (startTime != -1) return;
            Lights.Calibrate();
        })

        input.onButtonPressed(Button.B, function () {
            if (Lights.calibrating) return;

            for (let i = 3; i > 0; i--) {
                basic.showNumber(i);
                basic.pause(100);
            }

            basic.clearScreen();
            music.playTone(Note.CSharp, 50);

            rStartTime = input.runningTime();
        })

        basic.forever(function () {
            if (rStartTime == -1) return;

            if (Lights.IsBelowMin()) {
                radio.sendNumber(1);
                fTime = input.runningTime() - rStartTime;

                console.log("IS BELOW " + fTime);

                rStartTime = -1;
                whaleysans.showNumber(Math.round(fTime / 1000));
            }
        })

    }
}