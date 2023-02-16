let chosen = false;

input.onButtonPressed(Button.A, function () {
    if(chosen) return;

    basic.showString("M", 10);
    radio.sendString("sfdkhj");
    chosen = true;

    Main(); // CÍL
})

input.onButtonPressed(Button.B, function () {
    if (chosen) return;
    
    basic.showString("S", 10);
    chosen = true;

    Start.Secondary(); // ZAČÁTEK
})