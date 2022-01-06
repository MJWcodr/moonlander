// Dieses Program steuert einen Bordcomputer einer Landefähre


//#region dependencies
const readline = require('readline');
//#endregion

let initial_height: number = 50000 // 
let gravitational_acceleration: number = 1.63 // meters per second
let rocket_acceleration: number = -24 // meters per second
let velocity = 1000 // in meters per second
let time_unit = 1 // one millisecond 

let fuel: number = 0; // in Liters
let fuel_consumption: number = 0; // in Liters per Second

console.log("begin")

// boost
let __keypressed: boolean = false
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
        process.exit();
    }
    if (key.name === "b") {
        __newtime = Date.now()
        
        if (__keypressed) {
            velocity = velocity + ((rocket_acceleration*(__newtime - __time))/1000)
            fuel = fuel - (fuel_consumption/1000 )
        }
        __keypressed = true
    }
    __time = Date.now()
})

// fall
let __time = Date.now()
let __newtime = Date.now()
let __counter: number = 0
let __fall_counter: number = 0
let __falltime = Date.now()
let __newFalltime = Date.now()
const Interval = setInterval(() => {
    if (initial_height <= 0){
        (velocity <= 10) ? console.log("sucessfully landed") : console.log("you crashed") 
        clearInterval(Interval);
        process.exit();
    }
    initial_height = initial_height - (velocity/1000)
    velocity = velocity + ((gravitational_acceleration)/1000)
    __fall_counter = __fall_counter + 1
    if (__fall_counter >= 300){
        __fall_counter = 0
        renderTUI();
    }
}, 1 /* interval in milliseconds*/)

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
