// Dieses Program steuert einen Bordcomputer einer Landefähre
//#region dependencies
var readline = require('readline');
//#endregion
var initial_height = 50000; // 
var gravitational_acceleration = 1.63; // meters per second
var rocket_acceleration = -24; // meters per second
var velocity = 1000; // in meters per second
var time_unit = 1; // one millisecond 
var fuel = 0; // in Liters
var fuel_consumption = 0; // in Liters per Second
console.log("begin");
// boost
var __keypressed = false;
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', function (str, key) {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    }
    if (key.name === "b") {
        __newtime = Date.now();
        if (__keypressed) {
            velocity = velocity + ((rocket_acceleration * (__newtime - __time)) / 1000);
            fuel = fuel - (fuel_consumption / 1000);
        }
        __keypressed = true;
    }
    __time = Date.now();
});
// fall
var __time = Date.now();
var __newtime = Date.now();
var __counter = 0;
var __fall_counter = 0;
var __falltime = Date.now();
var __newFalltime = Date.now();
var Interval = setInterval(function () {
    if (initial_height <= 0) {
        (velocity <= 10) ? console.log("sucessfully landed") : console.log("you crashed");
        clearInterval(Interval);
        process.exit();
    }
    initial_height = initial_height - (velocity / 1000);
    velocity = velocity + ((gravitational_acceleration) / 1000);
    __fall_counter = __fall_counter + 1;
    if (__fall_counter >= 300) {
        __fall_counter = 0;
        renderTUI();
    }
}, 1 /* interval in milliseconds*/);
function renderTUI() {
    console.clear();
    console.log('\x1b[36m%s\x1b[0m', "moonlander");
    console.log(" ");
    console.log("velocity: " + velocity);
    console.log("height: " + initial_height);
    console.log("landing in: " + initial_height / velocity);
    console.log("boosting: " + __keypressed);
    console.log(" ");
    __keypressed = false;
}
//
